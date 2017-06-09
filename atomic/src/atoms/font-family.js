import {
  keywords
} from '../../atomic.config.js';

export const fontFamily = {
  props: { 'type': 'font-family' },
  values: keywords({
    'helvetica': `"Helvetica Neue", Helvetica, Arial, "Liberation Sans", FreeSans, sans-serif`,
    'tiempos': `"Tiempos", Georgia, serif`,
    'mono': ` Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;`
  })
};

