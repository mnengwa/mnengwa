import adapter from '@sveltejs/adapter-node';
import { vitePreprocess as preprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: [preprocess()],

    kit: {
        adapter: adapter(),

        alias: {
            '$css/*': './src/css/*'
        }
    },
};

export default config;
