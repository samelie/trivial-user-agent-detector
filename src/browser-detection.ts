/**
 * Browser detection utilities
 */

import type { BrowserDetectionResult, IEDetectionResult, IEVersion } from "./types.ts";

/**
 * Detects Internet Explorer version
 * Returns -1 if not IE
 */
const detectIEVersion = (
    userAgent: string,
    appName: string,
): IEVersion => {
    let version: IEVersion = -1;

    if (appName === "Microsoft Internet Explorer") {
        const msieRegex = /MSIE (\d[\d.]*)/;
        const match = msieRegex.exec(userAgent);

        if (match && match[1] !== undefined) {
            const parsed = Number.parseFloat(match[1]);
            if (!Number.isNaN(parsed)) {
                version = parsed;
            }
        }
    } else if (appName === "Netscape") {
        const tridentRegex = /Trident\/.*rv:(\d[\d.]*)/;
        const match = tridentRegex.exec(userAgent);

        if (match && match[1] !== undefined) {
            const parsed = Number.parseFloat(match[1]);
            if (!Number.isNaN(parsed)) {
                version = parsed;
            }
        }
    }

    return version;
};

/**
 * Creates IE detection result from version number
 */
const createIEDetectionResult = (version: IEVersion): IEDetectionResult => {
    const isIE = version > -1;

    return {
        IEVersion: version,
        isIE,
        isIE11: version === 11,
        isIE11Down: version <= 11 && isIE,
        isIE11Up: version >= 11 && isIE,
        isIE10: version === 10,
        isIE10Down: version <= 10 && isIE,
        isIE10Up: version >= 10 && isIE,
        isIE9: version === 9,
        isIE9Down: version <= 9 && isIE,
        isIE9Up: version >= 9 && isIE,
        isIE8: version === 8,
        isIE8Down: version <= 8 && isIE,
        isIE8Up: version >= 8 && isIE,
    } as const;
};

/**
 * Detects if browser is Chrome
 */
const detectChrome = (chrome: unknown, vendor?: string): boolean => {
    return chrome !== null && chrome !== undefined && vendor === "Google Inc.";
};

/**
 * Pure function to detect all browser-related information
 */
export const detectBrowser = (
    userAgent: string,
    chrome: unknown,
    vendor?: string,
): BrowserDetectionResult => {
    const isFirefox = userAgent.toLowerCase().includes("firefox");
    const isChrome = detectChrome(chrome, vendor);
    const isSafari = /^(?:(?!chrome).)*safari/i.test(userAgent);
    const webp = isChrome && !isSafari;

    return {
        isFirefox,
        isChrome,
        isSafari,
        webp,
    } as const;
};

/**
 * Pure function to detect IE information
 */
export const detectIE = (
    userAgent: string,
    appName: string,
): IEDetectionResult => {
    const version = detectIEVersion(userAgent, appName);
    return createIEDetectionResult(version);
};

/**
 * Factory function to detect IE from browser environment
 */
export const detectIEFromEnvironment = (): IEDetectionResult => {
    if (typeof navigator === "undefined") {
        return createIEDetectionResult(-1);
    }

    return detectIE(navigator.userAgent, navigator.appName);
};
