import {
  keywords
} from '../../atomic.config.js';

export const boxShadow = {
  props: { 'shadow': 'box-shadow' },
  mobileFirstValues: keywords({
    'high': '0 4px 10px 0 rgba(22, 22, 22, 0.08)',
    'card': '0 2px 6px -2px rgba(22, 22, 22, 0.45)',
    'button': '0 2px 4px 0 #DCDEDD',
    'low': '0 0 4px 0 rgba(168, 167, 164, 0.4)',
    'avatar': '0 1px 2px 0 rgba(0, 0, 0, 0.2)',
    '1': '0 1px 2px 1px color(black_17)',
    '2': '0 2px 6px 0 color(black_17)',
    '3': '0 3px 6px 1px color(black_17)',
    'none': 'none'
  })
}
