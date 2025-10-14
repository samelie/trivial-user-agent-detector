import { describe, expect, it } from "vitest";
import { detectBrowser } from "../src/browser-detection";
import { createDetector } from "../src/index";

describe("browser Version Detection", () => {
    describe("chrome version", () => {
        it("should extract Chrome version from Windows", () => {
            const ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36";
            const result = detectBrowser(ua, { chrome: true }, "Google Inc.");

            expect(result.isChrome).toBe(true);
            expect(result.chromeVersion).toBe(119);
        });

        it("should extract Chrome version from macOS", () => {
            const ua = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";
            const result = detectBrowser(ua, { chrome: true }, "Google Inc.");

            expect(result.isChrome).toBe(true);
            expect(result.chromeVersion).toBe(120);
        });

        it("should extract Chrome version from Android", () => {
            const ua = "Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Mobile Safari/537.36";
            const result = detectBrowser(ua, { chrome: true }, "Google Inc.");

            expect(result.isChrome).toBe(true);
            expect(result.chromeVersion).toBe(118);
        });

        it("should return false for non-Chrome browsers", () => {
            const ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:120.0) Gecko/20100101 Firefox/120.0";
            const result = detectBrowser(ua, undefined, undefined);

            expect(result.isChrome).toBe(false);
            expect(result.chromeVersion).toBe(false);
        });
    });

    describe("firefox version", () => {
        it("should extract Firefox version from Windows", () => {
            const ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:120.0) Gecko/20100101 Firefox/120.0";
            const result = detectBrowser(ua, undefined, undefined);

            expect(result.isFirefox).toBe(true);
            expect(result.firefoxVersion).toBe(120);
        });

        it("should extract Firefox version from macOS", () => {
            const ua = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:121.0) Gecko/20100101 Firefox/121.0";
            const result = detectBrowser(ua, undefined, undefined);

            expect(result.isFirefox).toBe(true);
            expect(result.firefoxVersion).toBe(121);
        });

        it("should extract Firefox version from Linux", () => {
            const ua = "Mozilla/5.0 (X11; Linux x86_64; rv:119.0) Gecko/20100101 Firefox/119.0";
            const result = detectBrowser(ua, undefined, undefined);

            expect(result.isFirefox).toBe(true);
            expect(result.firefoxVersion).toBe(119);
        });

        it("should return false for non-Firefox browsers", () => {
            const ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36";
            const result = detectBrowser(ua, { chrome: true }, "Google Inc.");

            expect(result.isFirefox).toBe(false);
            expect(result.firefoxVersion).toBe(false);
        });
    });

    describe("safari version", () => {
        it("should extract Safari version from macOS", () => {
            const ua = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Safari/605.1.15";
            const result = detectBrowser(ua, undefined, "Apple Computer, Inc.");

            expect(result.isSafari).toBe(true);
            expect(result.safariVersion).toBe(17);
        });

        it("should extract Safari version from iOS", () => {
            const ua = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1";
            const result = detectBrowser(ua, undefined, "Apple Computer, Inc.");

            expect(result.isSafari).toBe(true);
            expect(result.safariVersion).toBe(17);
        });

        it("should extract Safari 16 version", () => {
            const ua = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Safari/605.1.15";
            const result = detectBrowser(ua, undefined, "Apple Computer, Inc.");

            expect(result.isSafari).toBe(true);
            expect(result.safariVersion).toBe(16);
        });

        it("should return false for non-Safari browsers", () => {
            const ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36";
            const result = detectBrowser(ua, { chrome: true }, "Google Inc.");

            expect(result.isSafari).toBe(false);
            expect(result.safariVersion).toBe(false);
        });
    });

    describe("edge version", () => {
        it("should extract Chromium Edge version", () => {
            const ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36 Edg/119.0.0.0";
            const result = detectBrowser(ua, undefined, undefined);

            expect(result.isEdge).toBe(true);
            expect(result.edgeVersion).toBe(119);
        });

        it("should extract Legacy Edge version", () => {
            const ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36 Edge/18.17763";
            const result = detectBrowser(ua, undefined, undefined);

            expect(result.isEdge).toBe(true);
            expect(result.edgeVersion).toBe(18);
        });

        it("should extract Edge 120 version", () => {
            const ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0";
            const result = detectBrowser(ua, undefined, undefined);

            expect(result.isEdge).toBe(true);
            expect(result.edgeVersion).toBe(120);
        });

        it("should return false for non-Edge browsers", () => {
            const ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36";
            const result = detectBrowser(ua, { chrome: true }, "Google Inc.");

            expect(result.isEdge).toBe(false);
            expect(result.edgeVersion).toBe(false);
        });
    });

    describe("opera version", () => {
        it("should extract modern Opera version", () => {
            const ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36 OPR/105.0.0.0";
            const result = detectBrowser(ua, undefined, undefined);

            expect(result.isOpera).toBe(true);
            expect(result.operaVersion).toBe(105);
        });

        it("should extract Opera 104 version", () => {
            const ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36 OPR/104.0.0.0";
            const result = detectBrowser(ua, undefined, undefined);

            expect(result.isOpera).toBe(true);
            expect(result.operaVersion).toBe(104);
        });

        it("should extract old Opera version", () => {
            const ua = "Opera/9.80 (Windows NT 6.1; WOW64) Presto/2.12.388 Version/12.18";
            const result = detectBrowser(ua, undefined, undefined);

            expect(result.isOpera).toBe(true);
            expect(result.operaVersion).toBe(9);
        });

        it("should return false for non-Opera browsers", () => {
            const ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36";
            const result = detectBrowser(ua, { chrome: true }, "Google Inc.");

            expect(result.isOpera).toBe(false);
            expect(result.operaVersion).toBe(false);
        });
    });

    describe("edge and Opera not detected as Chrome", () => {
        it("should not detect Edge as Chrome", () => {
            const ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36 Edg/119.0.0.0";
            const result = detectBrowser(ua, { chrome: true }, "Google Inc.");

            expect(result.isChrome).toBe(false);
            expect(result.isEdge).toBe(true);
            expect(result.chromeVersion).toBe(false);
            expect(result.edgeVersion).toBe(119);
        });

        it("should not detect Opera as Chrome", () => {
            const ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36 OPR/105.0.0.0";
            const result = detectBrowser(ua, { chrome: true }, "Google Inc.");

            expect(result.isChrome).toBe(false);
            expect(result.isOpera).toBe(true);
            expect(result.chromeVersion).toBe(false);
            expect(result.operaVersion).toBe(105);
        });
    });
});

describe("browser Version Comparison Helpers", () => {
    const detector = createDetector();

    describe("isBrowserVersionGreaterThan", () => {
        it("should return true when version is greater", () => {
            expect(detector.isBrowserVersionGreaterThan(120, 119)).toBe(true);
            expect(detector.isBrowserVersionGreaterThan(100, 50)).toBe(true);
        });

        it("should return false when version is equal", () => {
            expect(detector.isBrowserVersionGreaterThan(119, 119)).toBe(false);
        });

        it("should return false when version is less", () => {
            expect(detector.isBrowserVersionGreaterThan(118, 119)).toBe(false);
        });

        it("should return false when version is false", () => {
            expect(detector.isBrowserVersionGreaterThan(false, 119)).toBe(false);
        });
    });

    describe("isBrowserVersionGreaterThanOrEqual", () => {
        it("should return true when version is greater", () => {
            expect(detector.isBrowserVersionGreaterThanOrEqual(120, 119)).toBe(true);
        });

        it("should return true when version is equal", () => {
            expect(detector.isBrowserVersionGreaterThanOrEqual(119, 119)).toBe(true);
        });

        it("should return false when version is less", () => {
            expect(detector.isBrowserVersionGreaterThanOrEqual(118, 119)).toBe(false);
        });

        it("should return false when version is false", () => {
            expect(detector.isBrowserVersionGreaterThanOrEqual(false, 119)).toBe(false);
        });
    });

    describe("isBrowserVersionLessThan", () => {
        it("should return true when version is less", () => {
            expect(detector.isBrowserVersionLessThan(118, 119)).toBe(true);
            expect(detector.isBrowserVersionLessThan(50, 100)).toBe(true);
        });

        it("should return false when version is equal", () => {
            expect(detector.isBrowserVersionLessThan(119, 119)).toBe(false);
        });

        it("should return false when version is greater", () => {
            expect(detector.isBrowserVersionLessThan(120, 119)).toBe(false);
        });

        it("should return false when version is false", () => {
            expect(detector.isBrowserVersionLessThan(false, 119)).toBe(false);
        });
    });

    describe("isBrowserVersionLessThanOrEqual", () => {
        it("should return true when version is less", () => {
            expect(detector.isBrowserVersionLessThanOrEqual(118, 119)).toBe(true);
        });

        it("should return true when version is equal", () => {
            expect(detector.isBrowserVersionLessThanOrEqual(119, 119)).toBe(true);
        });

        it("should return false when version is greater", () => {
            expect(detector.isBrowserVersionLessThanOrEqual(120, 119)).toBe(false);
        });

        it("should return false when version is false", () => {
            expect(detector.isBrowserVersionLessThanOrEqual(false, 119)).toBe(false);
        });
    });

    describe("isBrowserVersionEqual", () => {
        it("should return true when versions are equal", () => {
            expect(detector.isBrowserVersionEqual(119, 119)).toBe(true);
            expect(detector.isBrowserVersionEqual(100, 100)).toBe(true);
        });

        it("should return false when versions are different", () => {
            expect(detector.isBrowserVersionEqual(119, 120)).toBe(false);
            expect(detector.isBrowserVersionEqual(120, 119)).toBe(false);
        });

        it("should return false when version is false", () => {
            expect(detector.isBrowserVersionEqual(false, 119)).toBe(false);
        });

        it("should return true when both are false", () => {
            expect(detector.isBrowserVersionEqual(false, false)).toBe(true);
        });
    });

    describe("isBrowserVersionInRange", () => {
        it("should return true when version is in range", () => {
            expect(detector.isBrowserVersionInRange(119, 100, 120)).toBe(true);
            expect(detector.isBrowserVersionInRange(100, 100, 100)).toBe(true);
            expect(detector.isBrowserVersionInRange(110, 100, 120)).toBe(true);
        });

        it("should return true when version equals min boundary", () => {
            expect(detector.isBrowserVersionInRange(100, 100, 120)).toBe(true);
        });

        it("should return true when version equals max boundary", () => {
            expect(detector.isBrowserVersionInRange(120, 100, 120)).toBe(true);
        });

        it("should return false when version is below range", () => {
            expect(detector.isBrowserVersionInRange(99, 100, 120)).toBe(false);
        });

        it("should return false when version is above range", () => {
            expect(detector.isBrowserVersionInRange(121, 100, 120)).toBe(false);
        });

        it("should return false when version is false", () => {
            expect(detector.isBrowserVersionInRange(false, 100, 120)).toBe(false);
        });
    });

    describe("real-world usage examples", () => {
        it("should check if Chrome supports a feature (version >= 100)", () => {
            const ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36";
            const result = detectBrowser(ua, { chrome: true }, "Google Inc.");

            const supportsFeature = detector.isBrowserVersionGreaterThanOrEqual(result.chromeVersion, 100);
            expect(supportsFeature).toBe(true);
        });

        it("should check if Firefox needs polyfill (version < 90)", () => {
            const ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:120.0) Gecko/20100101 Firefox/120.0";
            const result = detectBrowser(ua, undefined, undefined);

            const needsPolyfill = detector.isBrowserVersionLessThan(result.firefoxVersion, 90);
            expect(needsPolyfill).toBe(false);
        });

        it("should check if Safari version is in supported range (14-17)", () => {
            const ua = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Safari/605.1.15";
            const result = detectBrowser(ua, undefined, "Apple Computer, Inc.");

            const isSupported = detector.isBrowserVersionInRange(result.safariVersion, 14, 17);
            expect(isSupported).toBe(true);
        });

        it("should check exact Edge version for bug workaround", () => {
            const ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36 Edge/18.17763";
            const result = detectBrowser(ua, undefined, undefined);

            const hasBug = detector.isBrowserVersionEqual(result.edgeVersion, 18);
            expect(hasBug).toBe(true);
        });
    });
});
