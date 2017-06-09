import {
  keywords,
  integers
} from '../../atomic.config.js';

export const zIndex = {
  props: { 'z': 'z-index' },
  values: Object.assign({},
    keywords({
      'behind': '-1',
      'front': '9999',
    }),
    integers(0,1,2,3,4,5,6,7,8,9,10,1000,5000,9000)
  )
};