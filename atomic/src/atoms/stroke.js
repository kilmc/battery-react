import {
  colors,
  allColors
} from '../../atomic.config.js';

export const strokeColor = {
  props: { 'stroke': 'stroke' },
  values: colors([...allColors]),
  perScreenValues: colors(['transparent'])
};