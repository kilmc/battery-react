import {
  defaultValue,
  keywords
} from '../../atomic.config.js';

export const resize = {
  props: { 'resize': 'resize' },
  values: Object.assign({},
    defaultValue('both'),
    keywords({
      'none': 'none',
      'x': 'horizontal',
      'y': 'vertical'
    })
  )
};

