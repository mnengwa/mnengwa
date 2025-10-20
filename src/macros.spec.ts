import { describe, it, expect } from "bun:test";
import { HTML_TEMPLATE_FILES } from "./macros.ts" with { type: "macro" };

describe("macros.ts", () => {
    describe("HTML_TEMPLATE_FILES macro", () => {
        it("should only return files that start with underscore and have .html extension", async () => {
            const result = await HTML_TEMPLATE_FILES();

            expect(Array.isArray(result)).toBe(true);

            result.forEach((file) => {
                expect(file.startsWith("_")).toBe(true);
            });

            result.forEach((file) => {
                expect(file.endsWith(".html")).toBe(true);
            });
        });

        it("should not return files that don't start with underscore", async () => {
            const result = await HTML_TEMPLATE_FILES();

            const nonUnderscoreFiles = [
                "about.html",
                "index.html",
                "works.html",
            ];

            nonUnderscoreFiles.forEach((file) => {
                expect(result).not.toContain(file);
            });
        });

        it("should return only string filenames", async () => {
            const result = await HTML_TEMPLATE_FILES();

            result.forEach((file) => {
                expect(typeof file).toBe("string");
            });
        });
    });
});
