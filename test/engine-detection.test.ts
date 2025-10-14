import { describe, expect, it } from "vitest";
import { detectEngine } from "../src/engine-detection.ts";

describe("rendering Engine Detection", () => {
    describe("blink engine", () => {
        it("should detect Blink in Chrome", () => {
            const ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36";
            const result = detectEngine(ua);

            expect(result.engine).toBe("Blink");
        });

        it("should detect Blink in Edge Chromium", () => {
            const ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36 Edg/119.0.0.0";
            const result = detectEngine(ua);

            expect(result.engine).toBe("Blink");
        });

        it("should detect Blink in Opera", () => {
            const ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36 OPR/105.0.0.0";
            const result = detectEngine(ua);

            expect(result.engine).toBe("Blink");
        });

        it("should detect Blink in Brave", () => {
            const ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36";
            const result = detectEngine(ua);

            expect(result.engine).toBe("Blink");
        });
    });

    describe("webKit engine", () => {
        it("should detect WebKit in Safari on macOS", () => {
            const ua = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Safari/605.1.15";
            const result = detectEngine(ua);

            expect(result.engine).toBe("WebKit");
        });

        it("should detect WebKit in Safari on iOS", () => {
            const ua = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1";
            const result = detectEngine(ua);

            expect(result.engine).toBe("WebKit");
        });

        it("should not confuse WebKit with Blink", () => {
            const ua = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Safari/605.1.15";
            const result = detectEngine(ua);

            expect(result.engine).toBe("WebKit");
            expect(result.engine).not.toBe("Blink");
        });
    });

    describe("gecko engine", () => {
        it("should detect Gecko in Firefox on Windows", () => {
            const ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:120.0) Gecko/20100101 Firefox/120.0";
            const result = detectEngine(ua);

            expect(result.engine).toBe("Gecko");
        });

        it("should detect Gecko in Firefox on macOS", () => {
            const ua = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:120.0) Gecko/20100101 Firefox/120.0";
            const result = detectEngine(ua);

            expect(result.engine).toBe("Gecko");
        });

        it("should detect Gecko in Firefox on Linux", () => {
            const ua = "Mozilla/5.0 (X11; Linux x86_64; rv:120.0) Gecko/20100101 Firefox/120.0";
            const result = detectEngine(ua);

            expect(result.engine).toBe("Gecko");
        });

        it("should not detect 'like Gecko' as Gecko", () => {
            const ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36";
            const result = detectEngine(ua);

            expect(result.engine).not.toBe("Gecko");
            expect(result.engine).toBe("Blink");
        });
    });

    describe("trident engine", () => {
        it("should detect Trident in IE 11", () => {
            const ua = "Mozilla/5.0 (Windows NT 10.0; Trident/7.0; rv:11.0) like Gecko";
            const result = detectEngine(ua);

            expect(result.engine).toBe("Trident");
        });

        it("should detect Trident in IE 10", () => {
            const ua = "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)";
            const result = detectEngine(ua);

            expect(result.engine).toBe("Trident");
        });

        it("should detect Trident in IE 9", () => {
            const ua = "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)";
            const result = detectEngine(ua);

            expect(result.engine).toBe("Trident");
        });
    });

    describe("edgeHTML engine", () => {
        it("should detect EdgeHTML in Legacy Edge", () => {
            const ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36 Edge/18.17763";
            const result = detectEngine(ua);

            // Note: This might be tricky because Edge/18 doesn't always include "edgehtml" in UA
            // The test might need adjustment based on actual Legacy Edge UA strings
            expect(result.engine).toBe("EdgeHTML");
        });
    });

    describe("presto engine", () => {
        it("should detect Presto in Opera 12", () => {
            const ua = "Opera/9.80 (Windows NT 6.1; WOW64) Presto/2.12.388 Version/12.18";
            const result = detectEngine(ua);

            expect(result.engine).toBe("Presto");
        });
    });

    describe("unknown engines", () => {
        it("should return unknown for unrecognized user agent", () => {
            const ua = "CustomBrowser/1.0";
            const result = detectEngine(ua);

            expect(result.engine).toBe("unknown");
        });

        it("should return unknown for empty user agent", () => {
            const ua = "";
            const result = detectEngine(ua);

            expect(result.engine).toBe("unknown");
        });
    });
});
