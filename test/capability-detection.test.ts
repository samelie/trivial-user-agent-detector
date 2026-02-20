import { describe, expect, it } from "vitest";
import {
    detectCapabilities,
    detectCapabilitiesFromEnvironment,
    detectDOMFeatures,
    detectDOMFeaturesFromEnvironment,
    detectPixelRatio,
    detectPixelRatioFromEnvironment,
} from "../src/capability-detection";

describe("capability Detection", () => {
    describe("detectCapabilities (pure)", () => {
        it("should return all true when all capabilities present", () => {
            const result = detectCapabilities(true, true, true, true, true, true);

            expect(result.hasHistory).toBe(true);
            expect(result.hasMouseMove).toBe(true);
            expect(result.hasTouch).toBe(true);
            expect(result.hasFullscreen).toBe(true);
            expect(result.hasCanvas).toBe(true);
            expect(result.hasWebgl).toBe(true);
        });

        it("should return all false when no capabilities present", () => {
            const result = detectCapabilities(false, false, false, false, false, false);

            expect(result.hasHistory).toBe(false);
            expect(result.hasMouseMove).toBe(false);
            expect(result.hasTouch).toBe(false);
            expect(result.hasFullscreen).toBe(false);
            expect(result.hasCanvas).toBe(false);
            expect(result.hasWebgl).toBe(false);
        });

        it("should map isDesktop to hasMouseMove", () => {
            const desktop = detectCapabilities(false, true, false, false, false, false);
            const mobile = detectCapabilities(false, false, true, false, false, false);

            expect(desktop.hasMouseMove).toBe(true);
            expect(mobile.hasMouseMove).toBe(false);
        });

        it("should handle typical desktop scenario", () => {
            const result = detectCapabilities(true, true, false, true, true, true);

            expect(result.hasHistory).toBe(true);
            expect(result.hasMouseMove).toBe(true);
            expect(result.hasTouch).toBe(false);
            expect(result.hasFullscreen).toBe(true);
            expect(result.hasCanvas).toBe(true);
            expect(result.hasWebgl).toBe(true);
        });

        it("should handle typical mobile scenario", () => {
            const result = detectCapabilities(true, false, true, true, true, true);

            expect(result.hasHistory).toBe(true);
            expect(result.hasMouseMove).toBe(false);
            expect(result.hasTouch).toBe(true);
            expect(result.hasFullscreen).toBe(true);
        });
    });

    describe("detectCapabilitiesFromEnvironment", () => {
        it("should return all false when window is undefined (node env)", () => {
            const result = detectCapabilitiesFromEnvironment(true);

            expect(result.hasHistory).toBe(false);
            expect(result.hasMouseMove).toBe(false);
            expect(result.hasTouch).toBe(false);
            expect(result.hasFullscreen).toBe(false);
            expect(result.hasCanvas).toBe(false);
            expect(result.hasWebgl).toBe(false);
        });

        it("should return all false when window is undefined regardless of isDesktop", () => {
            const result = detectCapabilitiesFromEnvironment(false);

            expect(result.hasHistory).toBe(false);
            expect(result.hasMouseMove).toBe(false);
            expect(result.hasTouch).toBe(false);
        });
    });
});

describe("dOM Feature Detection", () => {
    describe("detectDOMFeatures (pure)", () => {
        it("should return standard visibility props", () => {
            const result = detectDOMFeatures(
                "transitionend",
                "visibilitychange",
                "hidden",
            );

            expect(result.transitionEnd).toBe("transitionend");
            expect(result.visibilityChangeEventName).toBe("visibilitychange");
            expect(result.hiddenPropertyName).toBe("hidden");
        });

        it("should return webkit prefixed props", () => {
            const result = detectDOMFeatures(
                "webkitTransitionEnd",
                "webkitvisibilitychange",
                "webkitHidden",
            );

            expect(result.transitionEnd).toBe("webkitTransitionEnd");
            expect(result.visibilityChangeEventName).toBe("webkitvisibilitychange");
            expect(result.hiddenPropertyName).toBe("webkitHidden");
        });

        it("should return moz prefixed props", () => {
            const result = detectDOMFeatures(
                "transitionend",
                "mozvisibilitychange",
                "mozHidden",
            );

            expect(result.visibilityChangeEventName).toBe("mozvisibilitychange");
            expect(result.hiddenPropertyName).toBe("mozHidden");
        });

        it("should return ms prefixed props", () => {
            const result = detectDOMFeatures(
                "oTransitionEnd",
                "msvisibilitychange",
                "msHidden",
            );

            expect(result.transitionEnd).toBe("oTransitionEnd");
            expect(result.visibilityChangeEventName).toBe("msvisibilitychange");
            expect(result.hiddenPropertyName).toBe("msHidden");
        });

        it("should handle all undefined", () => {
            const result = detectDOMFeatures(undefined, undefined, undefined);

            expect(result.transitionEnd).toBeUndefined();
            expect(result.visibilityChangeEventName).toBeUndefined();
            expect(result.hiddenPropertyName).toBeUndefined();
        });
    });

    describe("detectDOMFeaturesFromEnvironment", () => {
        it("should return all undefined in node env (no document)", () => {
            const result = detectDOMFeaturesFromEnvironment();

            expect(result.transitionEnd).toBeUndefined();
            expect(result.visibilityChangeEventName).toBeUndefined();
            expect(result.hiddenPropertyName).toBeUndefined();
        });
    });
});

describe("pixel Ratio Detection", () => {
    describe("detectPixelRatio (pure)", () => {
        it("should detect retina display (ratio > 1)", () => {
            const result = detectPixelRatio(2);

            expect(result.pixelRatio).toBe(2);
            expect(result.isRetina).toBe(true);
        });

        it("should detect non-retina display (ratio = 1)", () => {
            const result = detectPixelRatio(1);

            expect(result.pixelRatio).toBe(1);
            expect(result.isRetina).toBe(false);
        });

        it("should detect high-DPI display (ratio = 3)", () => {
            const result = detectPixelRatio(3);

            expect(result.pixelRatio).toBe(3);
            expect(result.isRetina).toBe(true);
        });

        it("should handle fractional pixel ratios", () => {
            const result = detectPixelRatio(1.5);

            expect(result.pixelRatio).toBe(1.5);
            expect(result.isRetina).toBe(true);
        });

        it("should handle sub-1 pixel ratio as non-retina", () => {
            const result = detectPixelRatio(0.75);

            expect(result.pixelRatio).toBe(0.75);
            expect(result.isRetina).toBe(false);
        });
    });

    describe("detectPixelRatioFromEnvironment", () => {
        it("should default to ratio 1 in node env (no window)", () => {
            const result = detectPixelRatioFromEnvironment();

            expect(result.pixelRatio).toBe(1);
            expect(result.isRetina).toBe(false);
        });
    });
});
