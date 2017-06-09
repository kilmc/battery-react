import {
  keywords
} from '../../atomic.config.js';

export const boxSizing =  {
  props: { '': 'box-sizing' },
  values: keywords({
    'border-box': 'border-box',
    'content-box': 'content-box'
  }, '')
}