import {
  keywords
} from '../atomic.config.js';

export const backgroundPosition = {
  props: { 'bg': 'background-repeat' },
  values: keywords({ 'no-repeat': 'no-repeat' })
};
