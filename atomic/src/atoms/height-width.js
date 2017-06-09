import {
  keywords,
  scalers,
  percentages,
  pixels,
  viewportHeights,
  viewportWidths
} from '../../atomic.config.js';

export const height = {
  props: { h: 'height' },
  values: Object.assign({},
    percentages([10,20,25,33,34,35,40,50,60,66,75,80,90,100]),
    pixels([1,2,3,4]),
    viewportHeights([10,20,25,33,34,35,40,50,60,66,75,80,90,100])
  ),
  mobileFirstValues: Object.assign({},
    keywords({ auto: 'auto' }),
    scalers([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,25,30,37,45,50])
  )
};

export const minHeight = {
  props: { mh: 'min-height' },
  values: viewportHeights([100])
};

export const width = {
  props: { w: 'width' },
  values: Object.assign({},
    pixels([1,2,3,4]),
    viewportWidths([10,20,25,33,34,35,40,50,60,66,75,80,90,100])
  ),
  mobileFirstValues: Object.assign({},
    keywords({ auto: 'auto' }),
    percentages([10,20,25,33,34,35,40,50,60,66,75,80,90,100]),
    scalers([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,25,30,37,45,50])
  )
};

export const maxWidth = {
  props: { mw: 'max-width' },
  values: Object.assign({},
    percentages([10,20,25,33,34,35,40,50,60,66,75,80,90,100]),
    keywords({ none: 'none' })
  )
}