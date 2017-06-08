import {
  colors,
  allColors
} from '../atomic.config.js';

export const backgroundColor = {
  props: { 'bg': 'background-color' },
  // values: colors(...allColors),
  perScreenValues: colors(['transparent'])
};
