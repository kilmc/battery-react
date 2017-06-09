import {
  keywords
} from '../../atomic.config.js';

export const cursor = {
  props: { '': 'cursor' },
  values: keywords({
    'default-cursor': 'default',
    'pointer': 'pointer',
    'draggable': 'move',
    'not-allowed': 'not-allowed'
  }, '')
};

