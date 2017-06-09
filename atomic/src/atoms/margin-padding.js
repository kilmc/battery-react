import {
  scalers,
  viewportHeights,
  viewportWidths,
  pixels,
  keywords
} from '../../atomic.config.js';

const scalerValues = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];

export const marginPaddingAll = {
  props: {
    m: 'margin',
    p: 'padding',
  },
  subProps: {
    t: ['top'],
    r: ['right'],
    b: ['bottom'],
    l: ['left'],
    x: ['left', 'right'],
    y: ['top', 'bottom'],
  },
  values: pixels([1,2,3,4]),
  mobileFirstValues: scalers(scalerValues)
};

export const margin = {
  props: { m: 'margin' },
  subProps: {
    t: ['top'],
    r: ['right'],
    b: ['bottom'],
    l: ['left'],
    x: ['left', 'right'],
    y: ['top', 'bottom'],
  },
  values: pixels([1,2,3,4], 'negative'),
  mobileFirstValues: Object.assign({},
    scalers(scalerValues, 'negative'),
    keywords({ auto: 'auto' })
  )
}

export const spacingY = {
  props: { p: 'padding' },
  subProps: {
    t: ['top'],
    b: ['bottom'],
    y: ['top','bottom'],
  },
  mobileFirstValues: viewportHeights([0,5,7,10,15,20,25,30,33,40,50,60,66,70,75,80,90,100])
}

export const spacingX = {
  props: { p: 'padding' },
  subProps: {
    l: ['left'],
    r: ['right'],
    x: ['left','right'],
  },
  mobileFirstValues: viewportWidths([0,5,7,10,15,20,25,30,33,40,50,60,66,70,75,80,90,100])
}