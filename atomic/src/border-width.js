import {
  keywords
} from '../atomic.config.js';

export const borderWidth = {
  props: { 'border': 'border-width' },
  values: keywords({
    'regular': '0.1rem',
    'medium': '0.2rem',
    'thick': '0.3rem'
  }, '-')
};