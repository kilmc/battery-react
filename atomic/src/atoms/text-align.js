import {
  keywords
} from '../../atomic.config.js';

export const textAlign = {
  props: { 'text': 'text-align' },
  mobileFirstValues: keywords({
    'center': 'center',
    'left': 'left',
    'right': 'right',
  })
};