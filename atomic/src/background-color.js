import {
  colors
} from '../atomic.config.js';

export const backgroundColor = {
  props: { 'bg': 'background-color' },
  values: colors(['gray', 'blue', 'orange']),
  perScreenValues: colors(['transparent'])
};
