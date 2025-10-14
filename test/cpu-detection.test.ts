import { describe, expect, it } from "vitest";
import { detectCPU } from "../src/cpu-detection";

describe("cPU Architecture Detection", () => {
    describe("aMD64 / x86_64 detection", () => {
        it("should detect amd64 from user agent", () => {
            const ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:120.0) Gecko/20100101 Firefox/120.0";
            const result = detectCPU(ua, "Win32");

            expect(result.architecture).toBe("amd64");
        });

        it("should detect x64 from user agent", () => {
            const ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";
            const result = detectCPU(ua, "Win32");

            expect(result.architecture).toBe("amd64");
        });

        it("should detect WOW64", () => {
            const ua = "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36";
            const result = detectCPU(ua, "Win32");

            expect(result.architecture).toBe("amd64");
        });

        it("should detect Win64", () => {
            const ua = "Mozilla/5.0 (Windows NT 10.0; Win64) AppleWebKit/537.36";
            const result = detectCPU(ua, "Win32");

            expect(result.architecture).toBe("amd64");
        });

        it("should detect x86-64 with dash", () => {
            const ua = "Mozilla/5.0 (X11; Linux x86-64) AppleWebKit/537.36";
            const result = detectCPU(ua, "Linux");

            expect(result.architecture).toBe("amd64");
        });

        it("should detect x86_64 with underscore", () => {
            const ua = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36";
            const result = detectCPU(ua, "Linux x86_64");

            expect(result.architecture).toBe("amd64");
        });
    });

    describe("aRM64 detection", () => {
        it("should detect ARM64 from aarch64", () => {
            const ua = "Mozilla/5.0 (Linux; Android 13; Pixel 8) AppleWebKit/537.36";
            const result = detectCPU(ua, "Linux aarch64");

            expect(result.architecture).toBe("arm64");
        });

        it("should detect ARM64 from arm_64", () => {
            const ua = "Mozilla/5.0 (Macintosh; ARM_64 Mac OS X 14_0)";
            const result = detectCPU(ua, "MacIntel");

            expect(result.architecture).toBe("arm64");
        });

        it("should detect ARM64 from armv8", () => {
            const ua = "Mozilla/5.0 (Linux; armv8) AppleWebKit/537.36";
            const result = detectCPU(ua, "Linux armv8l");

            expect(result.architecture).toBe("arm64");
        });

        it("should detect ARM64 from armv9", () => {
            const ua = "Mozilla/5.0 (Linux; armv9) AppleWebKit/537.36";
            const result = detectCPU(ua, "Linux armv9");

            expect(result.architecture).toBe("arm64");
        });

        it("should detect Apple Silicon M1", () => {
            const ua = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36";
            const result = detectCPU(ua, "MacIntel"); // Note: macOS lies about architecture

            // This is a limitation - macOS reports "Intel" even on ARM Macs
            // A real implementation might need additional heuristics
            expect(result.architecture).toBe("unknown");
        });
    });

    describe("aRMHF detection", () => {
        it("should detect ARMv7 hard float", () => {
            const ua = "Mozilla/5.0 (Linux; armv7l) AppleWebKit/537.36";
            const result = detectCPU(ua, "Linux armv7l");

            expect(result.architecture).toBe("armhf");
        });

        it("should detect ARMv6 hard float", () => {
            const ua = "Mozilla/5.0 (Linux; armv6l) AppleWebKit/537.36";
            const result = detectCPU(ua, "Linux armv6l");

            expect(result.architecture).toBe("armhf");
        });

        it("should detect armv7hnl", () => {
            const ua = "Mozilla/5.0 (Linux) AppleWebKit/537.36";
            const result = detectCPU(ua, "Linux armv7hnl");

            expect(result.architecture).toBe("armhf");
        });
    });

    describe("aRM (generic) detection", () => {
        it("should detect generic ARM", () => {
            const ua = "Mozilla/5.0 (Linux; arm) AppleWebKit/537.36";
            const result = detectCPU(ua, "Linux arm");

            expect(result.architecture).toBe("arm");
        });
    });

    describe("iA32 / x86 detection", () => {
        it("should detect i686", () => {
            const ua = "Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.36";
            const result = detectCPU(ua, "Linux i686");

            expect(result.architecture).toBe("ia32");
        });

        it("should detect i586", () => {
            const ua = "Mozilla/5.0 (X11; Linux i586)";
            const result = detectCPU(ua, "Linux i586");

            expect(result.architecture).toBe("ia32");
        });

        it("should detect i386", () => {
            const ua = "Mozilla/5.0 (X11; Linux i386)";
            const result = detectCPU(ua, "Linux i386");

            expect(result.architecture).toBe("ia32");
        });

        it("should detect x86", () => {
            const ua = "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36";
            const result = detectCPU(ua, "Win32");

            expect(result.architecture).toBe("ia32");
        });

        it("should detect ia32", () => {
            const ua = "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; ia32)";
            const result = detectCPU(ua, "Win32");

            expect(result.architecture).toBe("ia32");
        });
    });

    describe("sPARC detection", () => {
        it("should detect SPARC architecture", () => {
            const ua = "Mozilla/5.0 (X11; SunOS sun4u) AppleWebKit/537.36";
            const result = detectCPU(ua, "SunOS");

            expect(result.architecture).toBe("sparc");
        });
    });

    describe("unknown architectures", () => {
        it("should return unknown for unrecognized architecture", () => {
            const ua = "Mozilla/5.0 (Unknown) AppleWebKit/537.36";
            const result = detectCPU(ua, "Unknown");

            expect(result.architecture).toBe("unknown");
        });

        it("should return unknown for empty strings", () => {
            const ua = "";
            const result = detectCPU(ua, "");

            expect(result.architecture).toBe("unknown");
        });

        it("should return unknown for iPhone (no platform indicator)", () => {
            const ua = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15";
            const result = detectCPU(ua, "iPhone");

            expect(result.architecture).toBe("unknown");
        });
    });

    describe("platform combinations", () => {
        it("should prioritize platform over UA string", () => {
            const ua = "Mozilla/5.0 AppleWebKit/537.36";
            const result = detectCPU(ua, "Linux x86_64");

            expect(result.architecture).toBe("amd64");
        });

        it("should combine UA and platform info", () => {
            const ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64)";
            const result = detectCPU(ua, "Win32");

            expect(result.architecture).toBe("amd64");
        });

        it("should work with Android platform", () => {
            const ua = "Mozilla/5.0 (Linux; Android 13)";
            const result = detectCPU(ua, "Linux aarch64");

            expect(result.architecture).toBe("arm64");
        });
    });
});
