import { afterEach, describe, expect, it, vi } from "vitest";
import {
    createClientHintsResult,
    detectClientHints,
    detectClientHintsAsync,
    getBasicClientHints,
    getHighEntropyClientHints,
    isClientHintsSupported,
} from "../src/client-hints";

describe("client Hints Detection", () => {
    describe("createClientHintsResult (pure)", () => {
        it("should create supported result with data", () => {
            const data = {
                brands: [{ brand: "Chromium", version: "119" }],
                mobile: false,
                platform: "Windows",
            };
            const result = createClientHintsResult(true, data);

            expect(result.supported).toBe(true);
            expect(result.data).toEqual(data);
        });

        it("should create unsupported result with null data", () => {
            const result = createClientHintsResult(false, null);

            expect(result.supported).toBe(false);
            expect(result.data).toBeNull();
        });

        it("should create supported result with null data", () => {
            const result = createClientHintsResult(true, null);

            expect(result.supported).toBe(true);
            expect(result.data).toBeNull();
        });

        it("should include full brand list", () => {
            const data = {
                brands: [
                    { brand: "Chromium", version: "119" },
                    { brand: "Google Chrome", version: "119" },
                    { brand: "Not?A_Brand", version: "24" },
                ],
                mobile: false,
                platform: "macOS",
            };
            const result = createClientHintsResult(true, data);

            expect(result.data?.brands).toHaveLength(3);
        });

        it("should include mobile flag", () => {
            const data = {
                brands: [{ brand: "Chromium", version: "119" }],
                mobile: true,
                platform: "Android",
            };
            const result = createClientHintsResult(true, data);

            expect(result.data?.mobile).toBe(true);
        });

        it("should include high entropy values", () => {
            const data = {
                brands: [{ brand: "Chromium", version: "119" }],
                mobile: false,
                platform: "Windows",
                architecture: "x86",
                bitness: "64",
                model: "",
                platformVersion: "15.0.0",
                fullVersionList: [
                    { brand: "Chromium", version: "119.0.6045.160" },
                    { brand: "Google Chrome", version: "119.0.6045.160" },
                ],
            };
            const result = createClientHintsResult(true, data);

            expect(result.data?.architecture).toBe("x86");
            expect(result.data?.bitness).toBe("64");
            expect(result.data?.platformVersion).toBe("15.0.0");
            expect(result.data?.fullVersionList).toHaveLength(2);
        });
    });

    describe("isClientHintsSupported", () => {
        it("should return false when navigator is undefined (node env)", () => {
            const result = isClientHintsSupported();

            expect(result).toBe(false);
        });
    });

    describe("getBasicClientHints", () => {
        it("should return null when not supported (node env)", () => {
            const result = getBasicClientHints();

            expect(result).toBeNull();
        });
    });

    describe("getHighEntropyClientHints", () => {
        it("should return null when not supported (node env)", async () => {
            const result = await getHighEntropyClientHints();

            expect(result).toBeNull();
        });
    });

    describe("detectClientHints", () => {
        it("should return unsupported in node env", () => {
            const result = detectClientHints();

            expect(result.supported).toBe(false);
            expect(result.data).toBeNull();
        });
    });

    describe("detectClientHintsAsync", () => {
        it("should return unsupported in node env", async () => {
            const result = await detectClientHintsAsync();

            expect(result.supported).toBe(false);
            expect(result.data).toBeNull();
        });
    });

    describe("with mocked navigator", () => {
        const originalNavigator = globalThis.navigator;

        afterEach(() => {
            Object.defineProperty(globalThis, "navigator", {
                value: originalNavigator,
                writable: true,
                configurable: true,
            });
        });

        it("should detect support when userAgentData exists", () => {
            Object.defineProperty(globalThis, "navigator", {
                value: {
                    userAgentData: {
                        brands: [{ brand: "Chromium", version: "119" }],
                        mobile: false,
                        platform: "Windows",
                    },
                },
                writable: true,
                configurable: true,
            });

            expect(isClientHintsSupported()).toBe(true);
        });

        it("should return basic hints from userAgentData", () => {
            const brands = [
                { brand: "Chromium", version: "119" },
                { brand: "Google Chrome", version: "119" },
            ];
            Object.defineProperty(globalThis, "navigator", {
                value: {
                    userAgentData: {
                        brands,
                        mobile: false,
                        platform: "macOS",
                    },
                },
                writable: true,
                configurable: true,
            });

            const result = getBasicClientHints();

            expect(result).not.toBeNull();
            expect(result?.brands).toEqual(brands);
            expect(result?.mobile).toBe(false);
            expect(result?.platform).toBe("macOS");
        });

        it("should return mobile=true for mobile device", () => {
            Object.defineProperty(globalThis, "navigator", {
                value: {
                    userAgentData: {
                        brands: [{ brand: "Chromium", version: "119" }],
                        mobile: true,
                        platform: "Android",
                    },
                },
                writable: true,
                configurable: true,
            });

            const result = getBasicClientHints();

            expect(result?.mobile).toBe(true);
            expect(result?.platform).toBe("Android");
        });

        it("should detect client hints synchronously", () => {
            Object.defineProperty(globalThis, "navigator", {
                value: {
                    userAgentData: {
                        brands: [{ brand: "Chromium", version: "119" }],
                        mobile: false,
                        platform: "Windows",
                    },
                },
                writable: true,
                configurable: true,
            });

            const result = detectClientHints();

            expect(result.supported).toBe(true);
            expect(result.data).not.toBeNull();
            expect(result.data?.platform).toBe("Windows");
        });

        it("should get high entropy values when available", async () => {
            const highEntropyData = {
                brands: [{ brand: "Chromium", version: "119" }],
                mobile: false,
                platform: "Windows",
                architecture: "x86",
                bitness: "64",
                platformVersion: "15.0.0",
            };

            Object.defineProperty(globalThis, "navigator", {
                value: {
                    userAgentData: {
                        brands: [{ brand: "Chromium", version: "119" }],
                        mobile: false,
                        platform: "Windows",
                        getHighEntropyValues: vi.fn().mockResolvedValue(highEntropyData),
                    },
                },
                writable: true,
                configurable: true,
            });

            const result = await getHighEntropyClientHints();

            expect(result).not.toBeNull();
            expect(result?.architecture).toBe("x86");
            expect(result?.bitness).toBe("64");
            expect(result?.platformVersion).toBe("15.0.0");
        });

        it("should fall back to basic hints when high entropy fails", async () => {
            Object.defineProperty(globalThis, "navigator", {
                value: {
                    userAgentData: {
                        brands: [{ brand: "Chromium", version: "119" }],
                        mobile: false,
                        platform: "Windows",
                        getHighEntropyValues: vi.fn().mockRejectedValue(new Error("Permission denied")),
                    },
                },
                writable: true,
                configurable: true,
            });

            const result = await getHighEntropyClientHints();

            expect(result).not.toBeNull();
            expect(result?.brands).toEqual([{ brand: "Chromium", version: "119" }]);
            expect(result?.platform).toBe("Windows");
        });

        it("should return null for high entropy when getHighEntropyValues not a function", async () => {
            Object.defineProperty(globalThis, "navigator", {
                value: {
                    userAgentData: {
                        brands: [{ brand: "Chromium", version: "119" }],
                        mobile: false,
                        platform: "Windows",
                    },
                },
                writable: true,
                configurable: true,
            });

            const result = await getHighEntropyClientHints();

            expect(result).toBeNull();
        });

        it("should detect async client hints with high entropy", async () => {
            const highEntropyData = {
                brands: [{ brand: "Chromium", version: "119" }],
                mobile: false,
                platform: "Linux",
                architecture: "x86",
                bitness: "64",
            };

            Object.defineProperty(globalThis, "navigator", {
                value: {
                    userAgentData: {
                        brands: [{ brand: "Chromium", version: "119" }],
                        mobile: false,
                        platform: "Linux",
                        getHighEntropyValues: vi.fn().mockResolvedValue(highEntropyData),
                    },
                },
                writable: true,
                configurable: true,
            });

            const result = await detectClientHintsAsync();

            expect(result.supported).toBe(true);
            expect(result.data?.architecture).toBe("x86");
        });

        it("should not detect support when userAgentData is undefined", () => {
            Object.defineProperty(globalThis, "navigator", {
                value: {
                    userAgentData: undefined,
                },
                writable: true,
                configurable: true,
            });

            expect(isClientHintsSupported()).toBe(false);
        });
    });
});
