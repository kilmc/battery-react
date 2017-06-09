import {
  compile,
} from './atomic.config';

import {
  marginPaddingAll,
  spacingY
} from './src/atoms/margin-padding';
// Background
import { backgroundColor } from './src/atoms/background-color';
import { backgroundImage } from './src/atoms/background-image';
import { backgroundPosition } from './src/atoms/background-position';
import { backgroundSize } from './src/atoms/background-size';

// Border
import { border } from './src/atoms/border';
import {
  borderColor,
  borderColorFocus
} from './src/atoms/border-color';
import { borderWidth } from './src/atoms/border-width';

// Border Radius
import {
  borderRadius,
  borderRadiusFull
} from './src/atoms/border-radius';

// Flexbox
import {
  flex,
  flexDirection,
  flexWrap,
  alignItems,
  alignSelf,
  justifyContent,
  alignContent,
  flexOrder
} from './src/atoms/flexbox'

// Misc
import { boxSizing } from './src/atoms/box-sizing';
import { clear } from './src/atoms/clear';
import { textColor } from './src/atoms/color';
import { cursor } from './src/atoms/cursor';
import { display } from './src/atoms/display';
import { fillColor } from './src/atoms/fill';
import { strokeColor } from './src/atoms/stroke';
import { pointerEvents } from './src/atoms/pointer-events';
import { float } from './src/atoms/float'
import { fontWeight } from './src/atoms/font-weight'
import { letterSpacing } from './src/atoms/letter-spacing'
import { lineHeight } from './src/atoms/line-height'
import { opacity } from './src/atoms/opacity'
import { overflow } from './src/atoms/overflow'
import { webkitOverflowScrolling } from './src/atoms/webkit'
import { fontSize } from './src/atoms/font-size'
import { textAlign } from './src/atoms/text-align'

import {
  position,
  positionDirections
} from './src/atoms/position'
import { boxShadow } from './src/atoms/box-shadow'
import {
  height,
  width,
  maxWidth
} from './src/atoms/height-width'

// Compiler
// ------------------------------------------------------------------

export const compiled = compile({
  alignContent,
  alignItems,
  alignSelf,
  backgroundColor,
  backgroundImage,
  backgroundSize,
  backgroundPosition,
  border,
  borderColor,
  borderColorFocus,
  borderRadius,
  borderRadiusFull,
  borderWidth,
  boxSizing,
  clear,
  cursor,
  display,
  strokeColor,
  fillColor,
  flex,
  flexDirection,
  flexOrder,
  flexWrap,
  float,
  fontWeight,
  justifyContent,
  pointerEvents,
  textColor,
  letterSpacing,
  lineHeight,
  marginPaddingAll,
  spacingY,
  opacity,
  overflow,
  webkitOverflowScrolling,
  position,
  positionDirections,
  boxShadow,
  height,
  width,
  maxWidth,
  fontSize,
  textAlign
})

export const molecules = {
  'bttn': ['rounded','block']
}