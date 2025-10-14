/**
 * iOS detection utilities
 */

import type { IOSDetectionResult, IOSVersion } from "./types.ts";

/**
 * Safely extracts iOS version from user agent string
 */
const extractIOSVersion = (
    userAgent: string,
    platform: string,
): IOSVersion => {
    if (!/iP(hone|od|ad)/.test(platform)) {
        return false;
    }

    const versionMatch = userAgent.match(/OS (\d+)_\d+_?\d*/);
    if (!versionMatch || versionMatch[1] === undefined) {
        return false;
    }

    return Number.parseInt(versionMatch[1], 10);
};

/**
 * Detects iOS version by pattern
 */
const detectIOSVersionPattern = (
    userAgent: string,
    version: number,
): boolean => {
    const pattern = new RegExp(`OS ${version}(_\\d)+ like Mac OS X`, "i");
    return pattern.test(userAgent);
};

/**
 * Pure function to detect all iOS-related information
 */
export const detectIOS = (
    userAgent: string,
    platform: string,
): IOSDetectionResult => {
    // Check for device identifiers at the start of UA (after "Mozilla/5.0 (")
    // This avoids matching "iPhone" in "CPU iPhone OS" which is the OS name, not device
    const isIpad = /\(iPad[;)]/i.test(userAgent);
    const isIphone = /\(iPhone[;)]/i.test(userAgent);
    const isIpod = /\(iPod[;) ]/i.test(userAgent);
    const isIOS = isIpad || isIphone || isIpod;

    const isIOS5 = detectIOSVersionPattern(userAgent, 5);
    const isIOS6 = detectIOSVersionPattern(userAgent, 6);
    const isIOS7 = detectIOSVersionPattern(userAgent, 7);
    const isIOS8 = detectIOSVersionPattern(userAgent, 8);
    const isIOS9 = detectIOSVersionPattern(userAgent, 9);

    const IOSVersion = extractIOSVersion(userAgent, platform);

    return {
        isIpad,
        isIphone,
        isIpod,
        isIOS,
        isIOS5,
        isIOS6,
        isIOS7,
        isIOS8,
        isIOS9,
        IOSVersion,
    } as const;
};
