import {
  keywords
} from '../../atomic.config.js';

export const backgroundRepeat = {
  props: { 'bg': 'background-repeat' },
  values: keywords({ 'no-repeat': 'no-repeat' })
};
