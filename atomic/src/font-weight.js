import {
  keywords
} from '../atomic.config.js';

export const fontWeight = {
  props: { '': 'font-weight' },
  mobileFirstValues: keywords({
    'light': '200',
    'normal': '400',
    'medium': '500',
    'bold': '700'
  })
}