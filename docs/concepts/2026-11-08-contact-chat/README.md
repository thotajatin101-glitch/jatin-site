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
