import { describe, expect, it } from "vitest";
import { detectAndroid } from "../src/android-detection";

describe("android Detection", () => {
    describe("modern Android versions", () => {
        it("should detect Android 14", () => {
            const ua = "Mozilla/5.0 (Linux; Android 14; Pixel 8 Pro) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Mobile Safari/537.36";
            const result = detectAndroid(ua);

            expect(result.isAndroid).toBe(true);
            expect(result.isAndroidOld).toBe(false);
            expect(result.isAndroidStock).toBe(false);
        });

        it("should detect Android 13", () => {
            const ua = "Mozilla/5.0 (Linux; Android 13; SM-S918B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36";
            const result = detectAndroid(ua);

            expect(result.isAndroid).toBe(true);
            expect(result.isAndroidOld).toBe(false);
        });

        it("should detect Android 12", () => {
            const ua = "Mozilla/5.0 (Linux; Android 12; SM-G998B) AppleWebKit/537.36";
            const result = detectAndroid(ua);

            expect(result.isAndroid).toBe(true);
            expect(result.isAndroidOld).toBe(false);
        });
    });

    describe("old Android versions", () => {
        it("should detect Android 3.2 as old", () => {
            const ua = "Mozilla/5.0 (Linux; Android 3.2; HTC_Flyer_P512_NA) AppleWebKit/534.13";
            const result = detectAndroid(ua);

            expect(result.isAndroid).toBe(true);
            expect(result.isAndroidOld).toBe(true);
        });

        it("should detect Android 2.3 as old", () => {
            const ua = "Mozilla/5.0 (Linux; Android 2.3.6; GT-S5830i) AppleWebKit/533.1";
            const result = detectAndroid(ua);

            expect(result.isAndroid).toBe(true);
            expect(result.isAndroidOld).toBe(true);
        });

        it("should not mark Android 4.0 as old", () => {
            const ua = "Mozilla/5.0 (Linux; Android 4.0.4; Galaxy Nexus) AppleWebKit/535.19";
            const result = detectAndroid(ua);

            expect(result.isAndroid).toBe(true);
            expect(result.isAndroidOld).toBe(false);
        });
    });

    describe("android Stock Browser detection", () => {
        it("should detect old Android stock browser (WebKit < 537)", () => {
            const ua = "Mozilla/5.0 (Linux; Android 4.3; GT-I9300) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30";
            const result = detectAndroid(ua);

            expect(result.isAndroid).toBe(true);
            expect(result.isAndroidStock).toBe(true);
        });

        it("should detect Android 4.4 stock browser", () => {
            const ua = "Mozilla/5.0 (Linux; Android 4.4.2; Nexus 5) AppleWebKit/536.26 (KHTML, like Gecko) Version/4.0 Mobile Safari/536.26";
            const result = detectAndroid(ua);

            expect(result.isAndroid).toBe(true);
            expect(result.isAndroidStock).toBe(true);
        });

        it("should not detect Chrome as stock browser", () => {
            const ua = "Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Mobile Safari/537.36";
            const result = detectAndroid(ua);

            expect(result.isAndroid).toBe(true);
            expect(result.isAndroidStock).toBe(false);
        });

        it("should not detect modern WebKit as stock browser", () => {
            const ua = "Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Mobile Safari/537.36";
            const result = detectAndroid(ua);

            expect(result.isAndroid).toBe(true);
            expect(result.isAndroidStock).toBe(false);
        });
    });

    describe("device manufacturer user agents", () => {
        it("should detect Samsung Galaxy", () => {
            const ua = "Mozilla/5.0 (Linux; Android 13; SM-S918B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36";
            const result = detectAndroid(ua);

            expect(result.isAndroid).toBe(true);
        });

        it("should detect Google Pixel", () => {
            const ua = "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Mobile Safari/537.36";
            const result = detectAndroid(ua);

            expect(result.isAndroid).toBe(true);
        });

        it("should detect OnePlus", () => {
            const ua = "Mozilla/5.0 (Linux; Android 13; CPH2449) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Mobile Safari/537.36";
            const result = detectAndroid(ua);

            expect(result.isAndroid).toBe(true);
        });

        it("should detect Xiaomi", () => {
            const ua = "Mozilla/5.0 (Linux; Android 12; M2102J20SG) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Mobile Safari/537.36";
            const result = detectAndroid(ua);

            expect(result.isAndroid).toBe(true);
        });
    });

    describe("edge cases", () => {
        it("should not detect iOS as Android", () => {
            const ua = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15";
            const result = detectAndroid(ua);

            expect(result.isAndroid).toBe(false);
            expect(result.isAndroidOld).toBe(false);
            expect(result.isAndroidStock).toBe(false);
        });

        it("should not detect desktop as Android", () => {
            const ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36";
            const result = detectAndroid(ua);

            expect(result.isAndroid).toBe(false);
        });

        it("should handle case-insensitive Android detection", () => {
            const ua = "Mozilla/5.0 (Linux; android 13) AppleWebKit/537.36";
            const result = detectAndroid(ua);

            expect(result.isAndroid).toBe(true);
        });
    });
});
