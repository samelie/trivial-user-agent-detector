/**
 * iOS detection utilities
 */

import type { IOSDetectionResult, IOSVersion } from "./types.ts";

const IDEVICE_RE = /iP(hone|od|ad)/;
const IOS_VERSION_RE = /OS (\d+)_\d+_?\d*/;
const IPAD_RE = /\(iPad[;)]/i;
const IPHONE_RE = /\(iPhone[;)]/i;
const IPOD_RE = /\(iPod[;) ]/i;

/**
 * Safely extracts iOS version from user agent string
 */
const extractIOSVersion = (
    userAgent: string,
    platform: string,
): IOSVersion => {
    if (!IDEVICE_RE.test(platform)) {
        return false;
    }

    const versionMatch = IOS_VERSION_RE.exec(userAgent);
    if (!versionMatch || versionMatch[1] === undefined) {
        return false;
    }

    return Number.parseInt(versionMatch[1], 10);
};

const IOS_VERSION_PATTERN_CACHE = new Map<number, RegExp>();

/**
 * Detects iOS version by pattern
 */
const detectIOSVersionPattern = (
    userAgent: string,
    version: number,
): boolean => {
    let pattern = IOS_VERSION_PATTERN_CACHE.get(version);
    if (!pattern) {
        pattern = new RegExp(`OS ${version}(_\\d)+ like Mac OS X`, "i");
        IOS_VERSION_PATTERN_CACHE.set(version, pattern);
    }
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
    const isIpad = IPAD_RE.test(userAgent);
    const isIphone = IPHONE_RE.test(userAgent);
    const isIpod = IPOD_RE.test(userAgent);
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
