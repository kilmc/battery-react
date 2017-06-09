import {
  keywords
} from '../../atomic.config.js';

export const backgroundPosition = {
  props: { 'bg': 'background-position' },
  values: keywords({
    center: 'center center',
    top: 'center top',
    bottom: 'center bottom',
    left: 'left center',
    right: 'right center'
  },'-')
};
