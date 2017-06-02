import {
  colors,
  keywords
} from './atomic.config.js';

export const textColor = {
  props: { '': 'color' },
  values: colors(['gray', 'blue', 'orange'],''),
  perScreenValues: keywords({ 'transparent': 'transparent' },'')
}