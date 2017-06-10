import {
  opacities
} from '../../atomic.config.js';

export const opacity = {
  props: { 'oppp': 'opacity' },
  values: opacities([0, 1, 3, 6, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100])
}