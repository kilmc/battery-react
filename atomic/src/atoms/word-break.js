import {
  keywords
} from '../../atomic.config.js';

export const textOverflow = {
  props: { 'word': 'word-break' },
  values: keywords({
    'break': 'break-all',
    'keep': 'keep-all'
  })
};

