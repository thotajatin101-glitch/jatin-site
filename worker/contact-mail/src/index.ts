/* JATIN contact mail. The CONTACT phone on justjatin.thotahub.in POSTs one message as JSON:
   { idea, line, name, reply, hp }. Validates it, then emails it to Jatin through the locked send binding.
   hp is a honeypot field that people never see; anything in it is a bot and is dropped silently. */
interface Env { EMAIL: { send(m: unknown): Promise<{ messageId: string }> }; FROM: string }

const ORIGINS = ["https://justjatin.thotahub.in", "http://localhost:5179", "http://localhost:8080"];
const IDEAS = ["edit my footage", "shoot something", "creative direction", "something else"];
/* 2026-11-09, his note: no "just saying hi", a real reason, and an email that exists. The phone checks all of this
   first; these are the same rules again so nobody can skip the phone and post here directly. */
const TRASH = /(^|\.)(mailinator|guerrillamail|sharklasers|10minutemail|tempmail|temp-mail|yopmail|trashmail|getnada|dispostable|maildrop|throwawaymail|fakeinbox|mailnesia|mintemail|emailondeck|mohmal|tempail|tempinbox|spamgourmet|mailcatch|discard)\./i;
const briefOk = (t: string) => {
  const w = t.split(/\s+/).filter(x => /[a-z0-9]/i.test(x));
  return t.length >= 25 && w.length >= 5 && !/^(hi+|hey+|hello+|yo+|sup|hii+|test)\b[\s!.]*$/i.test(t);
};
const userOk = (u: string, d: string) => {
  u = u.toLowerCase().split("+")[0];
  if (/^(gmail|googlemail)\.com$/.test(d)) { const c = u.replace(/\./g, ""); return /^[a-z0-9.]+$/.test(u) && c.length >= 6 && c.length <= 30 && !/^\.|\.$|\.\./.test(u); }
  if (/^(icloud|me|mac)\.com$/.test(d)) return u.length >= 3 && u.length <= 20;
  if (/^yahoo\./.test(d)) return u.length >= 4 && u.length <= 32;
  return true;
};
/* the domain must publish a real MX (not the "0 ." null MX): DNS over HTTPS to Cloudflare's resolver */
async function mxOk(dom: string): Promise<boolean> {
  try {
    const r = await fetch(`https://cloudflare-dns.com/dns-query?type=MX&name=${encodeURIComponent(dom)}`, { headers: { accept: "application/dns-json" } });
    const j = await r.json() as { Status: number; Answer?: { type: number; data: string }[] };
    return j.Status === 0 && (j.Answer || []).some(a => a.type === 15 && !/^\d+\s+\.?$/.test(a.data));
  } catch { return true; }   /* resolver down: don't lose a real message over it */
}

const cors = (o: string | null) => ({
  "Access-Control-Allow-Origin": o && ORIGINS.includes(o) ? o : ORIGINS[0],
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Vary": "Origin",
});
const esc = (s: string) => s.replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
const clean = (v: unknown, n: number) => (typeof v === "string" ? v : "").replace(/[\r\n\t]+/g, " ").trim().slice(0, n);

export default {
  async fetch(req: Request, env: Env, ctx: { waitUntil(p: Promise<unknown>): void }): Promise<Response> {
    const o = req.headers.get("Origin"), h = cors(o);
    if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: h });
    if (req.method !== "POST") return new Response("POST only", { status: 405, headers: h });
    if (!o || !ORIGINS.includes(o)) return new Response("forbidden", { status: 403, headers: h });
    let b: Record<string, unknown>;
    try { b = await req.json(); } catch { return Response.json({ ok: false, error: "bad json" }, { status: 400, headers: h }); }
    if (clean(b.hp, 200)) return Response.json({ ok: true }, { headers: h });
    const idea = clean(b.idea, 40), line = clean(b.line, 400), name = clean(b.name, 80), reply = clean(b.reply, 120);
    if (!IDEAS.includes(idea) || !name)
      return Response.json({ ok: false, error: "missing fields" }, { status: 422, headers: h });
    if (!briefOk(line)) return Response.json({ ok: false, why: "line" }, { status: 422, headers: h });
    const m = /^([^\s@]+)@([a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,})$/i.exec(reply);
    if (!m || TRASH.test(m[2]) || !userOk(m[1], m[2].toLowerCase()) || !(await mxOk(m[2].toLowerCase())))
      return Response.json({ ok: false, why: "email" }, { status: 422, headers: h });
    const isMail = true;
    const text = `${name} (${reply})\n${idea}${line ? `: ${line}` : ""}\n\nsent from the phone on justjatin.thotahub.in`;
    const html = `<div style="font:16px/1.5 monospace">
<p><b>${esc(name)}</b> &middot; ${isMail ? `<a href="mailto:${esc(reply)}">${esc(reply)}</a>` : esc(reply)}</p>
<p><b>${esc(idea)}</b>${line ? `: ${esc(line)}` : ""}</p>
<p style="color:#888;font-size:12px">sent from the phone on justjatin.thotahub.in</p></div>`;
    /* The send itself takes ~6s inside Email Service (measured 2026-11-09), and the visitor sat on "sending" for all
       of it. The message is validated above, so answer now and let the send finish after the response. A failure
       is logged (cf tail) rather than shown; the binding only reaches his verified inbox, so failures are rare. */
    ctx.waitUntil(env.EMAIL.send({
      to: "thotajatin.work@gmail.com",
      from: { email: env.FROM, name: "JATIN phone" },
      subject: `new message: ${idea} · ${name}`,
      text, html,
      ...(isMail ? { replyTo: reply } : {}),
    }).catch(e => console.log("send failed", (e as { code?: string }).code, (e as Error).message)));
    return Response.json({ ok: true }, { headers: h });
  },
};
