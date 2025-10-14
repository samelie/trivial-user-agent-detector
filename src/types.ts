/**
 * Type-safe user agent detector types
 */

export type DeviceType = "desktop" | "mobile" | "tablet" | "smarttv" | "console" | "wearable" | "xr" | "embedded";

export type IOSVersion = number | false;

export type IEVersion = number;

export type BrowserVersion = number | false;

export type RenderingEngine = "Blink" | "WebKit" | "Gecko" | "Trident" | "EdgeHTML" | "Presto" | "unknown";

export type CPUArchitecture = "amd64" | "arm64" | "arm" | "armhf" | "ia32" | "sparc" | "unknown";

export type TransitionEndEvent =
    | "transitionend"
    | "oTransitionEnd"
    | "webkitTransitionEnd"
    | undefined;

export type VisibilityChangeEvent =
    | "visibilitychange"
    | "mozvisibilitychange"
    | "msvisibilitychange"
    | "webkitvisibilitychange"
    | undefined;

export type HiddenProperty =
    | "hidden"
    | "mozHidden"
    | "msHidden"
    | "webkitHidden"
    | undefined;

export interface IOSDetectionResult {
    readonly isIpad: boolean;
    readonly isIphone: boolean;
    readonly isIpod: boolean;
    readonly isIOS: boolean;
    readonly isIOS5: boolean;
    readonly isIOS6: boolean;
    readonly isIOS7: boolean;
    readonly isIOS8: boolean;
    readonly isIOS9: boolean;
    readonly IOSVersion: IOSVersion;
}

export interface AndroidDetectionResult {
    readonly isAndroid: boolean;
    readonly isAndroidOld: boolean;
    readonly isAndroidStock: boolean;
}

export interface DeviceDetectionResult {
    readonly isTablet: boolean;
    readonly isMobile: boolean;
    readonly isDesktop: boolean;
    readonly device: DeviceType;
}

export interface IEDetectionResult {
    readonly IEVersion: IEVersion;
    readonly isIE: boolean;
    readonly isIE11: boolean;
    readonly isIE11Down: boolean;
    readonly isIE11Up: boolean;
    readonly isIE10: boolean;
    readonly isIE10Down: boolean;
    readonly isIE10Up: boolean;
    readonly isIE9: boolean;
    readonly isIE9Down: boolean;
    readonly isIE9Up: boolean;
    readonly isIE8: boolean;
    readonly isIE8Down: boolean;
    readonly isIE8Up: boolean;
}

export interface BrowserDetectionResult {
    readonly isFirefox: boolean;
    readonly isChrome: boolean;
    readonly isSafari: boolean;
    readonly isEdge: boolean;
    readonly isOpera: boolean;
    readonly webp: boolean;
    readonly chromeVersion: BrowserVersion;
    readonly firefoxVersion: BrowserVersion;
    readonly safariVersion: BrowserVersion;
    readonly edgeVersion: BrowserVersion;
    readonly operaVersion: BrowserVersion;
}

export interface CapabilityDetectionResult {
    readonly hasHistory: boolean;
    readonly hasMouseMove: boolean;
    readonly hasTouch: boolean;
    readonly hasFullscreen: boolean;
    readonly hasCanvas: boolean;
    readonly hasWebgl: boolean;
}

export interface DOMFeatureDetectionResult {
    readonly transitionEnd: TransitionEndEvent;
    readonly visibilityChangeEventName: VisibilityChangeEvent;
    readonly hiddenPropertyName: HiddenProperty;
}

export interface PixelRatioResult {
    readonly pixelRatio: number;
    readonly isRetina: boolean;
}

export interface EngineDetectionResult {
    readonly engine: RenderingEngine;
}

export interface CPUDetectionResult {
    readonly architecture: CPUArchitecture;
}

export interface ClientHintsBrand {
    readonly brand: string;
    readonly version: string;
}

export interface ClientHintsData {
    readonly brands?: readonly ClientHintsBrand[];
    readonly mobile?: boolean;
    readonly platform?: string;
    readonly architecture?: string;
    readonly bitness?: string;
    readonly model?: string;
    readonly platformVersion?: string;
    readonly fullVersionList?: readonly ClientHintsBrand[];
}

export interface ClientHintsResult {
    readonly supported: boolean;
    readonly data: ClientHintsData | null;
}

export interface DetectorResult
    extends IOSDetectionResult,
    AndroidDetectionResult,
    DeviceDetectionResult,
    IEDetectionResult,
    BrowserDetectionResult,
    CapabilityDetectionResult,
    DOMFeatureDetectionResult,
    PixelRatioResult,
    EngineDetectionResult,
    CPUDetectionResult {}

/**
 * Browser environment interfaces for type-safe access
 */
export interface BrowserNavigator {
    readonly userAgent: string;
    readonly vendor?: string;
    readonly appName: string;
    readonly appVersion: string;
    readonly platform: string;
    readonly userAgentData?: NavigatorUAData;
}

export interface NavigatorUAData {
    readonly brands?: readonly ClientHintsBrand[];
    readonly mobile: boolean;
    readonly platform: string;
    getHighEntropyValues: (hints: readonly string[]) => Promise<ClientHintsData>;
}

export interface BrowserWindow {
    readonly navigator: BrowserNavigator;
    readonly chrome?: unknown;
    readonly opera?: string;
    readonly devicePixelRatio?: number;
    readonly history?: {
        readonly pushState?: unknown;
    };
    readonly CanvasRenderingContext2D?: unknown;
    readonly WebGLRenderingContext?: unknown;
}

export interface BrowserDocument {
    readonly body: HTMLElement;
    readonly hidden?: boolean;
    readonly mozHidden?: boolean;
    readonly msHidden?: boolean;
    readonly webkitHidden?: boolean;
}

export interface HTMLElementWithFullscreen extends HTMLElement {
    readonly requestFullScreen?: () => void;
    readonly webkitRequestFullScreen?: () => void;
    readonly mozRequestFullScreen?: () => void;
    readonly msRequestFullscreen?: () => void;
}
