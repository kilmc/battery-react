import {
  keywords
} from '../../atomic.config.js';

export const borderRadius = {
  props: { '': 'border-radius' },
  values: keywords({
    'pill': '200px',
    'circle': '100%'
  }, '')
};

export const borderRadiusFull = {
  props: { '': 'border-radius' },
  subProps: {
    'top': ['top-left-radius','top-right-radius'],
    'right': ['top-right-radius','bottom-right-radius'],
    'bottom': ['bottom-left-radius','bottom-right-radius'],
    'left': ['top-left-radius','bottom-left-radius'],
    'top-right': ['top-right-radius'],
    'bottom-right': ['bottom-right-radius'],
    'top-left': ['top-left-radius'],
    'bottom-left': ['bottom-left-radius']
  },
  subPropSeparator: '-',
  values: keywords({
    'no-radius': '0',
    'rounded': '2px',
    'rounded-medium': '4px',
    'rounded-large': '6px'
  },'')
};