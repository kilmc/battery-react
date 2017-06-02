import {
  colors
} from './atomic.config.js';

export const fillColor = {
  props: { 'fill': 'fill' },
  values: colors(['gray', 'blue', 'orange']),
  perScreenValues: colors(['transparent'])
};