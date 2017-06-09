import {
  keywords
} from '../../atomic.config.js';

export const overflow = {
  props: { '': 'overflow' },
  values: keywords({
    'clip': 'hidden',
    'scroll': 'scroll',
    'scroll-x': 'scroll',
    'scroll-y': 'scroll',
    'auto-scroll-x': 'auto',
    'auto-scroll-y': 'auto'
  }, '')
};
