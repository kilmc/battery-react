import {
  colors,
  keywords,
  allColors
} from '../../atomic.config.js';

export const textColor = {
  props: { '': 'color' },
  values: colors([...allColors],''),
  perScreenValues: keywords({ 'transparent': 'transparent' },'')
}