import {
  integers,
  keywords,
  percentages
} from '../../atomic.config.js';

// flex
// ------------------------------------------------------------------

export const flex = {
  props: { 'flex': 'flex'},
  mobileFirstValues: Object.assign(
    keywords({
      'none': 'none'
    }),
    integers([0,1,2,3,4,5])
  )
};

// flex-grow
// ------------------------------------------------------------------

export const flexGrow = {
  props: { 'grow': 'flex-grow'},
  mobileFirstValues: integers([0,1,2,3,4,5])
};

// flex-shrink
// ------------------------------------------------------------------

export const flexShrink = {
  props: { 'shrink': 'flex-shrink'},
  mobileFirstValues: integers([0,1])
};

// flex-basis
// ------------------------------------------------------------------

export const flexBasis = {
  props: { 'basis': 'flex-basis'},
  mobileFirstValues: percentages([10, 20, 25, 33, 34, 35, 40, 50, 60, 66, 75, 80, 100])
};


// flex-direction
// ------------------------------------------------------------------

export const flexDirection = {
  props: { 'flex': 'flex-direction'},
  mobileFirstValues: keywords({
    'column': 'column',
    'column-reverse': 'column-reverse',
    'row': 'row',
    'row-reverse': 'row-reverse'
  })
};

// flex-wrap
// ------------------------------------------------------------------

export const flexWrap = {
  props: { 'flex': 'flex-wrap'},
  mobileFirstValues: keywords({
    'wrap': 'wrap',
    'nowrap': 'nowrap'
  })
};

// align-items
// ------------------------------------------------------------------

export const alignItems = {
  props: { 'items': 'align-items'},
  mobileFirstValues: keywords({
    'start': 'flex-start',
    'end': 'flex-end',
    'center': 'center',
    'baseline': 'baseline',
    'stretch': 'stretch'
  })
};

// align-self
// ------------------------------------------------------------------

export const alignSelf = {
  props: { 'self': 'align-self'},
  mobileFirstValues: keywords({
    'start': 'flex-start',
    'end': 'flex-end',
    'center': 'center',
    'baseline': 'baseline',
    'stretch': 'stretch'
  })
};

// justify-content
// ------------------------------------------------------------------

export const justifyContent = {
  props: { 'justify': 'justify-content'},
  mobileFirstValues: keywords({
    'start': 'flex-start',
    'end': 'flex-end',
    'center': 'center',
    'space-between': 'space-between',
    'space-around': 'space-around'
  })
};

// align-content
// ------------------------------------------------------------------

export const alignContent = {
  props: { 'content': 'align-content'},
  mobileFirstValues: keywords({
    'start': 'flex-start',
    'end': 'flex-end',
    'center': 'center',
    'space-between': 'space-between',
    'space-around': 'space-around',
    'stretch': 'stretch'
  })
};

// order
// ------------------------------------------------------------------

export const flexOrder = {
  props: { 'order': 'order'},
  mobileFirstValues: integers([0,1,2,3,4,5,6,7,8,9,10,9999])
};