import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/kit/vite';
/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    // Explicit runtime: this adapter version only auto-detects Node 16/18/20.
    adapter: adapter({ runtime: 'nodejs26.x' })
  },
  preprocess: vitePreprocess()
};
export default config;
