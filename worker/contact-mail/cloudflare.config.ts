import { defineConfig, bindings } from "cf/config";

/* The CONTACT phone posts here; the Worker emails it to Jatin. The send binding is locked to one destination,
   so the Worker can never be used to mail anyone else. That address must be verified in Email Routing. */
export default defineConfig({
  worker: {
    name: "jatin-contact-mail",
    entrypoint: "./src/index.ts",
    compatibilityDate: "2026-10-01",
    env: {
      EMAIL: bindings.sendEmail({ destinationAddress: "thotajatin.work@gmail.com" }),
      FROM: bindings.text("contact@mail.thotahub.in"),
    },
  },
});
