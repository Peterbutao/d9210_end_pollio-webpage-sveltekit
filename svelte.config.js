import adapter from "@sveltejs/adapter-cloudflare";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

export default {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      // Cloudflare Pages: static-first, Workers fallback for SSR if needed
      routes: {
        include: ["/*"],
        exclude: ["<all>"],
      },
    }),
    alias: {
      "@": "./src",
      "@/*": "./src/*",
    },
  },
};
