import {
  keywords
} from '../../atomic.config.js';

export const textTransform = {
  props: { 'text': 'text-transform' },
  mobileFirstValues: keywords({
    'text-capitalize': 'capitalize',
    'text-lowercase': 'lowercase',
    'text-uppercase': 'uppercase',
    'text-none': 'none'
  })
};

