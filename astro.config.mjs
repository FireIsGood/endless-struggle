import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  server: {
    port: 1625
  },
  integrations: [svelte()],
  // Hosting on GitHub
  outDir: "./docs",
  site: "https://fireisgood.github.io/",
  base: "/endless-struggle"
});
