const baseFontSize = 10;
const baseUnit = 6;

const systemColors = {
  'white': '#FFFFFF',
  'silver': '#C0C0C0',
  'gray': '#808080',
  'black': '#000000',
  'red': '#FF0000',
  'maroon': '#800000',
  'yellow': '#FFFF00',
  'olive': '#808000',
  'lime': '#00FF00',
  'green': '#008000',
  'aqua': '#00FFFF',
  'teal': '#008080',
  'blue': '#0000FF',
  'navy': '#000080',
  'fuchsia': '#FF00FF',
  'purple': '#800080'
};

const breakpointPrefixOrSuffix = 'suffix';
const breakpointSeparator = '-'
const negativeValueIndicator = '-'

const breakpointsConfig = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1100
};


// ------------------------------------------------------------------
// Config
// ------------------------------------------------------------------

// Background
// ------------------------------------------------------------------
const backgroundSize = {
  props: {
    'bg': 'background-size'
  },
  values: Object.assign({},
    keyword({
      'cover': 'cover',
      'contain': 'contain',
      'full-height': 'auto 100%',
      'full-width': '100% auto'
    }),
    percentageValues([10, 20, 25, 33, 34, 35, 40, 50, 60, 66, 75, 80, 100])
  )
};

const backgroundImage = {
  props: {
    'bg': 'background-image'
  },
  mobileFirstValues: { 'none': 'none !important' }
};

// Border Radius
// ------------------------------------------------------------------

const borderRadius = {
  props: {
    '': 'border-radius'
  },
  subPropsPosition: 'middle',
  subProps: {
    'top': ['top-left','top-right'],
    'right': ['top-right','bottom-right'],
    'bottom': ['bottom-left','bottom-right'],
    'left': ['top-left','bottom-left'],
    'top-right': ['top-right'],
    'bottom-right': ['bottom-right'],
    'top-left': ['top-left'],
    'bottom-left': ['bottom-left']
  },
  values: keyword({
    'no-radius': '0',
    'rounded': '2px',
    'rounded-medium': '4px',
    'rounded-large': '6px',
    'pill': '200px',
    'circle': '100%'
  })
};

// Borders
// ------------------------------------------------------------------

const border = {
  props: {
    'border': 'border'
  },
  subProps: {
    'top': 'top',
    'right': 'right',
    'bottom': 'bottom',
    'left': 'left',
  },
  mobileFirstValues: Object.assign({},
    defaultValue({ '': '0.1rem solid' }),
    keywords({ 'none': 'none !important' })
  )
};

// Border Color
const borderColors = {
  props: {
    'border': 'border-color'
  },
  values: colors(['grey','green','red'])
};

// Border Width
const borderWidths = {
  props: {
    'border': 'border-width'
  },
  values: keywords({
    'regular': '0.1rem',
    'medium': '0.2rem',
    'thick': '0.3rem'
  })
};

// Box Sizing
// ------------------------------------------------------------------

const boxSizing = {
  props: { '': 'box-sizing' },
  values: keywords({ 'box-sizing': 'box-sizing' })
};

// Clear
// ------------------------------------------------------------------

const clear = {
  props: {
    '': 'clear'
  },
  values: keywords({
    'left': 'left',
    'right': 'right',
    'both': 'both'
  })
};

// Colors
// ------------------------------------------------------------------

const textColor = {
  props: { '': 'color' },
  values: colors(['grey', 'blue', 'orange'],''),
  perScreenValues: keywords({ 'transparent': 'transparent' },'')
};

const backgroundColor = {
  props: { 'bg': 'background-color' },
  values: colors(['grey', 'blue', 'orange']),
  perScreenValues: keywords({ 'transparent': 'transparent' })
};

const fillColor = {
  props: { 'fill': 'fill' },
  values: colors(['grey', 'blue', 'orange']),
  perScreenValues: keywords({ 'transparent': 'transparent' })
};


// Cursors
// ------------------------------------------------------------------

const cursor = {
  props: { '': 'cursor' },
  values: keywords({
    'cursor': 'pointer',
    'cursor': 'move'
  })
};

const pointerEvents = {
  props: { '': 'pointer-events' },
  values: keywords({
    'click-through': 'none',
    'click-on': 'auto'
  })
};

// Display
// ------------------------------------------------------------------

const display = {
  props: { '': 'display' },
  mobileFirstValues: keywords({
    'block': 'block',
    'display-inline': 'inline',
    'inline-block': 'inline-block',
    'flex': 'flex',
    'inline-flex': 'inline-flex'
  })
};

// ------------------------------------------------------------------
// Flex
// ------------------------------------------------------------------

// Flex
// ------------------------------------------------------------------

const flex = {
  props: { 'flex': 'flex'},
  mobileFirstValues: Object.assign(
    keywords({
      'none': 'none'
    }),
    integers([0,1,2,3,4,5])
  )
};

const flexGrow = {
  props: { 'grow': 'flex-grow'},
  mobileFirstValues: integers([0,1,2,3,4,5])
};

const flexShrink = {
  props: { 'shrink': 'flex-shrink'},
  mobileFirstValues: integers([0,1])
};