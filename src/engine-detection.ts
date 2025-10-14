/**
 * Rendering engine detection utilities
 */

import type { EngineDetectionResult, RenderingEngine } from "./types.ts";

/**
 * Detects Blink engine (Chrome 28+, Opera 15+, Edge 79+)
 */
const detectBlink = (userAgent: string): boolean => {
    // Blink is WebKit 537.36+ with Chrome version
    // But must exclude older EdgeHTML
    const hasWebKit = /webkit\/537\.36/i.test(userAgent);
    const hasChrome = /chrome\//i.test(userAgent);
    const isEdgeHTML = /edge\//i.test(userAgent);

    return hasWebKit && hasChrome && !isEdgeHTML;
};

/**
 * Detects WebKit engine (Safari, older Chrome/Opera)
 */
const detectWebKit = (userAgent: string): boolean => {
    return /webkit/i.test(userAgent) && !/chrome/i.test(userAgent);
};

/**
 * Detects Gecko engine (Firefox)
 */
const detectGecko = (userAgent: string): boolean => {
    return /gecko/i.test(userAgent) && !/like gecko/i.test(userAgent);
};

/**
 * Detects Trident engine (IE)
 */
const detectTrident = (userAgent: string): boolean => {
    return /trident/i.test(userAgent);
};

/**
 * Detects EdgeHTML engine (Legacy Edge 12-18)
 * Legacy Edge uses "Edge/" while Chromium Edge uses "Edg/"
 */
const detectEdgeHTML = (userAgent: string): boolean => {
    // Match "Edge/" with word boundary to ensure 4 letters before slash
    // This matches " Edge/18" but not " Edg/119" (Chromium Edge)
    const hasLegacyEdge = /\bedge\/\d+/i.test(userAgent);
    const hasChromiumEdge = /\bedg\/\d+/i.test(userAgent);

    // Must have Edge/ pattern but not the shortened Edg/ variant
    return hasLegacyEdge && !hasChromiumEdge;
};

/**
 * Detects Presto engine (Opera 12 and older)
 */
const detectPresto = (userAgent: string): boolean => {
    return /presto/i.test(userAgent);
};

/**
 * Determines rendering engine from user agent
 */
const determineEngine = (userAgent: string): RenderingEngine => {
    // Order matters: Check most specific first
    if (detectPresto(userAgent)) return "Presto";
    if (detectEdgeHTML(userAgent)) return "EdgeHTML";
    if (detectBlink(userAgent)) return "Blink";
    if (detectTrident(userAgent)) return "Trident";
    if (detectGecko(userAgent)) return "Gecko";
    if (detectWebKit(userAgent)) return "WebKit";

    return "unknown";
};

/**
 * Pure function to detect rendering engine
 */
export const detectEngine = (userAgent: string): EngineDetectionResult => {
    const engine = determineEngine(userAgent);

    return {
        engine,
    } as const;
};

/**
 * Factory function to detect engine from browser environment
 */
export const detectEngineFromEnvironment = (): EngineDetectionResult => {
    if (typeof navigator === "undefined") {
        return { engine: "unknown" };
    }

    return detectEngine(navigator.userAgent);
};
