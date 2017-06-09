import {
  keywords
} from '../../atomic.config.js';

export const textTransform = {
  props: { 'text': 'text-transform' },
  values: keywords({
    'capitalize': 'capitalize',
    'lowercase': 'lowercase',
    'uppercase': 'uppercase',
    'none': 'none'
  })
};

