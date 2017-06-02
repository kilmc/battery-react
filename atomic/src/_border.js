import {
  keywords,
  defaultValue
} from './atomic.config.js';

export const border = {
  props: { 'border': 'border' },
  propSeparator: '-',
  subProps: {
    'top': ['top'],
    'right': ['right'],
    'bottom': ['bottom'],
    'left': ['left'],
  },
  mobileFirstValues: Object.assign({},
    defaultValue('0.1rem solid #fff000'),
    keywords({ 'none': 'none !important' }, '-')
  )
}