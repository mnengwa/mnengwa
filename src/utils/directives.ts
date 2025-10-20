import path from "node:path";
import { Window } from "happy-dom";

export async function validate(directive?: string) {
    // 1. Retrive the template
    if (directive === undefined || typeof directive !== "string")
        return { error: "The directive param MUST be a string" };

    directive = directive.replace(/\s+/g, " ").trim();
    if (directive.length === 0) return null;

    if (!directive.startsWith("<!--") && !directive.endsWith("-->"))
        return null;

    directive = directive.replace(/^<!--/, "").replace(/-->/, "").trim();

    const filename = directive.match(/^@extend:\w+(\s)*/);

    if (filename === null) return null;

    let pathname = filename[0]
        .trim()
        .replace("@extend:", "")
        .replace("base", "_");

    pathname = `${pathname}.html`;
    pathname = path.join(process.cwd(), "src", "html", pathname);

    const fileBlob = Bun.file(path.join(pathname));
    const exists = await fileBlob.exists();

    if (!exists) return null;

    // 2. Parse the attributes
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

    // 3. Get the template contents
    const template = await fileBlob.text();

    return { meta, template };
}

export async function run({
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
                        `<meta name="description" content="${meta.get("description")}">`,
                        {
                            html: true,
                        },
                    );
                }
            },
        });

    return rewriter.transform(template);
}
