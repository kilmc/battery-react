import {
  keywords
} from '../atomic.config.js';

export const cursor = {
  props: { '': 'cursor' },
  values: keywords({
    'pointer': 'pointer',
    'move': 'move'
  })
};