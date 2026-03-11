/**
 * Android detection utilities
 */

import type { AndroidDetectionResult } from "./types.ts";

const WEBKIT_VERSION_RE = /AppleWebKit\/([\d.]+)/;
const ANDROID_RE = /Android/i;

/**
 * Extracts Android version from user agent string
 */
const extractAndroidVersion = (userAgent: string): number | null => {
    const androidIndex = userAgent.indexOf("Android");
    if (androidIndex === -1) {
        return null;
    }

    const versionString = userAgent.slice(androidIndex + 8);
    const version = Number.parseFloat(versionString);

    return Number.isNaN(version) ? null : version;
};

/**
 * Extracts AppleWebKit version from user agent string
 */
const extractWebKitVersion = (userAgent: string): number | null => {
    const match = WEBKIT_VERSION_RE.exec(userAgent);

    if (!match || match[1] === undefined) {
        return null;
    }

    const version = Number.parseFloat(match[1]);
    return Number.isNaN(version) ? null : version;
};

/**
 * Detects if browser is Android stock browser (pre-Chrome)
 */
const detectAndroidStock = (
    userAgent: string,
    isAndroid: boolean,
): boolean => {
    if (!isAndroid) {
        return false;
    }

    const webKitVersion = extractWebKitVersion(userAgent);
    return webKitVersion !== null && webKitVersion < 537;
};

/**
 * Pure function to detect all Android-related information
 */
export const detectAndroid = (userAgent: string): AndroidDetectionResult => {
    const isAndroid = ANDROID_RE.test(userAgent);

    const androidVersion = extractAndroidVersion(userAgent);
    const isAndroidOld = isAndroid && androidVersion !== null && androidVersion < 4;

    const isAndroidStock = detectAndroidStock(userAgent, isAndroid);

    return {
        isAndroid,
        isAndroidOld,
        isAndroidStock,
    } as const;
};
