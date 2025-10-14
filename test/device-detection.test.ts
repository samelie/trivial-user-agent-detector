import { describe, expect, it } from "vitest";
import { detectDevice } from "../src/device-detection";

describe("device Detection", () => {
    describe("mobile devices", () => {
        it("should detect iPhone as mobile", () => {
            const ua = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15";
            const result = detectDevice(ua, false, true);

            expect(result.device).toBe("mobile");
            expect(result.isMobile).toBe(true);
            expect(result.isTablet).toBe(false);
            expect(result.isDesktop).toBe(false);
        });

        it("should detect Android phone as mobile", () => {
            const ua = "Mozilla/5.0 (Linux; Android 13; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Mobile Safari/537.36";
            const result = detectDevice(ua, true, false);

            expect(result.device).toBe("mobile");
            expect(result.isMobile).toBe(true);
        });

        it("should detect iPod as mobile", () => {
            const ua = "Mozilla/5.0 (iPod touch; CPU iPhone OS 12_5_7 like Mac OS X)";
            const result = detectDevice(ua, false, true);

            expect(result.device).toBe("mobile");
            expect(result.isMobile).toBe(true);
        });

        it("should detect Windows Phone as mobile", () => {
            const ua = "Mozilla/5.0 (Windows Phone 10.0; Android 6.0.1; Microsoft; Lumia 950) AppleWebKit/537.36";
            const result = detectDevice(ua, false, false);

            expect(result.device).toBe("mobile");
            expect(result.isMobile).toBe(true);
        });

        it("should detect BlackBerry as mobile", () => {
            const ua = "Mozilla/5.0 (BlackBerry; U; BlackBerry 9900; en) AppleWebKit/534.11+";
            const result = detectDevice(ua, false, false);

            expect(result.device).toBe("mobile");
            expect(result.isMobile).toBe(true);
        });
    });

    describe("tablet devices", () => {
        it("should detect iPad as tablet", () => {
            const ua = "Mozilla/5.0 (iPad; CPU OS 16_3 like Mac OS X) AppleWebKit/605.1.15";
            const result = detectDevice(ua, false, true);

            expect(result.device).toBe("tablet");
            expect(result.isTablet).toBe(true);
            expect(result.isMobile).toBe(false);
            expect(result.isDesktop).toBe(false);
        });

        it("should detect Android tablet", () => {
            const ua = "Mozilla/5.0 (Linux; Android 13; SM-X906C) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36";
            const result = detectDevice(ua, true, false);

            expect(result.device).toBe("tablet");
            expect(result.isTablet).toBe(true);
        });

        it("should detect Kindle Fire as tablet", () => {
            const ua = "Mozilla/5.0 (Linux; Android 7.1.2; KFKAWI) AppleWebKit/537.36 (KHTML, like Gecko) Silk/119.6.3 like Chrome/119.0.6045.193 Safari/537.36";
            const result = detectDevice(ua, true, false);

            expect(result.device).toBe("tablet");
            expect(result.isTablet).toBe(true);
        });

        it("should detect Samsung Galaxy Tab as tablet", () => {
            const ua = "Mozilla/5.0 (Linux; Android 12; SM-T976B) AppleWebKit/537.36";
            const result = detectDevice(ua, true, false);

            expect(result.device).toBe("tablet");
            expect(result.isTablet).toBe(true);
        });
    });

    describe("desktop devices", () => {
        it("should detect Windows desktop", () => {
            const ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36";
            const result = detectDevice(ua, false, false);

            expect(result.device).toBe("desktop");
            expect(result.isDesktop).toBe(true);
            expect(result.isMobile).toBe(false);
            expect(result.isTablet).toBe(false);
        });

        it("should detect macOS desktop", () => {
            const ua = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36";
            const result = detectDevice(ua, false, false);

            expect(result.device).toBe("desktop");
            expect(result.isDesktop).toBe(true);
        });

        it("should detect Linux desktop", () => {
            const ua = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36";
            const result = detectDevice(ua, false, false);

            expect(result.device).toBe("desktop");
            expect(result.isDesktop).toBe(true);
        });
    });

    describe("smart TV devices", () => {
        it("should detect Samsung Smart TV", () => {
            const ua = "Mozilla/5.0 (SMART-TV; Linux; Tizen 6.5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.93 TV Safari/537.36";
            const result = detectDevice(ua, false, false);

            expect(result.device).toBe("smarttv");
        });

        it("should detect LG WebOS TV", () => {
            const ua = "Mozilla/5.0 (Web0S; Linux/SmartTV) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.79 Safari/537.36 WebAppManager";
            const result = detectDevice(ua, false, false);

            expect(result.device).toBe("smarttv");
        });

        it("should detect Apple TV", () => {
            const ua = "Mozilla/5.0 (Apple TV; CPU OS 16_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko)";
            const result = detectDevice(ua, false, false);

            expect(result.device).toBe("smarttv");
        });

        it("should detect Chromecast", () => {
            const ua = "Mozilla/5.0 (X11; Linux armv7l) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.225 Safari/537.36 CrKey/1.56.500000";
            const result = detectDevice(ua, false, false);

            expect(result.device).toBe("smarttv");
        });

        it("should detect Roku", () => {
            const ua = "Roku/DVP-10.0 (10.0.0.4131-48)";
            const result = detectDevice(ua, false, false);

            expect(result.device).toBe("smarttv");
        });
    });

    describe("game console devices", () => {
        it("should detect PlayStation 5", () => {
            const ua = "Mozilla/5.0 (PlayStation 5 5.50) AppleWebKit/605.1.15 (KHTML, like Gecko)";
            const result = detectDevice(ua, false, false);

            expect(result.device).toBe("console");
        });

        it("should detect Xbox Series X", () => {
            const ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64; Xbox; Xbox Series X) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36 Edge/44.18363.8131";
            const result = detectDevice(ua, false, false);

            expect(result.device).toBe("console");
        });

        it("should detect Nintendo Switch", () => {
            const ua = "Mozilla/5.0 (Nintendo Switch; WifiWebAuthApplet) AppleWebKit/609.4 (KHTML, like Gecko) NF/6.0.2.21.3 NintendoBrowser/5.1.0.22474";
            const result = detectDevice(ua, false, false);

            expect(result.device).toBe("console");
        });
    });

    describe("wearable devices", () => {
        it("should detect Apple Watch", () => {
            const ua = "Mozilla/5.0 (Apple Watch; CPU OS 10_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko)";
            const result = detectDevice(ua, false, false);

            expect(result.device).toBe("wearable");
        });

        it("should detect Samsung Galaxy Watch", () => {
            const ua = "Mozilla/5.0 (Linux; Tizen 5.5; SAMSUNG SM-R850) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/2.2 Chrome/69.0.3497.106 Mobile Safari/537.36";
            const result = detectDevice(ua, false, false);

            expect(result.device).toBe("wearable");
        });

        it("should detect Pebble watch", () => {
            const ua = "Mozilla/5.0 (Linux; Android 6.0.1) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/55.0.2883.91 Mobile Safari/537.36 PebbleApp/4.4.2";
            const result = detectDevice(ua, false, false);

            expect(result.device).toBe("wearable");
        });
    });

    describe("xR/VR devices", () => {
        it("should detect Meta Quest 3", () => {
            const ua = "Mozilla/5.0 (X11; Linux x86_64; Quest 3) AppleWebKit/537.36 (KHTML, like Gecko) OculusBrowser/33.0.0.2.82 SamsungBrowser/4.0 Chrome/119.0.0.0 VR Safari/537.36";
            const result = detectDevice(ua, false, false);

            expect(result.device).toBe("xr");
        });

        it("should detect Oculus Quest", () => {
            const ua = "Mozilla/5.0 (Linux; Android 10; Quest 2) AppleWebKit/537.36 (KHTML, like Gecko) OculusBrowser/28.0.0.2.193 SamsungBrowser/4.0 Chrome/112.0.5615.213 VR Safari/537.36";
            const result = detectDevice(ua, false, false);

            expect(result.device).toBe("xr");
        });

        it("should detect Google Glass", () => {
            const ua = "Mozilla/5.0 (Linux; U; Android 4.4.2; en-us; Glass 1 Build/KOT49H) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/33.0.0.0 Mobile Safari/537.36";
            const result = detectDevice(ua, false, false);

            expect(result.device).toBe("xr");
        });
    });

    describe("embedded devices", () => {
        it("should detect Tesla vehicle browser", () => {
            const ua = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) QtWebEngine/5.12.8 Chrome/69.0.3497.128 Safari/537.36 Tesla/2023.26.5";
            const result = detectDevice(ua, false, false);

            expect(result.device).toBe("embedded");
        });

        it("should detect HomePod", () => {
            const ua = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) HomePod/18.0 Model/AudioAccessory5,1";
            const result = detectDevice(ua, false, false);

            expect(result.device).toBe("embedded");
        });

        it("should detect Windows IoT", () => {
            const ua = "Mozilla/5.0 (Windows IoT 10.0; ARM; Lumia 950) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36";
            const result = detectDevice(ua, false, false);

            expect(result.device).toBe("embedded");
        });
    });
});
