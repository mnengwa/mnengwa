import path from "node:path";
import type { BunPlugin } from "bun";
import { Window } from "happy-dom";

const EXTENDS_REGEXP = /^\s*<!--\s*@extend:base\s+(.+?)\s*-->\s*$/;

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
            console.debug("Imported HTML file:", args.path);

            const htmlString = await Bun.file(args.path).text();
            console.debug({ htmlString });

            // Handle @extend:base directive
            const directive = htmlString.split("\n")[0];
            if (directive !== undefined && EXTENDS_REGEXP.test(directive)) {
                return await extendBaseLayout(htmlString, directive);
            } else {
                // This might be a base template or standalone file
                return { contents: htmlString, loader: "html" };
            }
        });
    },
});

async function extendBaseLayout(
    htmlString: string,
    directive: string,
): Promise<{ contents: string; loader: "html" }> {
    const params = parseDirectiveParams(directive);

    const template = await Bun.file(
        path.join(process.cwd(), "src", "html", "_.html"),
    ).text();

    const rewriter = new HTMLRewriter()
        .on("*", {
            comments(comment) {
                if (comment.text.trim() === "@content") {
                    const content = htmlString.replace(directive, "");
                    comment.replace(content, { html: true }).remove();
                }
            },
        })
        .on("title", {
            element(el) {
                if (params.title) el.setInnerContent(params.title ?? "");
            },
        })
        .on("head", {
            element(el) {
                if (params.description) {
                    el.append(
                        `<meta name="description" content="${params.description}">`,
                        {
                            html: true,
                        },
                    );
                }
            },
        });

    return {
        contents: rewriter.transform(template),
        loader: "html",
    };
}

type DirectiveParams = Record<string, null | string>;
function parseDirectiveParams(directive: string): DirectiveParams {
    const attrs: DirectiveParams = {};

    // (.+?) is capturing everything between "@extend:base" and "-->"
    const params = directive.replace(EXTENDS_REGEXP, "$1");

    const window = new Window();
    const parser = new window.DOMParser();

    // Wrap in a fake element so the parser can attach attributes
    const doc = parser.parseFromString(
        `<template ${params}></template>`,
        "text/html",
    );

    const el = doc.querySelector("template");

    if (el) {
        for (const { name, value } of el.attributes) {
            attrs[name] = value;
        }
    }

    return attrs;
}
