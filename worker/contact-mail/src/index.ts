/* JATIN contact mail. The CONTACT phone on justjatin.thotahub.in POSTs one message as JSON:
   { idea, line, name, reply, hp }. Validates it, then emails it to Jatin through the locked send binding.
   hp is a honeypot field that people never see; anything in it is a bot and is dropped silently. */
interface Env { EMAIL: { send(m: unknown): Promise<{ messageId: string }> }; FROM: string }

const ORIGINS = ["https://justjatin.thotahub.in", "http://localhost:5179", "http://localhost:8080"];
const IDEAS = ["edit my footage", "shoot something", "creative direction", "just saying hi"];

const cors = (o: string | null) => ({
  "Access-Control-Allow-Origin": o && ORIGINS.includes(o) ? o : ORIGINS[0],
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Vary": "Origin",
});
const esc = (s: string) => s.replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
const clean = (v: unknown, n: number) => (typeof v === "string" ? v : "").replace(/[\r\n\t]+/g, " ").trim().slice(0, n);

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const o = req.headers.get("Origin"), h = cors(o);
    if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: h });
    if (req.method !== "POST") return new Response("POST only", { status: 405, headers: h });
    if (!o || !ORIGINS.includes(o)) return new Response("forbidden", { status: 403, headers: h });
    let b: Record<string, unknown>;
    try { b = await req.json(); } catch { return Response.json({ ok: false, error: "bad json" }, { status: 400, headers: h }); }
    if (clean(b.hp, 200)) return Response.json({ ok: true }, { headers: h });
    const idea = clean(b.idea, 40), line = clean(b.line, 280), name = clean(b.name, 80), reply = clean(b.reply, 120);
    if (!IDEAS.includes(idea) || !name || !reply)
      return Response.json({ ok: false, error: "missing fields" }, { status: 422, headers: h });
    const isMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(reply);
    const text = `${name} (${reply})\n${idea}${line ? `: ${line}` : ""}\n\nsent from the phone on justjatin.thotahub.in`;
    const html = `<div style="font:16px/1.5 monospace">
<p><b>${esc(name)}</b> &middot; ${isMail ? `<a href="mailto:${esc(reply)}">${esc(reply)}</a>` : esc(reply)}</p>
<p><b>${esc(idea)}</b>${line ? `: ${esc(line)}` : ""}</p>
<p style="color:#888;font-size:12px">sent from the phone on justjatin.thotahub.in</p></div>`;
    try {
      await env.EMAIL.send({
        to: "thotajatin.work@gmail.com",
        from: { email: env.FROM, name: "JATIN phone" },
        subject: `new message: ${idea} · ${name}`,
        text, html,
        ...(isMail ? { replyTo: reply } : {}),
      });
    } catch (e) {
      console.log("send failed", (e as { code?: string }).code, (e as Error).message);
      return Response.json({ ok: false, error: "send failed" }, { status: 502, headers: h });
    }
    return Response.json({ ok: true }, { headers: h });
  },
};
