import {
  keywords,
  percentages
} from '../atomic.config.js';

export const backgroundSize = {
  props: { 'bg': 'background-size' },
  values: Object.assign({},
    keywords({
      'cover': 'cover',
      'contain': 'contain',
      'full-height': 'auto 100%',
      'full-width': '100% auto'
    },'-'),
    percentages([10, 20, 25, 33, 34, 35, 40, 50, 60, 66, 75, 80, 90, 100, 105])
  )
};