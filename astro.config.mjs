import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  server: {
    port: 1625
  },
  integrations: [svelte(), icon()],
  // Hosting on GitHub
  outDir: "./docs",
  site: "https://fireisgood.github.io/",
  base: "/endless-struggle"
});