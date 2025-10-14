/**
 * Trivial User Agent Detector
 *
 * Type-safe, functional user agent detection library for browsers
 * Detects devices, browsers, capabilities, and features without classes
 *
 * @example
 * ```ts
 * // Main factory function usage (recommended)
 * import { createDetector } from "@adddog/trivial-user-agent-detector";
 *
 * const detector = createDetector();
 *
 * // Get all detection results at once
 * const all = detector.detectAll();
 *
 * // Or use individual methods for what you need
 * const browser = detector.detectBrowser();
 * const device = detector.detectDevice();
 * const capabilities = detector.detectCapabilities();
 * ```
 *
 * @example
 * ```ts
 * // Tree-shakeable imports for specific features
 * import { detectBrowser } from "@adddog/trivial-user-agent-detector/browser-detection";
 * import { detectCapabilities } from "@adddog/trivial-user-agent-detector/capability-detection";
 *
 * const browser = detectBrowser(userAgent, chrome, vendor);
 * const caps = detectCapabilities(document, window, isDesktop);
 * ```
 */

import type {
    AndroidDetectionResult,
    BrowserDetectionResult,
    CapabilityDetectionResult,
    ClientHintsResult,
    CPUDetectionResult,
    DetectorResult,
    DeviceDetectionResult,
    DOMFeatureDetectionResult,
    EngineDetectionResult,
    IEDetectionResult,
    IOSDetectionResult,
    PixelRatioResult,
} from "./types.ts";
import { detectAndroid } from "./android-detection.ts";
import { detectBrowser, detectIE } from "./browser-detection.ts";
import {
    detectCapabilitiesFromEnvironment,
    detectDOMFeaturesFromEnvironment,
    detectPixelRatioFromEnvironment,
} from "./capability-detection.ts";
import { detectClientHintsAsync } from "./client-hints.ts";
import { detectCPUFromEnvironment } from "./cpu-detection.ts";
import { detectDevice } from "./device-detection.ts";
import { detectEngineFromEnvironment } from "./engine-detection.ts";
import { detectIOS } from "./ios-detection.ts";

/**
 * Gets user agent string safely
 */
const getUserAgent = (): string => {
    if (typeof navigator === "undefined") {
        return "";
    }

    return (
        navigator.userAgent ||
        (navigator as { vendor?: string }).vendor ||
        (window as { opera?: string }).opera ||
        ""
    );
};

/**
 * Gets navigator properties safely
 */
const getNavigatorInfo = (): {
    userAgent: string;
    appName: string;
    platform: string;
    vendor: string | undefined;
    chrome: unknown;
} => {
    if (typeof navigator === "undefined" || typeof window === "undefined") {
        return {
            userAgent: "",
            appName: "",
            platform: "",
            vendor: undefined,
            chrome: undefined,
        };
    }

    return {
        userAgent: getUserAgent(),
        appName: navigator.appName,
        platform: navigator.platform,
        vendor: (navigator as { vendor?: string }).vendor,
        chrome: (window as { chrome?: unknown }).chrome,
    };
};

/**
 * Detector instance with methods for accessing different detection features
 */
export interface Detector {
    /**
     * Detect all features at once - returns a complete detection result
     */
    detectAll: () => Readonly<DetectorResult>;

    /**
     * Detect iOS device and version
     */
    detectIOS: () => Readonly<IOSDetectionResult>;

    /**
     * Detect Android device
     */
    detectAndroid: () => Readonly<AndroidDetectionResult>;

    /**
     * Detect device type (mobile, tablet, desktop, etc.)
     */
    detectDevice: () => Readonly<DeviceDetectionResult>;

    /**
     * Detect Internet Explorer version
     */
    detectIE: () => Readonly<IEDetectionResult>;

    /**
     * Detect browser (Chrome, Firefox, Safari)
     */
    detectBrowser: () => Readonly<BrowserDetectionResult>;

    /**
     * Detect browser capabilities (touch, canvas, webgl, etc.)
     */
    detectCapabilities: () => Readonly<CapabilityDetectionResult>;

    /**
     * Detect DOM features (transition events, visibility API)
     */
    detectDOMFeatures: () => Readonly<DOMFeatureDetectionResult>;

    /**
     * Detect pixel ratio and retina display
     */
    detectPixelRatio: () => Readonly<PixelRatioResult>;

    /**
     * Detect rendering engine (Blink, WebKit, Gecko, etc.)
     */
    detectEngine: () => Readonly<EngineDetectionResult>;

    /**
     * Detect CPU architecture
     */
    detectCPU: () => Readonly<CPUDetectionResult>;

    /**
     * Detect client hints (async) - modern user agent API
     */
    detectClientHints: () => Promise<Readonly<ClientHintsResult>>;
}

/**
 * Main detector factory function
 * Creates a detector instance with methods for all detection features
 *
 * @example
 * ```ts
 * const detector = createDetector();
 *
 * // Get everything
 * const all = detector.detectAll();
 *
 * // Or get specific features
 * const browser = detector.detectBrowser();
 * const device = detector.detectDevice();
 * ```
 */
export const createDetector = (): Detector => {
    const nav = getNavigatorInfo();

    // Lazy evaluation - only compute when requested
    let iosResult: IOSDetectionResult | undefined;
    let androidResult: AndroidDetectionResult | undefined;
    let deviceResult: DeviceDetectionResult | undefined;
    let ieResult: IEDetectionResult | undefined;
    let browserResult: BrowserDetectionResult | undefined;
    let capabilitiesResult: CapabilityDetectionResult | undefined;
    let domFeaturesResult: DOMFeatureDetectionResult | undefined;
    let pixelRatioResult: PixelRatioResult | undefined;
    let engineResult: EngineDetectionResult | undefined;
    let cpuResult: CPUDetectionResult | undefined;

    const getIOS = (): IOSDetectionResult => {
        if (!iosResult) {
            iosResult = detectIOS(nav.userAgent, nav.platform);
        }
        return iosResult;
    };

    const getAndroid = (): AndroidDetectionResult => {
        if (!androidResult) {
            androidResult = detectAndroid(nav.userAgent);
        }
        return androidResult;
    };

    const getDevice = (): DeviceDetectionResult => {
        if (!deviceResult) {
            const ios = getIOS();
            const android = getAndroid();
            deviceResult = detectDevice(
                nav.userAgent,
                android.isAndroid,
                ios.isIOS,
            );
        }
        return deviceResult;
    };

    const getIE = (): IEDetectionResult => {
        if (!ieResult) {
            ieResult = detectIE(nav.userAgent, nav.appName);
        }
        return ieResult;
    };

    const getBrowser = (): BrowserDetectionResult => {
        if (!browserResult) {
            browserResult = detectBrowser(
                nav.userAgent,
                nav.chrome,
                nav.vendor,
            );
        }
        return browserResult;
    };

    const getCapabilities = (): CapabilityDetectionResult => {
        if (!capabilitiesResult) {
            const device = getDevice();
            capabilitiesResult = detectCapabilitiesFromEnvironment(
                device.isDesktop,
            );
        }
        return capabilitiesResult;
    };

    const getDOMFeatures = (): DOMFeatureDetectionResult => {
        if (!domFeaturesResult) {
            domFeaturesResult = detectDOMFeaturesFromEnvironment();
        }
        return domFeaturesResult;
    };

    const getPixelRatio = (): PixelRatioResult => {
        if (!pixelRatioResult) {
            pixelRatioResult = detectPixelRatioFromEnvironment();
        }
        return pixelRatioResult;
    };

    const getEngine = (): EngineDetectionResult => {
        if (!engineResult) {
            engineResult = detectEngineFromEnvironment();
        }
        return engineResult;
    };

    const getCPU = (): CPUDetectionResult => {
        if (!cpuResult) {
            cpuResult = detectCPUFromEnvironment();
        }
        return cpuResult;
    };

    return {
        detectAll: () => {
            return Object.freeze({
                ...getIOS(),
                ...getAndroid(),
                ...getDevice(),
                ...getIE(),
                ...getBrowser(),
                ...getCapabilities(),
                ...getDOMFeatures(),
                ...getPixelRatio(),
                ...getEngine(),
                ...getCPU(),
            });
        },

        detectIOS: () => Object.freeze(getIOS()),
        detectAndroid: () => Object.freeze(getAndroid()),
        detectDevice: () => Object.freeze(getDevice()),
        detectIE: () => Object.freeze(getIE()),
        detectBrowser: () => Object.freeze(getBrowser()),
        detectCapabilities: () => Object.freeze(getCapabilities()),
        detectDOMFeatures: () => Object.freeze(getDOMFeatures()),
        detectPixelRatio: () => Object.freeze(getPixelRatio()),
        detectEngine: () => Object.freeze(getEngine()),
        detectCPU: () => Object.freeze(getCPU()),
        detectClientHints: async () => Object.freeze(await detectClientHintsAsync()),
    };
};

// Default export - the factory function
export default createDetector;

// Re-export all types for convenience
export type {
    AndroidDetectionResult,
    BrowserDetectionResult,
    BrowserDocument,
    BrowserNavigator,
    BrowserWindow,
    CapabilityDetectionResult,
    ClientHintsBrand,
    ClientHintsData,
    ClientHintsResult,
    CPUArchitecture,
    CPUDetectionResult,
    DetectorResult,
    DeviceDetectionResult,
    DeviceType,
    DOMFeatureDetectionResult,
    EngineDetectionResult,
    HiddenProperty,
    HTMLElementWithFullscreen,
    IEDetectionResult,
    IEVersion,
    IOSDetectionResult,
    IOSVersion,
    NavigatorUAData,
    PixelRatioResult,
    RenderingEngine,
    TransitionEndEvent,
    VisibilityChangeEvent,
} from "./types.ts";
