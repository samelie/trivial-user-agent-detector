/**
 * Client Hints API detection
 * Modern alternative to user-agent string parsing
 */

import type { ClientHintsData, ClientHintsResult, NavigatorUAData } from "./types.ts";

/**
 * High entropy hints to request from the browser
 */
const HIGH_ENTROPY_HINTS = [
    "architecture",
    "bitness",
    "brands",
    "fullVersionList",
    "mobile",
    "model",
    "platform",
    "platformVersion",
] as const;

/**
 * Checks if Client Hints API is supported
 */
export const isClientHintsSupported = (): boolean => {
    if (typeof navigator === "undefined") {
        return false;
    }

    const nav = navigator as { userAgentData?: NavigatorUAData };
    return nav.userAgentData !== undefined;
};

/**
 * Gets basic (low entropy) client hints synchronously
 */
export const getBasicClientHints = (): ClientHintsData | null => {
    if (!isClientHintsSupported()) {
        return null;
    }

    const nav = navigator as { userAgentData?: NavigatorUAData };
    const uaData = nav.userAgentData;

    if (!uaData) {
        return null;
    }

    return {
        brands: uaData.brands,
        mobile: uaData.mobile,
        platform: uaData.platform,
    };
};

/**
 * Gets high entropy client hints asynchronously
 * Requires user permission for some values
 */
export const getHighEntropyClientHints = async (): Promise<ClientHintsData | null> => {
    if (!isClientHintsSupported()) {
        return null;
    }

    const nav = navigator as { userAgentData?: NavigatorUAData };
    const uaData = nav.userAgentData;

    if (!uaData || typeof uaData.getHighEntropyValues !== "function") {
        return null;
    }

    try {
        const hints = await uaData.getHighEntropyValues(HIGH_ENTROPY_HINTS);
        return hints;
    } catch {
    // Permission denied or not supported
        return getBasicClientHints();
    }
};

/**
 * Pure function to create client hints result
 */
export const createClientHintsResult = (
    supported: boolean,
    data: ClientHintsData | null,
): ClientHintsResult => {
    return {
        supported,
        data,
    } as const;
};

/**
 * Detects client hints synchronously (basic info only)
 */
export const detectClientHints = (): ClientHintsResult => {
    const supported = isClientHintsSupported();
    const data = supported ? getBasicClientHints() : null;

    return createClientHintsResult(supported, data);
};

/**
 * Detects client hints asynchronously (with high entropy values)
 */
export const detectClientHintsAsync = async (): Promise<ClientHintsResult> => {
    const supported = isClientHintsSupported();
    const data = supported ? await getHighEntropyClientHints() : null;

    return createClientHintsResult(supported, data);
};
