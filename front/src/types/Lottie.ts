export enum BlendMode {
  Normal,
  Multiply,
  Screen,
  Overlay,
  Darken,
  Lighten,
  ColorDodge,
  ColorBurn,
  HardLight,
  SoftLight,
  Difference,
  Exclusion,
  Hue,
  Saturation,
  Color,
  Luminosity,
}

export enum MatteMode {
  Normal,
  Alpha,
  InvertedAlpha,
  Luma,
  InvertedLuma,
}

export enum Layer3DMode {
  Off,
  On,
}

export enum AutoOrientMode {
  Off,
  On,
}

export enum EffectValueType {
  Number = 0,
  Color = 2,
  MultiDimensional = 3,
  Boolean = 7,
}

export type EffectValue = {
  /** Effect value type */
  ty: EffectValueType;
  /** Effect value index */
  ix: number;
  /** Name */
  nm: string;
  /** ??? */
  mn: string;
  /** Effect value */
  v: Value;
};

export enum EffectType {
  Transform = 5,
  DropShadow = 25,
  GaussianBlur = 29,
}

export type Effect = {
  /** Effect Index. */
  ix: number;
  /** After Effect's Name. */
  nm: string;
  /** Effect type. */
  ty: EffectType;
  /** Effect parameters. [] */
  ef: EffectValue[];
  /** ??? */
  np: number;
  /** Match name (for expressions) */
  mn: string;
  /** ??? */
  en: number;
};

export const enum MaskMode {
  No = 'n',
  Add = 'a',
  Subtract = 's',
  Intersect = 'i',
  Lighten = 'l',
  Darken = 'd',
  Difference = 'f',
}

export type Mask = {
  /** Inverted Mask flag. */
  inv: boolean;
  /** Mask name. */
  nm?: string;
  /** Mask vertices. */
  pt: ShapeProperty;
  /** Mask opacity. */
  o: Value;
  /** Mask mode. */
  mode: MaskMode;
  /** Dilate. */
  x: Value;
};

interface LayerBase {
  ty: LayerType;
}

export interface VisualLayer extends LayerBase {
  /** 3d layer flag */
  ddd?: Layer3DMode;
  /** Hidden layer */
  hd?: boolean;
  /** Layer type */
  ty: LayerType;
  /** After Effects Layer Name */
  nm?: string;
  /** Layer Parent */
  parent?: number;
  /** Layer Time Stretching */
  sr?: number;
  /** Transform properties */
  ks: Transform;
  /** Auto-Orient along path AE property */
  ao?: AutoOrientMode;
  /** In Point of layer */
  ip: number;
  /** Out Point of layer */
  op: number;
  /** Start Time of layer */
  st: number;
  /** Blend Mode */
  bm?: BlendMode;
  /** Matte mode, the layer will inherit the transparency from the layer above */
  tt?: MatteMode;
  /** Layer index in AE */
  ind?: number;
  /** Whether the layer has some masks applied */
  hasMask?: boolean;
  /** List of Masks */
  masksProperties?: Mask[];
  /** List of Effects */
  ef?: Effect[];
  /** matte_target */
  td?: number;
  /**
   * Enable motion blur
   * (only has effect if Animation.mb is set)
   */
  mb?: boolean;
}

export type Layer =
  | NullLayer
  | ImageLayer
  | VideoLayer
  | AudioLayer
  | TextLayer;

export enum LayerType {
  precomp,
  solid,
  still,
  null,
  shape,
  text,
  audio,
  pholderVideo,
  imageSeq,
  video,
  pholderStill,
  guide,
  adjustment,
  camera,
  light,
}

export type Transform = {
  /** Transform Anchor Point. */
  a: MultiDimensional;
  /** Transform Position. */
  p: PositionValue;
  /** Transform Scale. */
  s: MultiDimensional;
  /** Transform Rotation. */
  r: Value;
  /** Transform Opacity. */
  o: Value;
  /** Transform Skew. */
  sk?: Value;
  /** Transform Skew Axis. */
  sa?: Value;
};

export type PrecompLayer = Layer & {
  /** Reference ID (in assets list) */
  refId: string;
};

export type AudioProperties = {
  /** Audio levels. [number, number] */
  lv: Value;
};

export type ShapeLayer = Layer & {
  /** Shape list of items. */
  shapes: ShapeElement[];
};

export type SolidColorLayer = Layer & {
  ty: LayerType.solid;
  /** Color of the layer as a #rrggbb hex. */
  sc: string;
  /** Height of the layer. */
  sh: number;
  /** Width of the layer. */
  sw: number;
};

export interface LayerWithAssetReference extends LayerBase {
  /** id pointing to the source image defined on 'assets' object. */
  refId: string;
}

export interface ImageLayer extends VisualLayer, LayerWithAssetReference {
  ty: LayerType.still;
}

export interface VideoLayer extends VisualLayer, LayerWithAssetReference {
  ty: LayerType.video;
  /** ??? Audio Properties? */
  ao: number;
  /** File format? */
  cl: string;
}

// TODO: AudioLayer is not a visual layer
export interface AudioLayer extends VisualLayer, LayerWithAssetReference {
  ty: LayerType.audio;
  /** Audio Properties. */
  au: AudioProperties;
  /** File format? */
  cl: 'mp3';
}

export interface NullLayer extends VisualLayer, LayerWithAssetReference {
  ty: LayerType.null;
}

export type TextAnimatorDataProperty = {
  /** Transform Anchor Point. */
  a?: MultiDimensional;
  /** Transform Position. */
  p?: PositionValue;
  /** Transform Scale. */
  s?: MultiDimensional;
  /** Transform Rotation. */
  r?: Value;
  /** Transform Opacity. */
  o?: Value;
  /** Transform Skew. */
  sk?: Value;
  /** Transform Skew Axis. */
  sa?: Value;
  /** Angle? */
  rx?: Value;
  /** Angle? */
  ry?: Value;
  /** Stroke width. */
  sw?: Value;
  /** Stroke color. */
  sc?: MultiDimensional;
  /** Fill color. */
  fc?: MultiDimensional;
  /**  fh */
  fh?: Value;
  /** 0-100? */
  fs?: Value;
  /** 0-100? */
  fb?: Value;
  /** Tracking. */
  t?: Value;
};

export enum TextJustify {
  Left = 0,
  Right,
  Center,
}

export enum VerticalJustify {
  Top = 0,
  Center = 1,
  Bottom = 2,
}

export type TextBoxSize = [number, number];

export type TextDocument = {
  /** Font family. */
  f: string;
  /** Text color. */
  fc: Color4;
  /** Font Size. */
  s: number;
  /** Line height when wrapping. */
  lh: number;
  /** Size of the box containing the text */
  sz?: TextBoxSize;
  /** Text. */
  t: string;
  /** Text alignment. */
  j: TextJustify;
  /** Character anchor? */
  ca: number;
  /** Line shift? positive moves text up */
  ls: number;
  /** Position? */
  ps: number[];
  /** Tracking */
  tr: number;
  /** Vertical justification. (Skottie) */
  vj?: VerticalJustify;
};

export type TextDataKeyframe = {
  /** Start value of keyframe segment. */
  s: TextDocument;
  /** Start time of keyframe segment. */
  t: number;
};

export type TextDocumentData = {
  k: TextDataKeyframe[];
};

export type TextMoreOptions = any;
export type MaskedPath = any;

export const enum RangeSelectorDomain {
  Characters = 1,
  CharactersExcludingSpaces,
  Words,
  Lines,
}

export const enum RangeSelectorShape {
  Square = 1,
  RampUp,
  RampDown,
  Triangle,
  Round,
  Smooth,
}

export const enum RangeSelectorUnits {
  Percentage = 1,
  Index,
}

export const enum RangeSelectorMode {
  Add = 1,
  Subtract,
  Intersect,
  Min,
  Max,
  Difference,
}

export type RangeSelector = {
  /** number/enum */
  t: number;
  /** number/enum */
  rn: number;
  /**
   * Domain
   *
   * 1. Characters
   * 2. Characters exluding spaces
   * 3. Words
   * 4. Lines
   */
  b: RangeSelectorDomain;
  /**
   * Shape
   *
   * 1. Square
   * 2. Ramp up
   * 3. Ramp down
   * 4. Triangle
   * 5. Round
   * 6. Smooth
   */
  sh: RangeSelectorShape;
  /**
   * Mode
   *
   * 1. Add
   * 2. Subtract (Unsupported)
   * 3. Intersect (Unsupported)
   * 4. Min (Unsupported)
   * 5. Max (Unsupported)
   * 6. Difference (Unsupported)
   */
  m?: RangeSelectorMode;
  /** Optional square "smoothness" prop. */
  sm: Value;
  /**
   * Units
   *
   * 1. Percentage
   * 2. Index
   */
  r: RangeSelectorUnits;
  /** Start */
  s?: Value;
  /** End */
  e?: Value;
  /** Offset */
  o: Value;
  /** Amount */
  a: Value;
  /** Ease high */
  xe: Value;
  /** Ease low */
  ne: Value;
};

export type TextAnimator = {
  /** Name */
  nm?: string;
  /** Range selector */
  s?: RangeSelector;
  /** Animated properties */
  a: TextAnimatorDataProperty;
};

export type TextData = {
  a: TextAnimator[];
  d: TextDocumentData;
  m?: TextMoreOptions;
  p?: MaskedPath;
};

export interface TextLayer extends VisualLayer {
  ty: LayerType.text;
  /** Text Data. */
  t: TextData;
}

export type Point = { x: number; y: number };

export type Matrix4 = [
  number,
  number,
  number,
  number,

  number,
  number,
  number,
  number,

  number,
  number,
  number,
  number,

  number,
  number,
  number,
  number,
];

export type Matrix3 = [
  number,
  number,
  number,

  number,
  number,
  number,

  number,
  number,
  number,
];

export type Node3D = {
  transform: Matrix4;
  children: Node3D[];
};

export type Context = {
  anchor: number[];
  position: number[];
  rotation: number;
  opacity: number;
  scale: number[];
  points: Array<Point>;
  fill: number[];
};

export enum ShapeType {
  Group = 'gr',
  Rect = 'rc',
  Ellipse = 'el',
  Fill = 'fl',
  TransformShape = 'tr',
  Path = 'sh',
}

export type ShapeElement = {
  /** Hide element. */
  hd: boolean;

  /** After Effect's Name. */
  nm: string;

  /** Shape type. */
  ty: ShapeType;

  /** Property index. */
  cix: number;

  /** Blending Mode */
  bm: BlendMode;
};

export type GroupShapeElement = ShapeElement & {
  /** Number of properties. */
  np: number;
  /** List of ShapeElement.  */
  it: Array<ShapeElement>;
};

export type Bezier = {
  /** Closed property of shape. */
  c?: boolean;
  /** Cubic bezier handles for the segments before each vertex. */
  i: number[][];
  /** Cubic bezier handles for the segments after each vertex. */
  o: number[][];
  /** Bezier curve vertices. */
  v: number[][];
};

export type ShapeProperty = {
  /**
   * Bezier: Non-animated value.
   * ShapePropKeyframe[]: Keyframe list.
   */
  k: Bezier | ShapePropKeyframe[];
  /** Property index. */
  ix?: number;
  /** [0-1] Whether it's animated. */
  a?: number;
};

export type PathShape = ShapeElement & {
  /** Shape's vertices. */
  ks: ShapeProperty;
  /** index  */
  ind: number;
};

export type MultiDimensional = {
  /**
   * number[]: Non-animated value.
   * OffsetKeyframe[]: Animated keyframes.
   */
  k: number[] | OffsetKeyframe[];
  /** Property index. */
  ix?: number;
  /** [0-1] Whether it's animated. */
  a?: number;
  /** ??? */
  l?: number;
};

export type Value = {
  /**
   * number | number[]: Non-animated value.
   * OffsetKeyframe[]: Animated keyframes.
   */
  k: number | number[] | OffsetKeyframe[];
  /** Property index. */
  ix?: number;
  /** [0-1] Whether it's animated. */
  a?: number;
  /** Split values (???) */
  s?: boolean;
};

export type PositionValue = {
  /**
   * number | number[]: Non-animated value.
   * OffsetKeyframe[]: Animated keyframes.
   */
  k: number | number[] | OffsetKeyframe[];
  /** Property index. */
  ix?: number;
  /** [0-1] Whether it's animated. */
  a?: number;
  /** ??? */
  l?: number;
};

export type KeyframeBezierHandle = {
  /** x position of the handle. */
  x: number | number[];
  /** y position of the handle. */
  y: number | number[];
};

// TODO: Overlap between OffsetKeyframe and ShapePropKeyframe

export type OffsetKeyframe = {
  /** Start time of keyframe segment. */
  t: number;
  /** Bezier curve easing in value. */
  i?: KeyframeBezierHandle;
  /** Bezier curve easing out value. */
  o?: KeyframeBezierHandle;
  /** [0-1] Jump to value. */
  h?: number;
  /** Start value of keyframe segment. */
  s: number | number[];
  /** End value of keyframe segment. */
  e?: number[];
  /** In Spatial Tangent. Only for spatial properties. */
  ti?: number[];
  /** Out Spatial Tangent. Only for spatial properties. */
  to?: number[];
};

export type ShapePropKeyframe = {
  /** Start time of keyframe segment. */
  t: number;
  /** Bezier curve easing in value. */
  i: KeyframeBezierHandle;
  /** Bezier curve easing out value. */
  o: KeyframeBezierHandle;
  /** [0-1] Jump to the end value. */
  h: number;
  /** or list of Bezier	Start value of keyframe segment. */
  s: Bezier;
  /** or list of Bezier	End value of keyframe segment. */
  e: Bezier;
};

export type RectShape = ShapeElement & {
  /** After Effect's Direction. */
  d: number;
  /** Rect's position. */
  p: MultiDimensional;
  /** Rect's size. */
  s: MultiDimensional;
  /** Rect's rounded corners. */
  r: Value;
};

export type EllipseShape = ShapeElement;

export type TransformShape = ShapeElement & {
  /** Anchor point */
  a: MultiDimensional;
  /** Transform Position. */
  p: PositionValue;
  /** Transform Scale. */
  s: MultiDimensional;
  /** Transform Rotation. */
  r: Value;
  /** Transform Opacity. */
  o: Value;
  /** Transform Skew. */
  sk: Value;
  /** Transform Skew Axis. */
  sa: Value;
};

export type Color4 = [number, number, number, number];

export type ColorValue = {
  /**
   * number[]: Non-animated value.
   * OffsetKeyframe[]: Animated keyframes.
   */
  k: number[] | OffsetKeyframe[];
  /** Property index. */
  ix: number;
  /** [0-1] Whether it's animated. */
  a?: number;
};

export enum FillRule {
  NonZero = 1,
  EvenOdd,
}

export type FillShape = ShapeElement & {
  /** Fill Opacity. */
  o: Value;
  /** Fill Color. */
  c: ColorValue;
  /** Fill rule. */
  r: FillRule;
};

export type Asset = ImageAsset | PrecompAsset | AudioAsset | VideoAsset;
export type MediaAsset = ImageAsset | AudioAsset | VideoAsset;

interface AssetInterface {
  /** Id used to reference in a precomp layer */
  id: string;
}

export type ImageAsset = AssetInterface & {
  /** URL base */
  u: string;
  /** Path relative to URL base (asset.u) */
  p: string;
  /** [non standard]: URL */
  _p: string;
  /** Width */
  w: number;
  /** Height */
  h: number;
};

export type VideoAsset = AssetInterface & {
  /** URL base */
  u: string;
  /** Path relative to URL base (asset.u) */
  p: string;
  /** [non standard]: URL */
  _p: string;
  /** Width */
  w: number;
  /** Height */
  h: number;
  /** isEmbedded "boolean", [0-1] */
  e: number;
};

export type AudioAsset = AssetInterface & {
  /** URL base */
  u: string;
  /** Path relative to URL base (asset.u) */
  p: string;
  /** [non standard]: URL */
  _p: string;
  /** isEmbedded "boolean", [0-1] */
  e: number;
};

export type PrecompAsset = AssetInterface & {
  /** Layers */
  layers: Layer[];
};

export enum FontPathOrigin {
  CssUrl = 1,
  ScriptUrl,
  FontUrl,
}

export type Font = {
  /** ascent */
  ascent: number;
  /** font_family */
  fFamily: string;
  /** name */
  fName: string;
  /** font_style */
  fStyle: string;
  /** ??? */
  fClass?: string;
  /** path */
  fPath: string;
  /** weight */
  fWeight: string;
  /** origin */
  origin: FontPathOrigin;
};

export type FontList = {
  list: Font[];
};

export type CharData = {
  shapes: ShapeElement[];
};

export type Chars = {
  /** Character Value. */
  ch: string;
  /** Character Font Family. */
  fFamily: string;
  /** Character Font Size. */
  size: number;
  /** Character Font Style. */
  style: string;
  /** Character Width. */
  w: number;
  /** Character Data. */
  data: CharData;
};

export interface Composition {
  /** List of layers. */
  layers?: Layer[];
}

export type Animation = {
  /** Bodymovin Version. */
  v: string;
  /** Frames per second. Positive integer. */
  fr: number;
  /** The time when the composition work area begins, in frames. */
  ip: number;
  /** The time when the composition work area ends. */
  op: number;
  /** Composition Width. */
  w: number;
  /** Composition Height. */
  h: number;
  /** List of Composition Layers. */
  // layers?: Layer[];
  /** Composition name. */
  nm?: string;
  /** [0-1] Composition has 3-D layers. */
  ddd?: number;
  /** source items that can be used in multiple places. */
  assets?: Asset[];
  /** Available fonts. */
  fonts?: FontList;
  /** Source chars for text layers.  */
  chars?: Chars[];
  /** Motion blur setting. (Skottie) */
  mb?: MotionBlurSettings;
};

/**
 * Motion Blur Settings
 * Enable motion blur for a layer by setting `layer.mb = true`
 */
export type MotionBlurSettings = {
  /**
   * Shutter Angle
   * AE default: 180
   * Skottie default: 0 ([0, 720])
   */
  sa?: number;
  /**
   * Shutter Phase
   * AE default: -90
   * Skottie default: 0 ([-360, 360])
   */
  sp?: number;
  /**
   * Samples Per Frame
   * AE default: 16
   * Skottie default: 1 ([1, 64])
   */
  spf?: number;
  /**
   * (not yet supported in any known Lottie player)
   * Adaptive Sample Limit
   * 2D layer motion automatically uses more samples per frame
   * when needed, up to the value specified by Adaptive Sample
   * Limit.
   * AE default: 128
   */
  asl?: number;
};
