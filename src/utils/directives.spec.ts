import path from "node:path";
import { parseDirective } from "./directives";
import { describe, expect, test } from "bun:test";

describe("directive.ts", () => {
    describe("Base template", () => {
        describe("parseDirective: extend directive with title and description", () => {
            const INPUT =
                '<!-- @extend:base title="Mnengwa Studios" description="Lorem ipsum" -->';
            const EXPECTED_META = new Map([
                ["title", "Mnengwa Studios"],
                ["description", "Lorem ipsum"],
            ]);

            const validation = parseDirective(INPUT);

            test("should return an object with 'meta' and 'template' properties", async () => {
                const output = await validation;
                const content = await Bun.file(
                    path.join(process.cwd(), "src", "html", "_.html"),
                ).text();

                expect(output).toHaveProperty("meta");
                expect(output).toHaveProperty("template");
                expect(output?.template).toEqual(content);
            });

            test("should have parsed title and description correctly", async () => {
                const output = await validation;
                expect(output?.meta).toEqual(EXPECTED_META);
            });
        });

        describe("parseDirective: extend directive with only description", () => {
            const INPUT = '<!-- @extend:base description="Lorem ipsum" -->';
            const EXPECTED_META = new Map([["description", "Lorem ipsum"]]);

            const validation = parseDirective(INPUT);

            test("should have parsed the description attribute ONLY", async () => {
                const output = await validation;
                expect(output?.meta).toEqual(EXPECTED_META);
            });
        });

        describe("parseDirective: extend directive with only title", () => {
            const INPUT = '<!-- @extend:base title="Mnengwa Studios" -->';
            const EXPECTED_META = new Map([["title", "Mnengwa Studios"]]);

            const validation = parseDirective(INPUT);

            test("should have parsed the title attribute ONLY", async () => {
                const output = await validation;
                expect(output?.meta).toEqual(EXPECTED_META);
            });
        });

        describe("parseDirective: extend directive with no metadata", () => {
            const INPUT = "<!-- @extend:base -->";
            const validation = parseDirective(INPUT);

            test("should have returned null on the meta property", async () => {
                const output = await validation;
                expect(output).toHaveProperty("meta", null);
            });
        });
    });

    describe("Test template", () => {
        describe("parseDirective: extend directive with no metadata", () => {
            const INPUT = "<!-- @extend:test -->";
            const validation = parseDirective(INPUT);

            test("should return the correct test template", async () => {
                const output = await validation;
                const content = await Bun.file(
                    path.join(process.cwd(), "src", "html", "_test.html"),
                ).text();

                expect(output?.template).toEqual(content);
            });
        });
    });
});
