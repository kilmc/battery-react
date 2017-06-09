import {
  keywords
} from '../../atomic.config.js';

export const webkitOverflowScrolling = {
  props: { '': '-webkit-overflow-scrolling' },
  values: keywords({
    'webkit-scrolling': 'touch'
  }, '')
};
