import {
  colors,
  allColors
} from '../../atomic.config.js';

export const fillColor = {
  props: { 'fill': 'fill' },
  values: colors([...allColors]),
  perScreenValues: colors(['transparent'])
};