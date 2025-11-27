import type { BunPlugin } from "bun";
import { parseDirective, runDirective } from "@/utils/directives";

/**
 * A plugin that parses HTML files and renders the correct content using special comments as templating directives
 *
 * Supports:
 * - @extend:base directive to extend a base template
 * - @content directive to insert content into base template
 *
 * See: https://bun.com/docs/api/html-rewriter#comment-operations
 *
 * */
export default (<BunPlugin>{
    name: "renderer",
    setup({ onLoad }) {
        onLoad({ filter: /\.html$/ }, async (args) => {
            // console.debug("Imported HTML file:", args.path);

            // Parse the directive using the utility function
            const result = await parseDirective(args.path);

            if (result === null) {
                // No valid directive found, treat as standalone file
                const htmlString = await Bun.file(args.path).text();
                return { contents: htmlString, loader: "html" };
            }

            if ("error" in result) {
                // Error parsing directive
                console.error("Directive parsing error:", result.error);
                const htmlString = await Bun.file(args.path).text();
                return { contents: htmlString, loader: "html" };
            }

            // Use runDirective to process the template
            const transformedContent = await runDirective(result);

            return {
                contents: transformedContent,
                loader: "html",
            };
        });
    },
});
