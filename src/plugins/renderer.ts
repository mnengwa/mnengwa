import path from "node:path";
import { Window } from "happy-dom";
import type { BunPlugin } from "bun";
import { HTML_TEMPLATE_FILES } from "@/macros";

export async function parseDirective(htmlPathname: string) {
    // 1. Extract the directive
    const content = await Bun.file(htmlPathname).text();
    let directive = content.split("\n")[0];

    if (directive === undefined || typeof directive !== "string")
        // 2. Retrive the template
        return { error: "The directive param MUST be a string" };

    directive = directive.replace(/\s+/g, " ").trim();
    if (directive.length === 0) return null;

    if (!directive.startsWith("<!--") || !directive.endsWith("-->"))
        return null;

    directive = directive.replace(/^<!--/, "").replace(/-->/, "").trim();

    const filename = directive.match(/^@extend:\w+(\s)*/);

    if (filename === null) return null;

    let pathname = filename[0].trim().replace("@extend:", "");

    pathname = pathname === "base" ? "_.html" : `_${pathname}.html`;
    const exists = (await HTML_TEMPLATE_FILES()).includes(pathname);

    if (!exists) return null;

    // 3. Parse the attributes
    const window = new Window();
    const parser = new window.DOMParser();

    let meta: null | Map<string, null | string> = null;
    const attributes = directive.replace(/^@extend:\w+(\s)*/, "").trim();

    const document = parser.parseFromString(
        `<template ${attributes}></template>`,
        "text/html",
    );

    const element = document.querySelector("template");

    if (element?.attributes?.length) {
        meta = new Map();
        for (const { name, value } of element.attributes) {
            meta.set(name, value);
        }
    }

    // 4. Get the template contents
    const template = await Bun.file(
        path.join(process.cwd(), "src", "html", pathname),
    ).text();

    return { meta, content, directive, template };
}

export async function runDirective({
    meta,
    content,
    template,
    directive,
}: {
    content: string;
    template: string;
    directive: string;
    meta: null | Map<string, null | string>;
}) {
    const rewriter = new HTMLRewriter()
        .on("*", {
            comments(comment) {
                if (comment.text.trim() === "@content") {
                    const htmlString = content.replace(directive, "");
                    comment.replace(htmlString, { html: true }).remove();
                }
            },
        })
        .on("title", {
            element(el) {
                if (meta?.has("title"))
                    el.setInnerContent(meta.get("title") ?? "");
            },
        })
        .on("head", {
            element(el) {
                if (meta?.has("description")) {
                    el.append(
                        `<meta name="description" content="${Bun.escapeHTML(meta.get("description") ?? "")}">`,
                        {
                            html: true,
                        },
                    );
                }
            },
        });

    return rewriter.transform(template);
}

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
                    if (["alt", "src", "data-render"].includes(key)) continue;

                    if (key === "class") {
                        svgElement.classList.add(
                            ...val.split(" ").map((c) => c.trim()),
                        );
                    }

                    svgElement.setAttribute(key, val);
                }

                // Replace the image with the SVG
                img.replace(svgElement.toString(), { html: true });
            }
        },
    });

    return rewriter.transform(htmlString);
}

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
            const t1 = await runDirective(result);

            const t2 = await useVector(t1);

            return {
                contents: t2,
                loader: "html",
            };
        });
    },
});
