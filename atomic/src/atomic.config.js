import battery from './battery';

battery.compile({
  config: {
    baseFontSize: 10,
    baseUnit: 6,
    systemColors: {
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
    },
    breakpointPrefixOrSuffix: 'suffix',
    breakpointSeparator: '-',
    negativeValueIndicator: '-',
    breakpointsConfig: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1100
    }
  },
  atoms: {

    // background-size
    backgroundSize: {
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
        percentages([10, 20, 25, 33, 34, 35, 40, 50, 60, 66, 75, 80, 100])
      )
    },

    // background-image
    backgroundImage: {
      props: {
        'bg': 'background-image'
      },
      mobileFirstValues: { 'none': 'none !important' }
    },

    // Border Radius
    // ----------------------------------
    borderRadius: {
      props: {
        '': 'border'
      },
      subPropsPosition: 'middle',
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
      values: keyword({
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
    },

    // Border Color
    borderColors: {
      props: {
        'border': 'border-color'
      },
      values: colors(['grey','green','red'])
    },

    // Border Wi,h
    borderWidths: {
      props: {
        'border': 'border-width'
      },
      values: keywords({
        'regular': '0.1rem',
        'medium': '0.2rem',
        'thick': '0.3rem'
      })
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
      props: {
        '': 'clear'
      },
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
      values: colors(['grey', 'blue', 'orange'],''),
      perScreenValues: keywords({ 'transparent': 'transparent' },'')
    },
    backgroundColor: {
      props: { 'bg': 'background-color' },
      values: colors(['grey', 'blue', 'orange']),
      perScreenValues: keywords({ 'transparent': 'transparent' })
    },
    fillColor: {
      props: { 'fill': 'fill' },
      values: colors(['grey', 'blue', 'orange']),
      perScreenValues: keywords({ 'transparent': 'transparent' })
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
    }
  }
})