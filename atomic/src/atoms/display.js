import { keywords } from '../../atomic.config.js';

export const display = {
  props: { '': 'display' },
  mobileFirstValues: keywords(
    {
      block: 'block',
      'display-inline': 'inline',
      'inline-block': 'inline-block',
      flex: 'flex',
      'inline-flex': 'inline-flex'
    },
    ''
  )
};
