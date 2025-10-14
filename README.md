# @adddog/trivial-user-agent-detector

> Type-safe, functional user agent detection for modern browsers

A comprehensive, zero-dependency library for detecting browsers, devices, capabilities, and features. Built with TypeScript, functional programming principles, and complete immutability.

![Features](https://raw.githubusercontent.com/samradical/readme-images/refs/heads/main/crt-fs8.png)

✨ **Browser Detection** - Chrome, Firefox, Safari, Edge, Opera with version numbers
📱 **Device Detection** - Mobile, tablet, desktop, smart TV, console, wearable, XR, embedded
🔧 **CPU Architecture** - AMD64, ARM64, ARM, ARMHF, IA32, SPARC
🎨 **Rendering Engines** - Blink, WebKit, Gecko, Trident, EdgeHTML, Presto
💪 **Capabilities** - Touch, Canvas, WebGL, History API, Fullscreen
🎯 **iOS & Android** - Specific device and version detection
🔢 **Version Comparison** - Built-in helpers for browser version checks
🌐 **Client Hints** - Modern User-Agent Client Hints API support
🎁 **100% Type-Safe** - Full TypeScript support with strict types
🌳 **Tree-Shakeable** - Import only what you need
🚫 **Zero Dependencies** - No external dependencies

## Installation

```bash
pnpm add @adddog/trivial-user-agent-detector
# or
npm install @adddog/trivial-user-agent-detector
# or
yarn add @adddog/trivial-user-agent-detector
```

## Quick Start

```typescript
import { createDetector } from "@adddog/trivial-user-agent-detector";

const detector = createDetector();

// Get all detection results at once
const all = detector.detectAll();
console.log(all);

// Or use individual methods
const browser = detector.detectBrowser();
console.log(browser.browserName);     // "Chrome"
console.log(browser.isChrome);        // true
console.log(browser.chromeVersion);   // 119

// Or use the convenience method
console.log(detector.getBrowserName()); // "Chrome" | "Firefox" | "Safari" | "Edge" | "Opera" | "IE" | "unknown"

const device = detector.detectDevice();
console.log(device.isMobile);         // true
console.log(device.device);           // "mobile"
```

## Browser Name

Get the browser name as a simple string:

```typescript
const detector = createDetector();
const browser = detector.detectBrowser();

// Get browser name from detection result
console.log(browser.browserName); // "Chrome" | "Firefox" | "Safari" | "Edge" | "Opera" | "unknown"

// Or use the convenience method (includes IE detection)
console.log(detector.getBrowserName()); // "Chrome" | "Firefox" | "Safari" | "Edge" | "Opera" | "IE" | "unknown"
```

The `browserName` property on `BrowserDetectionResult` provides a clean way to get the detected browser name without checking multiple boolean flags. The `getBrowserName()` method also checks for Internet Explorer.

## Browser Version Detection

Detect major browser versions and compare them easily:

```typescript
const detector = createDetector();
const browser = detector.detectBrowser();

// Version properties
console.log(browser.chromeVersion);   // 119 or false
console.log(browser.firefoxVersion);  // 120 or false
console.log(browser.safariVersion);   // 17 or false
console.log(browser.edgeVersion);     // 119 or false
console.log(browser.operaVersion);    // 105 or false

// Version comparison helpers
if (detector.isBrowserVersionGreaterThanOrEqual(browser.chromeVersion, 100)) {
    console.log("Chrome 100+ detected - feature is supported!");
}

if (detector.isBrowserVersionLessThan(browser.firefoxVersion, 90)) {
    console.log("Loading polyfill for older Firefox");
}

if (detector.isBrowserVersionInRange(browser.safariVersion, 14, 17)) {
    console.log("Safari version is in supported range");
}

// Check for specific version bugs
if (browser.isEdge && detector.isBrowserVersionEqual(browser.edgeVersion, 18)) {
    console.log("Apply Edge 18 workaround");
}
```

## Device Detection

Detect a wide range of device types:

```typescript
const device = detector.detectDevice();

console.log(device.device); // "desktop" | "mobile" | "tablet" | "smarttv" | "console" | "wearable" | "xr" | "embedded"
console.log(device.isMobile);   // boolean
console.log(device.isTablet);   // boolean
console.log(device.isDesktop);  // boolean
```

## CPU Architecture

Detect the underlying CPU architecture:

```typescript
const cpu = detector.detectCPU();

console.log(cpu.architecture); // "amd64" | "arm64" | "arm" | "armhf" | "ia32" | "sparc" | "unknown"
```

## Rendering Engine

Detect the browser's rendering engine:

```typescript
const engine = detector.detectEngine();

console.log(engine.engine); // "Blink" | "WebKit" | "Gecko" | "Trident" | "EdgeHTML" | "Presto" | "unknown"
```

## iOS & Android Detection

Specific detection for mobile operating systems:

```typescript
const ios = detector.detectIOS();
console.log(ios.isIOS);        // boolean
console.log(ios.isIphone);     // boolean
console.log(ios.isIpad);       // boolean
console.log(ios.isIpod);       // boolean
console.log(ios.IOSVersion);   // number or false

const android = detector.detectAndroid();
console.log(android.isAndroid);      // boolean
console.log(android.isAndroidOld);   // Android < 4.4
console.log(android.isAndroidStock); // Stock Android browser
```

## Capabilities Detection

Detect browser capabilities and features:

```typescript
const caps = detector.detectCapabilities();

console.log(caps.hasTouch);      // Touch events support
console.log(caps.hasCanvas);     // Canvas API
console.log(caps.hasWebgl);      // WebGL support
console.log(caps.hasHistory);    // History API
console.log(caps.hasFullscreen); // Fullscreen API
console.log(caps.hasMouseMove);  // Mouse move events

const ratio = detector.detectPixelRatio();
console.log(ratio.pixelRatio);   // number (e.g., 2)
console.log(ratio.isRetina);     // boolean
```

## Client Hints (Modern API)

Use the modern User-Agent Client Hints API:

```typescript
const hints = await detector.detectClientHints();

if (hints.supported) {
    console.log(hints.data?.platform);        // "Windows"
    console.log(hints.data?.architecture);    // "x86"
    console.log(hints.data?.mobile);          // false
    console.log(hints.data?.platformVersion); // "10.0.0"
}
```

## Complete API

### Detector Interface

```typescript
interface Detector {
    // Detection methods
    detectAll(): Readonly<DetectorResult>;
    detectIOS(): Readonly<IOSDetectionResult>;
    detectAndroid(): Readonly<AndroidDetectionResult>;
    detectDevice(): Readonly<DeviceDetectionResult>;
    detectIE(): Readonly<IEDetectionResult>;
    detectBrowser(): Readonly<BrowserDetectionResult>;
    detectCapabilities(): Readonly<CapabilityDetectionResult>;
    detectDOMFeatures(): Readonly<DOMFeatureDetectionResult>;
    detectPixelRatio(): Readonly<PixelRatioResult>;
    detectEngine(): Readonly<EngineDetectionResult>;
    detectCPU(): Readonly<CPUDetectionResult>;
    detectClientHints(): Promise<Readonly<ClientHintsResult>>;

    // Version comparison helpers
    isBrowserVersionGreaterThan(version: number | false, compare: number): boolean;
    isBrowserVersionGreaterThanOrEqual(version: number | false, compare: number): boolean;
    isBrowserVersionLessThan(version: number | false, compare: number): boolean;
    isBrowserVersionLessThanOrEqual(version: number | false, compare: number): boolean;
    isBrowserVersionEqual(version: number | false, compare: number): boolean;
    isBrowserVersionInRange(version: number | false, min: number, max: number): boolean;

    // Browser name helper
    getBrowserName(): BrowserName; // Includes IE detection
}
```

### Browser Detection Result

```typescript
interface BrowserDetectionResult {
    isFirefox: boolean;
    isChrome: boolean;
    isSafari: boolean;
    isEdge: boolean;
    isOpera: boolean;
    webp: boolean;                    // WebP format support
    browserName: BrowserName;          // "Chrome" | "Firefox" | "Safari" | "Edge" | "Opera" | "unknown"
    chromeVersion: number | false;
    firefoxVersion: number | false;
    safariVersion: number | false;
    edgeVersion: number | false;
    operaVersion: number | false;
}
```

## Tree-Shakeable Imports

For optimal bundle size, import only what you need:

```typescript
// Import specific detection functions
import { detectBrowser } from "@adddog/trivial-user-agent-detector/browser-detection";
import { detectDevice } from "@adddog/trivial-user-agent-detector/device-detection";
import { detectCPU } from "@adddog/trivial-user-agent-detector/cpu-detection";

// Use with explicit parameters
const browser = detectBrowser(navigator.userAgent, window.chrome, navigator.vendor);
const device = detectDevice(navigator.userAgent, false, false);
const cpu = detectCPU(navigator.userAgent, navigator.platform);
```

## Available Subpath Imports

- `@adddog/trivial-user-agent-detector/android-detection`
- `@adddog/trivial-user-agent-detector/browser-detection`
- `@adddog/trivial-user-agent-detector/capability-detection`
- `@adddog/trivial-user-agent-detector/client-hints`
- `@adddog/trivial-user-agent-detector/cpu-detection`
- `@adddog/trivial-user-agent-detector/device-detection`
- `@adddog/trivial-user-agent-detector/engine-detection`
- `@adddog/trivial-user-agent-detector/ios-detection`
- `@adddog/trivial-user-agent-detector/types`

## Real-World Examples

### Feature Detection

```typescript
const detector = createDetector();
const browser = detector.detectBrowser();

// Check if browser supports a modern API
if (browser.isChrome && detector.isBrowserVersionGreaterThanOrEqual(browser.chromeVersion, 100)) {
    // Use modern Chrome API
    useModernAPI();
} else {
    // Use polyfill
    usePolyfill();
}
```

### Responsive Design

```typescript
const device = detector.detectDevice();
const caps = detector.detectCapabilities();

if (device.isMobile && caps.hasTouch) {
    // Mobile touch interface
    enableTouchControls();
} else {
    // Desktop mouse interface
    enableMouseControls();
}
```

### Browser-Specific Workarounds

```typescript
const browser = detector.detectBrowser();
const engine = detector.detectEngine();

if (engine.engine === "WebKit" && browser.isSafari) {
    // Safari-specific CSS
    applySafariWorkaround();
}

if (browser.isEdge && detector.isBrowserVersionEqual(browser.edgeVersion, 18)) {
    // Legacy Edge bug workaround
    applyEdge18Fix();
}
```

### Progressive Enhancement

```typescript
const caps = detector.detectCapabilities();
const ratio = detector.detectPixelRatio();

if (caps.hasWebgl) {
    render3DGraphics();
} else if (caps.hasCanvas) {
    render2DGraphics();
} else {
    renderStaticImage();
}

if (ratio.isRetina) {
    loadHighResImages();
}
```

## Performance Notes

- **Lazy Evaluation** - Detection functions only run when you request them
- **Caching** - Results are cached after first access
- **Immutability** - All results are frozen (Object.freeze) for safety
- **Tree-Shaking** - Use subpath imports to minimize bundle size
- **Zero Runtime Overhead** - No classes, no inheritance, pure functions

## TypeScript Support

Full TypeScript support with strict types:

```typescript
import type {
    DetectorResult,
    BrowserDetectionResult,
    DeviceType,
    CPUArchitecture,
    RenderingEngine,
    BrowserVersion,
} from "@adddog/trivial-user-agent-detector";

const detector = createDetector();
const result: DetectorResult = detector.detectAll();
```

## Browser Support

Works in all modern browsers and Node.js environments:

- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari (macOS/iOS)
- ✅ Opera
- ✅ Legacy Edge (EdgeHTML)
- ✅ Internet Explorer 8-11
- ✅ Node.js (server-side rendering)

## Why This Library?

- **Type-Safe**: Built with strict TypeScript, no `any` types
- **Functional**: Pure functions, no classes, fully immutable
- **Modern**: Supports latest APIs like Client Hints
- **Comprehensive**: Detects browsers, devices, engines, CPUs, and more
- **Battle-Tested**: 180+ unit tests covering edge cases
- **Zero Dependencies**: No external packages required
- **Small Bundle**: Tree-shakeable, import only what you need

## License

MIT

## Contributing

Issues and PRs welcome!
