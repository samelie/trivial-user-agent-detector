# @adddog/trivial-user-agent-detector

Type-safe, functional user agent detection library for browsers. Detects devices, browsers, capabilities, and features without classes.

## Features

- 🎯 **Type-safe** - Full TypeScript support with strict types
- 🪶 **Lightweight** - No dependencies, small bundle size
- 🌲 **Tree-shakeable** - Import only what you need
- ⚡ **Fast** - Lazy evaluation and result caching
- 🔒 **Immutable** - All results are frozen
- 🧪 **Well-tested** - Comprehensive test coverage
- 🎨 **Modern API** - Factory function with methods

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
console.log(all.isMobile); // true/false
console.log(all.isChrome); // true/false
console.log(all.hasTouch); // true/false

// Or use individual methods for specific features
const browser = detector.detectBrowser();
console.log(browser.isChrome); // true

const device = detector.detectDevice();
console.log(device.isMobile); // true

const capabilities = detector.detectCapabilities();
console.log(capabilities.hasTouch); // true
```

## Demo

Check out the [live demo](https://your-github-pages-url.com) to see the detector in action on your device!

Or run the demo locally:

```bash
pnpm demo
# Then open http://localhost:8765
```

## API

### Main Factory Function

```typescript
import { createDetector } from "@adddog/trivial-user-agent-detector";

const detector = createDetector();
```

### Detection Methods

The detector instance provides these methods:

#### `detectAll()`
Returns all detection results combined into a single object.

```typescript
const all = detector.detectAll();
// Returns: DetectorResult with all properties
```

#### `detectDevice()`
Detects device type (mobile, tablet, desktop, etc.).

```typescript
const device = detector.detectDevice();
console.log(device.isMobile); // boolean
console.log(device.isTablet); // boolean
console.log(device.isDesktop); // boolean
console.log(device.device); // "mobile" | "tablet" | "desktop" | etc.
```

#### `detectBrowser()`
Detects browser type and features.

```typescript
const browser = detector.detectBrowser();
console.log(browser.isChrome); // boolean
console.log(browser.isFirefox); // boolean
console.log(browser.isSafari); // boolean
console.log(browser.webp); // boolean (WebP support)
```

#### `detectIOS()`
Detects iOS devices and version.

```typescript
const ios = detector.detectIOS();
console.log(ios.isIOS); // boolean
console.log(ios.isIphone); // boolean
console.log(ios.isIpad); // boolean
console.log(ios.IOSVersion); // number | false
```

#### `detectAndroid()`
Detects Android devices.

```typescript
const android = detector.detectAndroid();
console.log(android.isAndroid); // boolean
console.log(android.isAndroidStock); // boolean
```

#### `detectCapabilities()`
Detects browser capabilities.

```typescript
const caps = detector.detectCapabilities();
console.log(caps.hasTouch); // boolean
console.log(caps.hasCanvas); // boolean
console.log(caps.hasWebgl); // boolean
console.log(caps.hasFullscreen); // boolean
```

#### `detectPixelRatio()`
Detects display pixel ratio.

```typescript
const display = detector.detectPixelRatio();
console.log(display.pixelRatio); // number
console.log(display.isRetina); // boolean
```

#### `detectEngine()`
Detects browser rendering engine.

```typescript
const engine = detector.detectEngine();
console.log(engine.engine); // "Blink" | "WebKit" | "Gecko" | etc.
```

#### `detectCPU()`
Detects CPU architecture.

```typescript
const cpu = detector.detectCPU();
console.log(cpu.architecture); // "amd64" | "arm64" | "arm" | etc.
```

#### `detectClientHints()` (async)
Detects modern User-Agent Client Hints.

```typescript
const hints = await detector.detectClientHints();
console.log(hints.supported); // boolean
console.log(hints.data?.platform); // "Windows" | "macOS" | etc.
```

## Tree-Shakeable Imports

For optimal bundle size, import only the detection modules you need:

```typescript
import { detectBrowser } from "@adddog/trivial-user-agent-detector/browser-detection";
import { detectDevice } from "@adddog/trivial-user-agent-detector/device-detection";

const browser = detectBrowser(userAgent, chrome, vendor);
const device = detectDevice(userAgent, isAndroid, isIOS);
```

### Available Subpath Imports

- `@adddog/trivial-user-agent-detector/android-detection`
- `@adddog/trivial-user-agent-detector/browser-detection`
- `@adddog/trivial-user-agent-detector/capability-detection`
- `@adddog/trivial-user-agent-detector/client-hints`
- `@adddog/trivial-user-agent-detector/cpu-detection`
- `@adddog/trivial-user-agent-detector/device-detection`
- `@adddog/trivial-user-agent-detector/engine-detection`
- `@adddog/trivial-user-agent-detector/ios-detection`
- `@adddog/trivial-user-agent-detector/types`

## TypeScript

All types are exported from the main entry point:

```typescript
import type {
  DetectorResult,
  BrowserDetectionResult,
  DeviceDetectionResult,
  DeviceType,
  // ... and more
} from "@adddog/trivial-user-agent-detector";
```

## Performance

The detector uses several optimization strategies:

- **Lazy Evaluation** - Detection functions only run when you call them
- **Caching** - Results are cached after first access
- **Immutability** - All results are frozen with `Object.freeze()`
- **Tree-Shaking** - Only bundle what you use with subpath imports

## Browser Support

Works in all modern browsers and IE9+. Uses feature detection where possible to ensure accurate results across all platforms.

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Links

- [Demo Page](example/index.html)
- [Usage Examples](USAGE.md)
- [GitHub Repository](https://github.com/samelie/samelie-monorepo)
