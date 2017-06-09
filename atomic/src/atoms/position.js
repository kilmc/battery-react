import {
  keywords,
  scalers,
  pixels
} from '../../atomic.config.js';

export const position = {
  props: { '': 'position' },
  mobileFirstValues: keywords({
    'static': 'static',
    'relative': 'relative',
    'absolute': 'absolute',
    'fixed': 'fixed'
  }, '')
};

export const positionDirections = {
  props: {
    t: 'top',
    r: 'right',
    b: 'bottom',
    l: 'left',
  },
  values: pixels([1,2,3,4]),
  mobileFirstValues: Object.assign({},
    scalers([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,24,26]),
    scalers([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,24,26],'negative'
    ),
    keywords({ auto: 'auto' })
  )
};