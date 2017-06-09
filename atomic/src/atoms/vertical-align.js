import {
  keywords
} from '../../atomic.config.js';

export const verticalAlign = {
  props: { 'valign': 'vertical-align' },
  values: keywords({
    'middle': 'middle',
    'bottom': 'bottom',
    'text-bottom': 'text-bottom',
    'top': 'top',
    'super': 'super',
    'sub': 'sub',
    'text-top': 'text-top',
    'baseline': 'baseline'
  })
};
