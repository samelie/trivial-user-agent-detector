/**
 * Device type detection utilities
 */

import type { DeviceDetectionResult, DeviceType } from "./types.ts";

/**
 * Tablet detection patterns
 */
const TABLET_PATTERNS =
    /ipad|android 3|sch-i800|playbook|tablet|kindle|gt-p1000|sgh-t849|shw-m180s|a510|a511|a100|dell streak|silk|sm-[tx]\d{3}/i;

/**
 * Mobile device detection patterns
 */
const MOBILE_PATTERNS =
    /iphone|ipod|android|blackberry|opera mini|opera mobi|skyfire|maemo|windows phone|palm|iemobile|symbian|fennec/i;

/**
 * Smart TV detection patterns
 */
const SMARTTV_PATTERNS =
    /smart.?tv|googletv|apple.?tv|hbbtv|pov_tv|netcast|nettv|roku|dlnadoc|philips|panasonic|lg.*smart|webos|crkey|chromecast/i;

/**
 * Game console detection patterns
 */
const CONSOLE_PATTERNS =
    /playstation|xbox|nintendo|ouya|shield.*(gaming|portable)|retroid/i;

/**
 * Wearable device detection patterns
 */
const WEARABLE_PATTERNS =
    /watch|wearable|pebble|gear.?live|glass|tizen.*samsung|sm-r\d{3}/i;

/**
 * XR/VR device detection patterns
 */
const XR_PATTERNS =
    /vr|quest|oculus|pico|glass|mobile.?vr/i;

/**
 * Embedded device detection patterns
 */
const EMBEDDED_PATTERNS =
    /tesla|vehicle|car.?browser|homepod|echo|alexa|windows.?iot|embedded/i;

/**
 * Pure function to detect device type
 */
const determineDeviceType = (
    isMobileOS: boolean,
    userAgentLower: string,
): DeviceType => {
    // Check special device types first
    if (SMARTTV_PATTERNS.test(userAgentLower)) return "smarttv";
    if (CONSOLE_PATTERNS.test(userAgentLower)) return "console";
    if (XR_PATTERNS.test(userAgentLower)) return "xr";
    if (WEARABLE_PATTERNS.test(userAgentLower)) return "wearable";
    if (EMBEDDED_PATTERNS.test(userAgentLower)) return "embedded";

    // Check mobile/tablet/desktop
    // Tablets - check if it's a known mobile OS or matches tablet patterns
    if (isMobileOS && TABLET_PATTERNS.test(userAgentLower)) return "tablet";

    // Mobile - check mobile patterns regardless of OS flags (for Windows Phone, BlackBerry, etc.)
    if (MOBILE_PATTERNS.test(userAgentLower)) return "mobile";

    return "desktop";
};

/**
 * Pure function to detect all device-related information
 */
export const detectDevice = (
    userAgent: string,
    isAndroid: boolean,
    isIOS: boolean,
): DeviceDetectionResult => {
    const isMobileOS = isAndroid || isIOS;
    const userAgentLower = userAgent.toLowerCase();

    const device = determineDeviceType(isMobileOS, userAgentLower);

    // Determine boolean helpers based on device type
    const isTablet = device === "tablet";
    const isMobile = device === "mobile";
    const isDesktop = device === "desktop";

    return {
        isTablet,
        isMobile,
        isDesktop,
        device,
    } as const;
};
