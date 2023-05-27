import adapter from '@sveltejs/adapter-node';
import { vitePreprocess as preprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    kit: {
        adapter: adapter()
    },
    preprocess: preprocess()
};

export default config;
