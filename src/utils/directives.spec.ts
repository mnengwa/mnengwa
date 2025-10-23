import { describe, expect, test } from "bun:test";
import { validate } from "./directives";

describe("directive.ts", () => {
    describe('validate: <!-- @extend:base title="Mnengwa Studios" description="Lorem ipsum" -->', () => {
        const validation = validate(
            '<!-- @extend:base title="Mnengwa Studios" description="Lorem ipsum" -->',
        );

        test("should return object with meta and template properties", async () => {
            const output = await validation;

            expect(output).toHaveProperty("meta");
            expect(output).toHaveProperty("template");
            expect(typeof output?.template).toBe("string");
        });

        test("meta: new Map()", async () => {
            const output = await validation;
            expect(output?.meta).toEqual(
                new Map([
                    ["title", "Mnengwa Studios"],
                    ["description", "Lorem ipsum"],
                ]),
            );
        });
    });

    describe('validate: <!-- @extend:base description="Lorem ipsum"  -->', () => {
        const validation = validate(
            '<!-- @extend:base description="Lorem ipsum" -->',
        );

        test("meta: new Map()", async () => {
            const output = await validation;
            expect(output?.meta).toEqual(
                new Map([["description", "Lorem ipsum"]]),
            );
        });
    });

    describe('validate: <!-- @extend:base title="Mnengwa Studios"  -->', () => {
        const validation = validate(
            '<!-- @extend:base title="Mnengwa Studios" -->',
        );

        test("meta: new Map()", async () => {
            const output = await validation;
            expect(output?.meta).toEqual(
                new Map([["title", "Mnengwa Studios"]]),
            );
        });
    });

    describe("validate: <!-- @extend:base -->", () => {
        const validation = validate("<!-- @extend:base -->");

        test("meta: null", async () => {
            const output = await validation;
            expect(output).toHaveProperty("meta", null);
        });
    });

    describe("validate: <!-- @extend:base -->", () => {
        const validation = validate("<!-- @extend:base -->");

        test("meta: null", async () => {
            const output = await validation;
            expect(output).toHaveProperty("meta", null);
        });
    });
});
