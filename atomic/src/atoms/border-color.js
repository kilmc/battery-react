import {
  colors,
  allColors
} from '../../atomic.config.js';

export const borderColor = {
  props: { 'border': 'border-color' },
  values: colors([...allColors])
}

export const borderColorFocus = {
  props: { 'border-focused': 'border-color' },
  psuedo: 'focus',
  values: colors([...allColors])
}