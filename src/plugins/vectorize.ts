import { Window } from "happy-dom";
import type { BunPlugin } from "bun";

export async function useVector(htmlString: string) {
    const rewriter = new HTMLRewriter().on("img", {
        // https://bun.com/docs/runtime/html-rewriter#element-handlers
        async element(img) {
            // Get src attribute
            const src = img.getAttribute("src");
            const render = img.getAttribute("data-render");

            if (render === "vector" && src?.endsWith(".svg")) {
                // Import the SVG content from the cwd
                const svgPathname = await import(src!);
                const svgContents = await Bun.file(svgPathname.default).text();

                // Set the attributes
                const window = new Window();
                const parser = new window.DOMParser();
                const svgElement = parser.parseFromString(
                    svgContents,
                    "image/svg+xml",
                ).documentElement;

                for (const [key, val] of img.attributes) {
                    if (key !== "class") continue;

                    svgElement.classList.add(
                        ...val.split(" ").map((c) => c.trim()),
                    );
                }

                // Replace the image with the SVG
                img.replace(svgElement.toString(), { html: true });
            }
        },
    });

    return rewriter.transform(htmlString);
}

/**
 * A plugin that replaces img tags pointing to an SVG with the actual SVG markup
 *
 * Supports:
 * - icons
 * - brand
 *
 * */
export default (<BunPlugin>{
    name: "vectorize",
    setup({ onLoad }) {
        onLoad({ filter: /\.html$/ }, async (args) => {
            const htmlString = await Bun.file(args.path).text();

            const contents = await useVector(htmlString);

            return {
                contents: contents,
                loader: "html",
            };
        });
    },
});
