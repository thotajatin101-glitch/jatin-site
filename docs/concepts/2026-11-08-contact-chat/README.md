# CONTACT step 2: the phone asks you to get in touch

## Round 1 — 2026-11-08: mock, before building

**His note** (with an old-messenger "away message" screen as the UI reference, `ref-aim-ui.webp`, and a screen
recording of a 7-step terminal questionnaire, `ref-recording-sheet.png`):
> "take inspiration from the ui as i want something like this ui for the phone. where once u click the phone i comes close to you and ask for details from the user if the want to get in touch. i want the questions to be something similar to what the screen recording has but that's a bit too much and might drive people away. want something simpler that gives me and user a gist of what's happening"

**What the recording asks** (7 steps): a one-line idea, how far along (4 picks), what they need (4 picks),
when (3 picks), name, email, plus a final step.

**Cut to 4 steps:**
- **Kept:** the pick, the one-liner and the contact. Together they give him the gist.
- **Dropped:** "how far along" and "when"; the one-liner carries both if they matter.

The steps:
1. **what's the idea?** Pick one: edit my footage / shoot something / creative direction / just saying hi.
   These are his three disciplines plus a no-pressure exit.
2. **the one-line version?** Optional, can be skipped.
3. **what do i call you? / where do i reply?** Name, plus email or @insta, on one screen.
4. **send this?** The whole message read back as a sentence, so both sides see the gist.

After sending, the screen says "message sent" and the status flips from online to away.

**The look:** the reference's messenger-window language on the phone's own electric-blue LCD:
- double-ruled boxes, a pixel grid and VT323 type;
- a title bar with signal and battery icons, with JATIN between pink sparkles (no brand logos from the reference);
- pixel icons from the site (the chain link, P5 star, sparkle, heart) and the acid selection bar;
- the softkeys (BACK / NEXT) sit where the phone's Options / Contacts are now.

**The interaction:**
- Click the phone and it dollies in face-on, like the PROJECTS computer.
- The LCD becomes a real DOM layer, for typing, screen readers and the keyboard.
- Keypad keys 1–4 pick an option, and Esc goes back.

Mock: `r1-mock-screens.png` (`r1-mock.html`).

## Round 2 — 2026-11-08: copy

**His note:**
> "instead of who's this say what do i call you, and instead of what the vibe say what's the idea ?"

The questions are now **what's the idea?** and **what do i call you?**. The read-back label on step 2 follows
("idea: shoot something"). Mock: `r2-mock-screens.png`.

## Round 3 — 2026-11-08: built

**His note:**
> "i want the message to send me and email to thotajatin.work@gmail.com"

**Built in `PhoneFX`** (site/, not deployed):
- **Click the phone** to open it; Return also works. The cursor turns to a pointer over the phone. The hit test is
  the projected outline of the body and the lid, with no pixel readback, because the phone shader is heavy.
- **The dolly** runs 620ms on an in-out cubic. The float and the cursor follow fade out, and the lid's inner face
  ends square to the camera. The LCD fills 62% of the page height, or 86% of the width on a phone.
- **The chat** is a DOM layer laid exactly on the projected LCD (`placeChat`; 1em = 1/15 of its height). It powers
  on like a tube, and the LCD texture under it goes to a plain backlight.
- **The flow:** home → what's the idea? (4 picks) → the one-line version (optional) → what do i call you? and where
  do i reply? (email or @insta, checked) → send this? (the gist read back) → sending (a stepped pink bar) → sent
  (status: away). If it can't send, it shows "no signal :(" with a MAIL button that opens their mail app with the
  message already written.
- **Keys:** 1–4 or the arrows pick, Return moves on, Esc goes back one step and exits from home. While the phone is
  up, BACK and the heading hide.
- **Spam:** a hidden honeypot field.

**Delivery: `worker/contact-mail`**, a Cloudflare Worker (cf project).
- It accepts a POST only from justjatin.thotahub.in (and localhost), validates the fields and emails him through a
  `send_email` binding locked to thotajatin.work@gmail.com, with reply-to set to the sender's email.
- Sending to a verified address on your own account is free on the Workers Free plan.
- **Not set up yet; it needs his OK and one click from him:**
  1. Turn on Email Routing for the subdomain `mail.thotahub.in`. Not the apex: thotahub.in already has registrar
     mail forwarding in its MX records, and that must not break.
  2. Add thotajatin.work@gmail.com as a destination address. Cloudflare emails it a link he has to click.
  3. Deploy the Worker and put its URL in `MAIL` in PhoneFX. Until then, every send falls to the mail-app fallback.

Stills: `r3-built-flow.png` (desktop above, 375 below), `r3-built-sent.png` (with a faked endpoint),
`r3-built-375.png`, `r3-rest.png`.
