import {
  compile,
} from './atomic.config';

import { backgroundColor } from './src/atoms/background-color';
import { backgroundImage } from './src/atoms/background-image';
import { backgroundPosition } from './src/atoms/background-position';
import { backgroundRepeat } from './src/atoms/background-repeat';
import { backgroundSize } from './src/atoms/background-size';

import {
  borderColor,
  borderColorFocus
} from './src/atoms/border-color';

import {
  borderRadius,
  borderRadiusFull
} from './src/atoms/border-radius';

import { borderWidth } from './src/atoms/border-width';
import { border } from './src/atoms/border';
import { boxShadow } from './src/atoms/box-shadow'
import { boxSizing } from './src/atoms/box-sizing';
import { clear } from './src/atoms/clear';
import { textColor } from './src/atoms/color';
import { cursor } from './src/atoms/cursor';
import { display } from './src/atoms/display';
import { fillColor } from './src/atoms/fill';

import {
  flex,
  flexDirection,
  flexWrap,
  alignItems,
  alignSelf,
  justifyContent,
  alignContent,
  flexOrder
} from './src/atoms/flexbox';

import { float } from './src/atoms/float';
import { fontFamily } from './src/atoms/font-family';
import { fontSize } from './src/atoms/font-size';
import { fontStyle } from './src/atoms/font-style';
import { fontWeight } from './src/atoms/font-weight';
import {
  height,
  width,
  maxWidth
} from './src/atoms/height-width';

import { letterSpacing } from './src/atoms/letter-spacing';
import { lineHeight } from './src/atoms/line-height';

import {
  marginPaddingAll,
  margin,
  spacingY,
  spacingX
} from './src/atoms/margin-padding';

import { opacity } from './src/atoms/opacity';
import { overflow } from './src/atoms/overflow'
import { pointerEvents } from './src/atoms/pointer-events';

import {
  position,
  positionDirections
} from './src/atoms/position'

import { resize } from './src/atoms/resize';
import { strokeColor } from './src/atoms/stroke';
import { textAlign } from './src/atoms/text-align';
import { textDecoration } from './src/atoms/text-decoration';
import { textOverflow } from './src/atoms/text-overflow';
import { textTransform } from './src/atoms/text-transform';
import { verticalAlign } from './src/atoms/vertical-align';
import { webkitOverflowScrolling } from './src/atoms/webkit';
import { whiteSpace } from './src/atoms/white-space';
import { wordBreak } from './src/atoms/white-break';
import { zIndex } from './src/atoms/z-index';


// Compiler
// ------------------------------------------------------------------

export const compiled = compile({
  alignContent,
  alignItems,
  alignSelf,
  backgroundColor,
  backgroundImage,
  backgroundPosition,
  backgroundRepeat,
  backgroundSize,
  border,
  borderColor,
  borderColorFocus,
  borderRadius,
  borderRadiusFull,
  borderWidth,
  boxShadow,
  boxSizing,
  clear,
  cursor,
  display,
  fillColor,
  flex,
  flexDirection,
  flexOrder,
  flexWrap,
  float,
  fontFamily,
  fontSize,
  fontStyle,
  fontWeight,
  height,
  justifyContent,
  letterSpacing,
  lineHeight,
  margin,
  marginPaddingAll,
  maxWidth,
  opacity,
  overflow,
  pointerEvents,
  position,
  positionDirections,
  resize,
  spacingX,
  spacingY,
  strokeColor,
  textAlign,
  textColor,
  textDecoration,
  textOverflow,
  textTransform,
  verticalAlign,
  webkitOverflowScrolling,
  whiteSpace,
  width,
  wordBreak,
  zIndex
})

export const molecules = {
  'bttn': ['rounded','block']
}