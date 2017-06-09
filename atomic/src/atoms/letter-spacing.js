import {
  keywords
} from '../../atomic.config.js';

export const letterSpacing = {
  props: { 'ls': 'letter-spacing' },
  mobileFirstValues: keywords({
    '3': '0.3rem',
    'xtight': '-0.05rem',
    'loose': '0.1rem',
    'xloose': '0.15rem'
  })
}

