import { defineConfig } from "vite";
import { cloudflare } from "@cloudflare/vite-plugin";

/* Build only: cf deploy runs vite, the plugin builds the Worker from cloudflare.config.ts. */
export default defineConfig({ plugins: [cloudflare()] });
