import {
  keywords
} from '../../atomic.config.js';

export const webkitOverflowScrolling = {
  props: { 'webkit': '-webkit-overflow-scrolling' },
  values: keywords({
    'scrolling': 'touch'
  })
};

export const webkitAppearance = {
  props: { 'webkit-appearance': '-webkit-appearance' },
  values: keywords({
    'none': 'none'
  })
};