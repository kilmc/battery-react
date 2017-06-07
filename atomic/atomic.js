import {
  compile
} from './atomic.config';

import { spacing } from './src/spacing';
// Background
import { backgroundSize } from './src/background-size';
import { backgroundImage } from './src/background-image';
import { backgroundColor } from './src/background-color';

// Border
import { border } from './src/border';
import { borderColor } from './src/border-color';
import { borderWidth } from './src/border-width';

// Border Radius
import { borderRadius } from './src/border-radius';

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
} from './src/flexbox'

// Misc
import { boxSizing } from './src/box-sizing';
import { clear } from './src/clear';
import { textColor } from './src/text-color';
import { cursor } from './src/cursor';
import { display } from './src/display';
import { fillColor } from './src/fillColor';
import { pointerEvents } from './src/pointer-events';
import { float } from './src/float'
import { fontWeight } from './src/font-weight'


// Compiler
// ------------------------------------------------------------------

export const compiled = compile({
  alignContent,
  alignItems,
  alignSelf,
  backgroundColor,
  backgroundImage,
  backgroundSize,
  border,
  borderColor,
  borderRadius,
  borderWidth,
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
  fontWeight,
  justifyContent,
  pointerEvents,
  textColor,
  spacing
})