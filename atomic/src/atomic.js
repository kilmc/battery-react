import {
  compile
} from './atomic.config';

// Background
import backgroundSize from './background-size';
import backgroundImage from './background-image';
import backgroundColor from './background-color';

// Border
import border from './border';
import borderColor from './border-color';
import borderWidth from './border-width';

// Border Radius
import borderRadius from './border-radius';

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
} from './flexbox'

// Misc
import boxSizing from './box-sizing';
import clear from './clear';
import textColor from './text-color';
import cursor from './cursor';
import display from './display';
import fill from './fill';
import pointerEvents from './pointer-events';
import float from './float'
import fontWeight from './font-weight'


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
  fill,
  flex,
  flexDirection,
  flexOrder,
  flexWrap,
  float,
  fontWeight,
  justifyContent,
  pointerEvents,
  textColor
})