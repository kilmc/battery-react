import {
  keywords
} from './atomic.config.js';

export const clear = {
  props: { '': 'clear' },
  values: keywords({
    'left': 'left',
    'right': 'right',
    'both': 'both'
  })
};