import {
  compile,
  remify,
  scaler,
  colorHex,
  percentages,
  viewportHeights,
  pixels,
  scalers,
  colors,
  integers,
  keywords,
  defaultValue
} from 'atomic.config';


export const compiled = compile({
// compile({
  // background-size
  backgroundSize: {
    props: { 'bg': 'background-size' },
    values: Object.assign({},
      keywords({
        'cover': 'cover',
        'contain': 'contain',
        'full-height': 'auto 100%',
        'full-width': '100% auto'
      },'-'),
      percentages([10, 20, 25, 33, 34, 35, 40, 50, 60, 66, 75, 80, 100])
    )
  },

  // background-image
  backgroundImage: {
    props: { 'bg': 'background-image' },
    mobileFirstValues: keywords({'none': 'none !important'},'-')
  },

  // Border Radius
  // ----------------------------------
  borderRadius: {
    props: { '': 'border' },
    subProps: {
      'top': ['top-left-radius','top-right-radius'],
      'right': ['top-right-radius','bottom-right-radius'],
      'bottom': ['bottom-left-radius','bottom-right-radius'],
      'left': ['top-left-radius','bottom-left-radius'],
      'top-right': ['top-right-radius'],
      'bottom-right': ['bottom-right-radius'],
      'top-left': ['top-left-radius'],
      'bottom-left': ['bottom-left-radius']
    },
    subPropSeparator: '-',
    values: keywords({
      'no-radius': '0',
      'rounded': '2px',
      'rounded-medium': '4px',
      'rounded-large': '6px',
      'pill': '200px',
      'circle': '100%'
    })
  },

  // Borders
  // ---------------------------------
  border: {
    props: { 'border': 'border' },
    propSeparator: '-',
    subProps: {
      'top': ['top'],
      'right': ['right'],
      'bottom': ['bottom'],
      'left': ['left'],
    },
    mobileFirstValues: Object.assign({},
      defaultValue('0.1rem solid #fff000'),
      keywords({ 'none': 'none !important' }, '-')
    )
  },

  // Border Color
  borderColors: {
    props: { 'border': 'border-color' },
    values: colors(['gray','green','red'], '')
  },

  // Border Wi,h
  borderWidths: {
    props: { 'border': 'border-width' },
    values: keywords({
      'regular': '0.1rem',
      'medium': '0.2rem',
      'thick': '0.3rem'
    }, '-')
  },

  // Box Sizing
  // ---------------------------------
  boxSizing: {
    props: { '': 'box-sizing' },
    values: keywords({ 'box-sizing': 'box-sizing' })
  },

  // Clear
  // ---------------------------------
  clear: {
    props: { '': 'clear' },
    values: keywords({
      'left': 'left',
      'right': 'right',
      'both': 'both'
    })
  },

  // Colors
  // ---------------------------------
  textColor: {
    props: { '': 'color' },
    values: colors(['gray', 'blue', 'orange'],''),
    perScreenValues: keywords({ 'transparent': 'transparent' },'')
  },

  backgroundColor: {
    props: { 'bg': 'background-color' },
    values: colors(['gray', 'blue', 'orange']),
    perScreenValues: colors(['transparent'])
  },

  fillColor: {
    props: { 'fill': 'fill' },
    values: colors(['gray', 'blue', 'orange']),
    perScreenValues: colors(['transparent'])
  },


  // Cursors
  // ---------------------------------
  cursor: {
    props: { '': 'cursor' },
    values: keywords({
      'cursor': 'pointer',
      'cursor': 'move'
    })
  },
  pointerEvents: {
    props: { '': 'pointer-events' },
    values: keywords({
      'click-through': 'none',
      'click-on': 'auto'
    })
  },

  // Display
  // ---------------------------------
  display: {
    props: { '': 'display' },
    mobileFirstValues: keywords({
      'block': 'block',
      'display-inline': 'inline',
      'inline-block': 'inline-block',
      'flex': 'flex',
      'inline-flex': 'inline-flex'
    })
  },

  // Flex
  // ----------------------------------
  flex: {
    props: { 'flex': 'flex'},
    mobileFirstValues: Object.assign(
      keywords({
        'none': 'none'
      }),
      integers([0,1,2,3,4,5])
    )
  },

  flexGrow: {
    props: { 'grow': 'flex-grow'},
    mobileFirstValues: integers([0,1,2,3,4,5])
  },

  flexShrink: {
    props: { 'shrink': 'flex-shrink'},
    mobileFirstValues: integers([0,1])
  },

  // Flex Direction
  // ------------------------------------------------------------------
  flexDirection: {
    props: { 'flex': 'flex-direction'},
    mobileFirstValues: keywords({
      'column': 'column',
      'column-reverse': 'column-reverse',
      'row': 'row',
      'row-reverse': 'row-reverse'
    })
  },

  // Flex Wrap
  // ------------------------------------------------------------------
  flexWrap: {
    props: { 'flex': 'flex-wrap'},
    mobileFirstValues: keywords({
      'wrap': 'wrap',
      'nowrap': 'nowrap'
    })
  },

  // Align Items
  // ------------------------------------------------------------------
  alignItems: {
    props: { 'items': 'align-items'},
    mobileFirstValues: keywords({
      'start': 'flex-start',
      'end': 'flex-end',
      'center': 'center',
      'baseline': 'baseline',
      'stretch': 'stretch'
    })
  },

  // Align Self
  // ------------------------------------------------------------------
  alignSelf: {
    props: { 'self': 'align-self'},
    mobileFirstValues: keywords({
      'start': 'flex-start',
      'end': 'flex-end',
      'center': 'center',
      'baseline': 'baseline',
      'stretch': 'stretch'
    })
  },

  // Justify Content
  // ------------------------------------------------------------------
  justifyContent: {
    props: { 'justify': 'justify-content'},
    mobileFirstValues: keywords({
      'start': 'flex-start',
      'end': 'flex-end',
      'center': 'center',
      'space-between': 'space-between',
      'space-around': 'space-around'
    })
  },

  // Align Content
  // ------------------------------------------------------------------
  alignContent: {
    props: { 'content': 'align-content'},
    mobileFirstValues: keywords({
      'start': 'flex-start',
      'end': 'flex-end',
      'center': 'center',
      'space-between': 'space-between',
      'space-around': 'space-around',
      'stretch': 'stretch'
    })
  },

  // Order
  // ------------------------------------------------------------------
  flexOrder: {
    props: { 'order': 'order'},
    mobileFirstValues: integers([0,1,2,3,4,5,6,7,8,9,10,9999])
  },

  // Float
  // ---------------------------------
  float: {
    props: { '': 'float' },
    mobileFirstValues: keywords({
      'left': 'left',
      'right': 'right',
      'float-none': 'none'
    })
  },

  // Font Weight
  // ---------------------------------
  fontWeight: {
    props: { '': 'font-weight' },
    mobileFirstValues: keywords({
      'light': '200',
      'normal': '400',
      'medium': '500',
      'bold': '700'
    })
  },
})