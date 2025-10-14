/**
 * Browser capability detection utilities
 */

import type {
    BrowserDocument,
    CapabilityDetectionResult,
    DOMFeatureDetectionResult,
    HiddenProperty,
    HTMLElementWithFullscreen,
    PixelRatioResult,
    TransitionEndEvent,
    VisibilityChangeEvent,
} from "./types.ts";

/**
 * Detects transition end event name
 */
const detectTransitionEnd = (): TransitionEndEvent => {
    if (typeof document === "undefined") {
        return undefined;
    }

    const el = document.createElement("fakeelement");
    const transitions = {
        transition: "transitionend",
        OTransition: "oTransitionEnd",
        MozTransition: "transitionend",
        WebkitTransition: "webkitTransitionEnd",
    } as const;

    type TransitionKey = keyof typeof transitions;

    for (const key of Object.keys(transitions) as TransitionKey[]) {
        const style = el.style as unknown as Record<string, unknown>;
        if (style[key] !== undefined) {
            return transitions[key];
        }
    }

    return undefined;
};

/**
 * Detects visibility change event name and hidden property
 */
const detectVisibility = (
    doc: BrowserDocument,
): Pick<DOMFeatureDetectionResult, "visibilityChangeEventName" | "hiddenPropertyName"> => {
    if (typeof doc.hidden !== "undefined") {
        return {
            hiddenPropertyName: "hidden",
            visibilityChangeEventName: "visibilitychange",
        };
    }

    if (typeof doc.mozHidden !== "undefined") {
        return {
            hiddenPropertyName: "mozHidden",
            visibilityChangeEventName: "mozvisibilitychange",
        };
    }

    if (typeof doc.msHidden !== "undefined") {
        return {
            hiddenPropertyName: "msHidden",
            visibilityChangeEventName: "msvisibilitychange",
        };
    }

    if (typeof doc.webkitHidden !== "undefined") {
        return {
            hiddenPropertyName: "webkitHidden",
            visibilityChangeEventName: "webkitvisibilitychange",
        };
    }

    return {
        hiddenPropertyName: undefined,
        visibilityChangeEventName: undefined,
    };
};

/**
 * Detects fullscreen API support
 */
const detectFullscreen = (element: HTMLElementWithFullscreen): boolean => {
    return !!(
        element.requestFullScreen ||
        element.webkitRequestFullScreen ||
        element.mozRequestFullScreen ||
        element.msRequestFullscreen
    );
};

/**
 * Detects WebGL support
 */
const detectWebGL = (): boolean => {
    if (typeof document === "undefined" || typeof window === "undefined") {
        return false;
    }

    if (!window.WebGLRenderingContext) {
        return false;
    }

    try {
        const canvas = document.createElement("canvas");
        const context =
            canvas.getContext("webgl") ?? canvas.getContext("experimental-webgl");
        return context !== null;
    } catch {
        return false;
    }
};

/**
 * Pure function to detect capabilities
 */
export const detectCapabilities = (
    hasHistory: boolean,
    isDesktop: boolean,
    hasTouch: boolean,
    hasFullscreen: boolean,
    hasCanvas: boolean,
    hasWebgl: boolean,
): CapabilityDetectionResult => {
    return {
        hasHistory,
        hasMouseMove: isDesktop,
        hasTouch,
        hasFullscreen,
        hasCanvas,
        hasWebgl,
    } as const;
};

/**
 * Factory function to detect capabilities from browser environment
 */
export const detectCapabilitiesFromEnvironment = (
    isDesktop: boolean,
): CapabilityDetectionResult => {
    if (typeof window === "undefined" || typeof document === "undefined") {
        return {
            hasHistory: false,
            hasMouseMove: false,
            hasTouch: false,
            hasFullscreen: false,
            hasCanvas: false,
            hasWebgl: false,
        };
    }

    const hasHistory = !!(window.history && window.history.pushState);
    const hasTouch =
        "ontouchstart" in window || "onmsgesturechange" in window;
    const hasFullscreen = detectFullscreen(
        document.body as HTMLElementWithFullscreen,
    );
    const hasCanvas = !!window.CanvasRenderingContext2D;
    const hasWebgl = detectWebGL();

    return detectCapabilities(
        hasHistory,
        isDesktop,
        hasTouch,
        hasFullscreen,
        hasCanvas,
        hasWebgl,
    );
};

/**
 * Pure function to detect DOM features
 */
export const detectDOMFeatures = (
    transitionEnd: TransitionEndEvent,
    visibilityChangeEventName: VisibilityChangeEvent,
    hiddenPropertyName: HiddenProperty,
): DOMFeatureDetectionResult => {
    return {
        transitionEnd,
        visibilityChangeEventName,
        hiddenPropertyName,
    } as const;
};

/**
 * Factory function to detect DOM features from browser environment
 */
export const detectDOMFeaturesFromEnvironment = (): DOMFeatureDetectionResult => {
    if (typeof document === "undefined") {
        return {
            transitionEnd: undefined,
            visibilityChangeEventName: undefined,
            hiddenPropertyName: undefined,
        };
    }

    const transitionEnd = detectTransitionEnd();
    const visibility = detectVisibility(document as unknown as BrowserDocument);

    return detectDOMFeatures(
        transitionEnd,
        visibility.visibilityChangeEventName,
        visibility.hiddenPropertyName,
    );
};

/**
 * Pure function to detect pixel ratio information
 */
export const detectPixelRatio = (pixelRatio: number): PixelRatioResult => {
    return {
        pixelRatio,
        isRetina: pixelRatio > 1,
    } as const;
};

/**
 * Factory function to detect pixel ratio from browser environment
 */
export const detectPixelRatioFromEnvironment = (): PixelRatioResult => {
    const pixelRatio =
        typeof window !== "undefined" && window.devicePixelRatio
            ? window.devicePixelRatio
            : 1;

    return detectPixelRatio(pixelRatio);
};
