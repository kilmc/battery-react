import {
  scalers,
  keywords
} from '../../atomic.config.js';

export const lineHeight = {
  props: { 'lh': 'line-height' },
  mobileFirstValues: Object.assign({},
    keywords({ 1: '1'}),
    scalers([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,22])
  )
}
