import path from "node:path";
import { Window } from "happy-dom";
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
