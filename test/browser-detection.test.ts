import { describe, expect, it } from "vitest";
import { detectBrowser, detectIE } from "../src/browser-detection";

describe("browser Detection", () => {
    describe("chrome detection", () => {
        it("should detect Chrome on Windows", () => {
            const ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36";
            const result = detectBrowser(ua, { chrome: true }, "Google Inc.");

            expect(result.isChrome).toBe(true);
            expect(result.isFirefox).toBe(false);
            expect(result.isSafari).toBe(false);
            expect(result.webp).toBe(true);
        });

        it("should detect Chrome on macOS", () => {
            const ua = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36";
            const result = detectBrowser(ua, { chrome: true }, "Google Inc.");

            expect(result.isChrome).toBe(true);
        });

        it("should detect Chrome on Android", () => {
            const ua = "Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Mobile Safari/537.36";
            const result = detectBrowser(ua, { chrome: true }, "Google Inc.");

            expect(result.isChrome).toBe(true);
        });
    });

    describe("firefox detection", () => {
        it("should detect Firefox on Windows", () => {
            const ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:120.0) Gecko/20100101 Firefox/120.0";
            const result = detectBrowser(ua, undefined, undefined);

            expect(result.isFirefox).toBe(true);
            expect(result.isChrome).toBe(false);
            expect(result.isSafari).toBe(false);
        });

        it("should detect Firefox on macOS", () => {
            const ua = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:120.0) Gecko/20100101 Firefox/120.0";
            const result = detectBrowser(ua, undefined, undefined);

            expect(result.isFirefox).toBe(true);
        });

        it("should detect Firefox on Linux", () => {
            const ua = "Mozilla/5.0 (X11; Linux x86_64; rv:120.0) Gecko/20100101 Firefox/120.0";
            const result = detectBrowser(ua, undefined, undefined);

            expect(result.isFirefox).toBe(true);
        });

        it("should detect Firefox on Android", () => {
            const ua = "Mozilla/5.0 (Android 13; Mobile; rv:120.0) Gecko/120.0 Firefox/120.0";
            const result = detectBrowser(ua, undefined, undefined);

            expect(result.isFirefox).toBe(true);
        });
    });

    describe("safari detection", () => {
        it("should detect Safari on macOS", () => {
            const ua = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Safari/605.1.15";
            const result = detectBrowser(ua, undefined, "Apple Computer, Inc.");

            expect(result.isSafari).toBe(true);
            expect(result.isChrome).toBe(false);
            expect(result.isFirefox).toBe(false);
        });

        it("should detect Safari on iPhone", () => {
            const ua = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1";
            const result = detectBrowser(ua, undefined, "Apple Computer, Inc.");

            expect(result.isSafari).toBe(true);
        });

        it("should detect Safari on iPad", () => {
            const ua = "Mozilla/5.0 (iPad; CPU OS 16_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.3 Mobile/15E148 Safari/604.1";
            const result = detectBrowser(ua, undefined, "Apple Computer, Inc.");

            expect(result.isSafari).toBe(true);
        });

        it("should not detect Chrome as Safari", () => {
            const ua = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36";
            const result = detectBrowser(ua, { chrome: true }, "Google Inc.");

            expect(result.isSafari).toBe(false);
            expect(result.isChrome).toBe(true);
        });
    });

    describe("webP support detection", () => {
        it("should detect WebP support in Chrome", () => {
            const ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36";
            const result = detectBrowser(ua, { chrome: true }, "Google Inc.");

            expect(result.webp).toBe(true);
        });

        it("should not detect WebP support in Safari", () => {
            const ua = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Safari/605.1.15";
            const result = detectBrowser(ua, undefined, "Apple Computer, Inc.");

            expect(result.webp).toBe(false);
        });

        it("should not detect WebP support in Firefox", () => {
            const ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:120.0) Gecko/20100101 Firefox/120.0";
            const result = detectBrowser(ua, undefined, undefined);

            expect(result.webp).toBe(false);
        });
    });
});

describe("internet Explorer Detection", () => {
    describe("iE version detection", () => {
        it("should detect IE 11", () => {
            const ua = "Mozilla/5.0 (Windows NT 10.0; Trident/7.0; rv:11.0) like Gecko";
            const result = detectIE(ua, "Netscape");

            expect(result.isIE).toBe(true);
            expect(result.IEVersion).toBe(11);
            expect(result.isIE11).toBe(true);
            expect(result.isIE11Up).toBe(true);
            expect(result.isIE11Down).toBe(true);
        });

        it("should detect IE 10", () => {
            const ua = "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)";
            const result = detectIE(ua, "Microsoft Internet Explorer");

            expect(result.isIE).toBe(true);
            expect(result.IEVersion).toBe(10);
            expect(result.isIE10).toBe(true);
            expect(result.isIE10Up).toBe(true);
            expect(result.isIE10Down).toBe(true);
        });

        it("should detect IE 9", () => {
            const ua = "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)";
            const result = detectIE(ua, "Microsoft Internet Explorer");

            expect(result.isIE).toBe(true);
            expect(result.IEVersion).toBe(9);
            expect(result.isIE9).toBe(true);
            expect(result.isIE9Up).toBe(true);
            expect(result.isIE9Down).toBe(true);
        });

        it("should detect IE 8", () => {
            const ua = "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0; Trident/4.0)";
            const result = detectIE(ua, "Microsoft Internet Explorer");

            expect(result.isIE).toBe(true);
            expect(result.IEVersion).toBe(8);
            expect(result.isIE8).toBe(true);
            expect(result.isIE8Up).toBe(true);
            expect(result.isIE8Down).toBe(true);
        });
    });

    describe("iE version comparisons", () => {
        it("should correctly identify IE11 Up/Down flags", () => {
            const ua = "Mozilla/5.0 (Windows NT 10.0; Trident/7.0; rv:11.0) like Gecko";
            const result = detectIE(ua, "Netscape");

            expect(result.isIE10Up).toBe(true);
            expect(result.isIE9Up).toBe(true);
            expect(result.isIE8Up).toBe(true);
        });

        it("should correctly identify IE9 Up/Down flags", () => {
            const ua = "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1)";
            const result = detectIE(ua, "Microsoft Internet Explorer");

            expect(result.isIE9Up).toBe(true);
            expect(result.isIE8Up).toBe(true);
            expect(result.isIE10Up).toBe(false);
            expect(result.isIE11Up).toBe(false);
        });
    });

    describe("non-IE browsers", () => {
        it("should not detect Chrome as IE", () => {
            const ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36";
            const result = detectIE(ua, "Netscape");

            expect(result.isIE).toBe(false);
            expect(result.IEVersion).toBe(-1);
        });

        it("should not detect Firefox as IE", () => {
            const ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:120.0) Gecko/20100101 Firefox/120.0";
            const result = detectIE(ua, "Netscape");

            expect(result.isIE).toBe(false);
            expect(result.IEVersion).toBe(-1);
        });

        it("should not detect Edge Chromium as IE", () => {
            const ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36 Edg/119.0.0.0";
            const result = detectIE(ua, "Netscape");

            expect(result.isIE).toBe(false);
        });
    });
});
