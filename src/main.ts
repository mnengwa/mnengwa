import about from "@html/about.html";
import index from "@html/index.html";
import works from "@html/works.html";
import { serve } from "bun";

const server = serve({
    routes: {
        "/": index,
        "/about": about,
        "/works": works,
    },

    development: true,
});

console.log(`Listening on ${server.url}`);
