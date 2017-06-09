import {
  keywords,
  defaultValue,
  colorHex
} from '../../atomic.config.js';

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
    defaultValue(`0.1rem solid ${colorHex('grey-400')}`),
    keywords({ 'none': 'none !important' })
  )
}