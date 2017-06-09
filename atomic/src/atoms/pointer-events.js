import {
  keywords
} from '../../atomic.config.js';

export const pointerEvents = {
  props: { '': 'pointer-events' },
  values: keywords({
    'click-through': 'none',
    'click-on': 'auto'
  }, '')
};