import {
  scalers
} from '../atomic.config.js';

export const spacing = {
  props: {
    m: 'margin',
    p: 'padding',
  },
  subProps: {
    t: ['top'],
    r: ['right'],
    b: ['bottom'],
    l: ['left'],
    x: ['left', 'right'],
    y: ['top', 'bottom'],
  },
  mobileFirstValues: scalers([0,1,2,3,4,5])
};