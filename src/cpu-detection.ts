/**
 * CPU architecture detection utilities
 */

import type { CPUArchitecture, CPUDetectionResult } from "./types.ts";

/**
 * Detects AMD64/x86_64 architecture
 */
const detectAMD64 = (userAgent: string): boolean => {
    return /\b(amd64|x64|x86[-_]?64|wow64|win64)\b/i.test(userAgent);
};

/**
 * Detects IA32/x86 architecture
 */
const detectIA32 = (userAgent: string): boolean => {
    return /\b(ia32|i[3-6]86|x86|win32)\b/i.test(userAgent);
};

/**
 * Detects ARM64 architecture
 */
const detectARM64 = (userAgent: string): boolean => {
    return /\b(aarch64|armv?[89]e?l?|arm_?64)\b/i.test(userAgent);
};

/**
 * Detects ARMHF (ARM Hard Float) architecture
 */
const detectARMHF = (userAgent: string): boolean => {
    return /\barmv[67](?:ht?n?[fl]p?|[hl])\b/i.test(userAgent);
};

/**
 * Detects ARM architecture (general)
 */
const detectARM = (userAgent: string): boolean => {
    return /\barm\b/i.test(userAgent);
};

/**
 * Detects SPARC architecture
 */
const detectSPARC = (userAgent: string): boolean => {
    return /\b(?:sparc|sun4u|sunos)\b/i.test(userAgent);
};

/**
 * Determines CPU architecture from user agent and platform
 */
const determineArchitecture = (
    userAgent: string,
    platform: string,
): CPUArchitecture => {
    const combined = `${userAgent} ${platform}`.toLowerCase();

    // Order matters: Check most specific first
    if (detectAMD64(combined)) return "amd64";
    if (detectARM64(combined)) return "arm64";
    if (detectARMHF(combined)) return "armhf";
    if (detectARM(combined)) return "arm";
    if (detectIA32(combined)) return "ia32";
    if (detectSPARC(combined)) return "sparc";

    return "unknown";
};

/**
 * Pure function to detect CPU architecture
 */
export const detectCPU = (
    userAgent: string,
    platform: string,
): CPUDetectionResult => {
    const architecture = determineArchitecture(userAgent, platform);

    return {
        architecture,
    } as const;
};

/**
 * Factory function to detect CPU from browser environment
 */
export const detectCPUFromEnvironment = (): CPUDetectionResult => {
    if (typeof navigator === "undefined") {
        return { architecture: "unknown" };
    }

    return detectCPU(navigator.userAgent, navigator.platform);
};
