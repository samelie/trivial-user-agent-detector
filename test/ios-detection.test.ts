import { describe, expect, it } from "vitest";
import { detectIOS } from "../src/ios-detection";

describe("iOS Detection", () => {
    describe("iPhone detection", () => {
        it("should detect iPhone 15 Pro", () => {
            const ua = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1";
            const result = detectIOS(ua, "iPhone");

            expect(result.isIphone).toBe(true);
            expect(result.isIOS).toBe(true);
            expect(result.isIpad).toBe(false);
            expect(result.isIpod).toBe(false);
            expect(result.IOSVersion).toBe(17);
        });

        it("should detect iPhone 14 with iOS 16", () => {
            const ua = "Mozilla/5.0 (iPhone; CPU iPhone OS 16_5_1 like Mac OS X) AppleWebKit/605.1.15";
            const result = detectIOS(ua, "iPhone");

            expect(result.isIphone).toBe(true);
            expect(result.IOSVersion).toBe(16);
        });

        it("should detect iPhone with iOS 15", () => {
            const ua = "Mozilla/5.0 (iPhone; CPU iPhone OS 15_6 like Mac OS X) AppleWebKit/605.1.15";
            const result = detectIOS(ua, "iPhone");

            expect(result.isIphone).toBe(true);
            expect(result.IOSVersion).toBe(15);
        });
    });

    describe("iPad detection", () => {
        it("should detect iPad Pro", () => {
            const ua = "Mozilla/5.0 (iPad; CPU OS 16_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.3 Mobile/15E148 Safari/604.1";
            const result = detectIOS(ua, "iPad");

            expect(result.isIpad).toBe(true);
            expect(result.isIOS).toBe(true);
            expect(result.isIphone).toBe(false);
            expect(result.IOSVersion).toBe(16);
        });

        it("should detect iPad Air with iOS 15", () => {
            const ua = "Mozilla/5.0 (iPad; CPU OS 15_7 like Mac OS X) AppleWebKit/605.1.15";
            const result = detectIOS(ua, "iPad");

            expect(result.isIpad).toBe(true);
            expect(result.IOSVersion).toBe(15);
        });
    });

    describe("iPod detection", () => {
        it("should detect iPod Touch", () => {
            const ua = "Mozilla/5.0 (iPod touch; CPU iPhone OS 12_5_7 like Mac OS X) AppleWebKit/605.1.15";
            const result = detectIOS(ua, "iPod");

            expect(result.isIpod).toBe(true);
            expect(result.isIOS).toBe(true);
            expect(result.isIphone).toBe(false);
            expect(result.isIpad).toBe(false);
            expect(result.IOSVersion).toBe(12);
        });
    });

    describe("iOS version-specific detection", () => {
        it("should detect iOS 9", () => {
            const ua = "Mozilla/5.0 (iPhone; CPU iPhone OS 9_3_5 like Mac OS X) AppleWebKit/601.1.46";
            const result = detectIOS(ua, "iPhone");

            expect(result.isIOS9).toBe(true);
            expect(result.IOSVersion).toBe(9);
        });

        it("should detect iOS 8", () => {
            const ua = "Mozilla/5.0 (iPhone; CPU iPhone OS 8_4_1 like Mac OS X) AppleWebKit/600.1.4";
            const result = detectIOS(ua, "iPhone");

            expect(result.isIOS8).toBe(true);
            expect(result.IOSVersion).toBe(8);
        });

        it("should detect iOS 7", () => {
            const ua = "Mozilla/5.0 (iPhone; CPU iPhone OS 7_1_2 like Mac OS X) AppleWebKit/537.51.2";
            const result = detectIOS(ua, "iPhone");

            expect(result.isIOS7).toBe(true);
            expect(result.IOSVersion).toBe(7);
        });

        it("should detect iOS 6", () => {
            const ua = "Mozilla/5.0 (iPhone; CPU iPhone OS 6_1_4 like Mac OS X) AppleWebKit/536.26";
            const result = detectIOS(ua, "iPhone");

            expect(result.isIOS6).toBe(true);
            expect(result.IOSVersion).toBe(6);
        });

        it("should detect iOS 5", () => {
            const ua = "Mozilla/5.0 (iPhone; CPU iPhone OS 5_1_1 like Mac OS X) AppleWebKit/534.46";
            const result = detectIOS(ua, "iPhone");

            expect(result.isIOS5).toBe(true);
            expect(result.IOSVersion).toBe(5);
        });
    });

    describe("edge cases", () => {
        it("should return false for non-iOS platform", () => {
            const ua = "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X)";
            const result = detectIOS(ua, "MacIntel");

            expect(result.isIOS).toBe(true); // UA string has iPhone
            expect(result.IOSVersion).toBe(false); // Platform doesn't match
        });

        it("should handle missing version information", () => {
            const ua = "Mozilla/5.0 (iPhone)";
            const result = detectIOS(ua, "iPhone");

            expect(result.isIphone).toBe(true);
            expect(result.IOSVersion).toBe(false);
        });

        it("should not detect iOS on Android user agent", () => {
            const ua = "Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36";
            const result = detectIOS(ua, "Linux armv8l");

            expect(result.isIOS).toBe(false);
            expect(result.isIphone).toBe(false);
            expect(result.isIpad).toBe(false);
        });
    });
});
