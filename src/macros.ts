import path from "node:path";
import { Glob } from "bun";

export async function HTML_TEMPLATE_FILES() {
    const files = [];
    const glob = new Glob(`**/_*.html`);

    for await (const filename of glob.scan({
        dot: false,
        absolute: false,
        onlyFiles: true,
        cwd: path.join(process.cwd(), "src", "html"),
    })) {
        files.push(filename);
    }

    return files;
}
