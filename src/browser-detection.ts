/**
 * Browser detection utilities
 */

import type { BrowserDetectionResult, BrowserName, BrowserVersion, IEDetectionResult, IEVersion } from "./types.ts";

const MSIE_RE = /MSIE (\d[\d.]*)/;
const TRIDENT_RE = /Trident\/.*rv:(\d[\d.]*)/;
const CHROME_VERSION_RE = /\bChrome\/(\d+)/i;
const FIREFOX_VERSION_RE = /\bFirefox\/(\d+)/i;
const SAFARI_VERSION_RE = /\bVersion\/(\d+)/i;
const SAFARI_RE = /Safari/i;
const EDG_VERSION_RE = /\bEdg\/(\d+)/i;
const EDGE_VERSION_RE = /\bEdge\/(\d+)/i;
const OPR_VERSION_RE = /\bOPR\/(\d+)/i;
const OPERA_VERSION_RE = /\bOpera[\s/](\d+)/i;
const EDGE_DETECT_RE = /\b(?:Edg|Edge)\//i;
const OPERA_DETECT_RE = /\b(?:OPR|Opera)\//i;
const SAFARI_DETECT_RE = /^(?:(?!chrome).)*safari/i;

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
        const match = MSIE_RE.exec(userAgent);

        if (match && match[1] !== undefined) {
            const parsed = Number.parseFloat(match[1]);
            if (!Number.isNaN(parsed)) {
                version = parsed;
            }
        }
    } else if (appName === "Netscape") {
        const match = TRIDENT_RE.exec(userAgent);

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
 * Extracts Chrome version from user agent
 */
const extractChromeVersion = (userAgent: string): BrowserVersion => {
    const match = CHROME_VERSION_RE.exec(userAgent);
    if (match && match[1] !== undefined) {
        const version = Number.parseInt(match[1], 10);
        return Number.isNaN(version) ? false : version;
    }
    return false;
};

/**
 * Extracts Firefox version from user agent
 */
const extractFirefoxVersion = (userAgent: string): BrowserVersion => {
    const match = FIREFOX_VERSION_RE.exec(userAgent);
    if (match && match[1] !== undefined) {
        const version = Number.parseInt(match[1], 10);
        return Number.isNaN(version) ? false : version;
    }
    return false;
};

/**
 * Extracts Safari version from user agent
 */
const extractSafariVersion = (userAgent: string): BrowserVersion => {
    const match = SAFARI_VERSION_RE.exec(userAgent);
    if (match && match[1] !== undefined && SAFARI_RE.test(userAgent)) {
        const version = Number.parseInt(match[1], 10);
        return Number.isNaN(version) ? false : version;
    }
    return false;
};

/**
 * Extracts Edge version from user agent (both Legacy and Chromium)
 */
const extractEdgeVersion = (userAgent: string): BrowserVersion => {
    // Chromium Edge: Edg/119.0.0.0
    let match = EDG_VERSION_RE.exec(userAgent);
    if (match && match[1] !== undefined) {
        const version = Number.parseInt(match[1], 10);
        return Number.isNaN(version) ? false : version;
    }

    // Legacy Edge: Edge/18.17763
    match = EDGE_VERSION_RE.exec(userAgent);
    if (match && match[1] !== undefined) {
        const version = Number.parseInt(match[1], 10);
        return Number.isNaN(version) ? false : version;
    }

    return false;
};

/**
 * Extracts Opera version from user agent
 */
const extractOperaVersion = (userAgent: string): BrowserVersion => {
    // Modern Opera: OPR/105.0.0.0
    let match = OPR_VERSION_RE.exec(userAgent);
    if (match && match[1] !== undefined) {
        const version = Number.parseInt(match[1], 10);
        return Number.isNaN(version) ? false : version;
    }

    // Old Opera: Opera/9.80 or Opera 12
    match = OPERA_VERSION_RE.exec(userAgent);
    if (match && match[1] !== undefined) {
        const version = Number.parseInt(match[1], 10);
        return Number.isNaN(version) ? false : version;
    }

    return false;
};

/**
 * Detects if browser is Chrome
 */
const detectChrome = (chrome: unknown, vendor?: string): boolean => {
    return chrome !== null && chrome !== undefined && vendor === "Google Inc.";
};

/**
 * Determines browser name from detection flags
 */
const determineBrowserName = (
    isChrome: boolean,
    isFirefox: boolean,
    isSafari: boolean,
    isEdge: boolean,
    isOpera: boolean,
): BrowserName => {
    if (isChrome) return "Chrome";
    if (isFirefox) return "Firefox";
    if (isSafari) return "Safari";
    if (isEdge) return "Edge";
    if (isOpera) return "Opera";
    return "unknown";
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
    const isEdge = EDGE_DETECT_RE.test(userAgent);
    const isOpera = OPERA_DETECT_RE.test(userAgent);
    const isChrome = detectChrome(chrome, vendor) && !isEdge && !isOpera;
    const isSafari = SAFARI_DETECT_RE.test(userAgent) && !isEdge && !isOpera;
    const webp = (isChrome || isEdge || isOpera) && !isSafari;

    // Determine browser name
    const browserName = determineBrowserName(isChrome, isFirefox, isSafari, isEdge, isOpera);

    // Extract versions
    const chromeVersion = isChrome ? extractChromeVersion(userAgent) : false;
    const firefoxVersion = isFirefox ? extractFirefoxVersion(userAgent) : false;
    const safariVersion = isSafari ? extractSafariVersion(userAgent) : false;
    const edgeVersion = isEdge ? extractEdgeVersion(userAgent) : false;
    const operaVersion = isOpera ? extractOperaVersion(userAgent) : false;

    return {
        isFirefox,
        isChrome,
        isSafari,
        isEdge,
        isOpera,
        webp,
        browserName,
        chromeVersion,
        firefoxVersion,
        safariVersion,
        edgeVersion,
        operaVersion,
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

/**
 * Browser version comparison helpers
 */

/**
 * Checks if browser version is greater than specified version
 */
export const isBrowserVersionGreaterThan = (
    currentVersion: BrowserVersion,
    compareVersion: number,
): boolean => {
    return typeof currentVersion === "number" && currentVersion > compareVersion;
};

/**
 * Checks if browser version is greater than or equal to specified version
 */
export const isBrowserVersionGreaterThanOrEqual = (
    currentVersion: BrowserVersion,
    compareVersion: number,
): boolean => {
    return typeof currentVersion === "number" && currentVersion >= compareVersion;
};

/**
 * Checks if browser version is less than specified version
 */
export const isBrowserVersionLessThan = (
    currentVersion: BrowserVersion,
    compareVersion: number,
): boolean => {
    return typeof currentVersion === "number" && currentVersion < compareVersion;
};

/**
 * Checks if browser version is less than or equal to specified version
 */
export const isBrowserVersionLessThanOrEqual = (
    currentVersion: BrowserVersion,
    compareVersion: number,
): boolean => {
    return typeof currentVersion === "number" && currentVersion <= compareVersion;
};

/**
 * Checks if browser version is equal to specified version
 */
export const isBrowserVersionEqual = (
    currentVersion: BrowserVersion,
    compareVersion: number,
): boolean => {
    return currentVersion === compareVersion;
};

/**
 * Checks if browser version is in a range (inclusive)
 */
export const isBrowserVersionInRange = (
    currentVersion: BrowserVersion,
    minVersion: number,
    maxVersion: number,
): boolean => {
    return (
        typeof currentVersion === "number" &&
        currentVersion >= minVersion &&
        currentVersion <= maxVersion
    );
};
