import {
  keywords
} from './atomic.config.js';

export const backgroundImage = {
  props: { 'bg': 'background-image' },
  mobileFirstValues: keywords({'none': 'none !important'},'-')
};