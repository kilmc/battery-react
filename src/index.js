import entries from 'object.entries';
Object.entries = entries;

// Helpers
const JSONlog = (x) => console.log(JSON.stringify(x, null, 2));

// Utilities
const compose = (...functions) =>
  functions.reduce((f, g) => (...xs) => f(g(...xs)));

const identity = x => x;

Array.prototype.flatMap = function(fn) {
  return this
    .map(fn)
    .reduce((xs,x) => xs.concat(x),[])
}

// ------------------------------------------------------------------
// Atomic Base Config
// ------------------------------------------------------------------

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
  'purple': '#800080',
  'transparent': 'transparent'
};

// Indicators
// ------------------------------------------------------------------
const negativeValueIndicator = '-'

// Separators
// ------------------------------------------------------------------

const keywordValueSeparator = ''
const integerValueSeparator = '-'
const breakpointSeparator = '-'
const colorValueSeparator = '-'

// Breakpoints
// ------------------------------------------------------------------

const breakpointPrefixOrSuffix = 'suffix';

const breakpointsConfig = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1100
};

// ------------------------------------------------------------------
// Atomic Functions
// ------------------------------------------------------------------

export const remify = (x) => x/baseFontSize;
export const scaler = (x) => x*baseUnit;
export const opacify = (x) => x/10;
export const colorHex = (name) => systemColors[name];

// ------------------------------------------------------------------
// Generators
// ------------------------------------------------------------------

// valueObject
// ------------------------------------------------------------------
// The valueObject is one half of the core information needed to
// generate a full classObject. The following is an example of a
// correctly formatted valueObject.
//
// {
//   valueName: "10p",
//   value: "10%",
//   valueType: "percentage"
// }

// valueObjectFormat
// ------------------------------------------------------------------
// Formats input as a valueObject

export const valueObjectFormat = ({
  name,
  value,
  type = 'none',
  breakpoint = ''
}) => ({
  'valueName': name,
  'value': value,
  'valueType': type,
  'breakpoint': breakpoint
});

// valuesCompile
// ------------------------------------------------------------------
// Iterates over an object and passes each entry to the
// valueObject formatter.

export const valuesCompile = (values, breakpoint, type = 'none') => (
  Object.entries(values).map(([name, value]) =>
    valueObjectFormat({name, value, type, breakpoint}))
);


// ------------------------------------------------------------------
// Value Helpers
// ------------------------------------------------------------------

//
const defaultValue = (str) => {
  return { '': str }
}

//
const integers = (arr, separator = integerValueSeparator) => arr.reduce((xs,x) => {
  xs[`${separator}${x}`] = x
  return xs
},{});

//
const keywords = (obj, separator = keywordValueSeparator) => {
  const newKey = (key) => separator.concat(key)
  return Object.assign({},
    ...Object.keys(obj)
      .map(key => ({[newKey(key)]: obj[key]}))
  )
}


// lengths
// ------------------------------------------------------------------
// Generates an object with length type values. The output of this
// is meant to be used with the valuesCompile function.

export const lengths = ({
  values,
  keySuffix = '',
  valueSuffix = '',
  transform = [identity],
  negative = false,
  separator = ''
}) => {
  return values.reduce((obj, value) => {
    const minus = negative ? '-' : '';
    const negativeIndicator = negative ? negativeValueIndicator : '';

    obj[`${separator}${negativeIndicator}${value}${keySuffix}`]
      = `${minus}${compose(...transform)(value)}${valueSuffix}`;
    return obj;
  },{});
};

export const percentages = (units) => lengths({
  values: units,
  keySuffix: "p",
  valueSuffix: '%'
});

export const viewportHeights = (units) => lengths({
  values: units,
  keySuffix: "vh",
  valueSuffix: 'vh'
});

export const pixels = (units) => lengths({
  values: units,
  transform: [remify],
  keySuffix: "px",
  valueSuffix: 'rem'
});

export const scalers = (units) => lengths({
  values: units,
  transform: [remify, scaler],
  valueSuffix: 'rem'
});


// Color value generator
// ------------------------------------------------------------------
// Converts an array of color names into an object with color names
// and color hex values.

export const colors = (array, separator = colorValueSeparator) => {
  return array.reduce((obj, value) => {
    obj[`${separator}${value}`] = systemColors[value];
    return obj
  },{});
};

// propObject
// ------------------------------------------------------------------
// The propObject is the second half of the core information needed
// to generate a full classObject. The following is an example of a
// correctly formatted propObject.
//
// {
//   propName: "pt",
//   prop: "padding-top"
// }

// propsCompile
// ------------------------------------------------------------------
// Converts a propsConfig object into an array containing objects
// correctly formatted to be merged with a valueObject
//
// Sample input:
// {
//   props: {
//     'm': 'margin'
//   },
//   subProps: {
//     't': ['top'],
//     'r': ['right'],
//     'b': ['bottom'],
//     'l': ['left'],
//   }
// }

export const propsCompile = ({
  props,
  subProps = {},
  propSeparator = '',
  subPropSeparator = '',
  root = true
}) => Object.assign(
  ...Object.entries(props).map(([propName, prop]) => ({
    [prop]: [
      root ? { "propName": propName, "props": [prop] } : {},
      ...Object.entries(subProps).map(([subPropName, subProps]) => ({
        "propName": `${propName}${propSeparator}${subPropName}${subPropSeparator}`,
        "props": subProps.map((sp) => `${prop}-${sp}`)
      }))
    ]
  }))
);

// propsValuesMerge
// ------------------------------------------------------------------
// Merges an array of valueObjects with an array of propObjects and
// forms a classObject

export const propsValuesMerge = (props, values) => Object.assign(
  props.reduce((accum, prop) => (
    accum.concat(values.map(value => (
      { ...prop, ...value }
    )))
  ), [])
);

// breakpointClassFormat
// ------------------------------------------------------------------
// Adds a breakpoint indicator as a suffix or prefix depending on
// the user config.

export const breakpointClassFormat = (baseClass,breakpoint) =>
  breakpointPrefixOrSuffix === 'suffix'
    ? baseClass.concat(breakpointSeparator,breakpoint)
    : breakpoint.concat(breakpointSeparator,baseClass);

// classCompile
// ------------------------------------------------------------------
// Converts a classObject into a complete class. Optionally adds
// a breakpoint indicator.

export const classCompile = ({
  propName,
  props,
  valueName,
  value,
  breakpoint = ''
}) => {
  let baseClassName = `${propName}${valueName}`;
  if (breakpoint !== '') {
    baseClassName = breakpointClassFormat(baseClassName,breakpoint);
  }
  return {
    [`${baseClassName}`]: Object.assign(
      ...props.map((prop) => ({
        [prop]: value
      }))
    )
  }
};

// breakpointsClassCompile
// ------------------------------------------------------------------
// Converts a list of props, values and breakpoints into a set of
// breakpoint specific arrays with breakpoint namespaced classes

export const breakpointsClassCompile = ({
  prop,
  values = [],
  breakpoints
}) => {
  return values === [] ? console.log('NO VALUES') : breakpoints.reduce((obj,bp) => {
    obj[bp] = propsValuesMerge(
      prop,
      valuesCompile(values, bp)
    ).map(classCompile)
    return obj
  }, {})
};

// perScreenBreakpoints
// ------------------------------------------------------------------
// An array of breakpoint identifiers exctracted from the
// breakpointsConfig to be used to compile perScreen media queries

const perScreenBreakpoints = Object.entries(breakpointsConfig)
  .map(([bp, val]) => bp);

// mobileFirstBreakpoints
// ------------------------------------------------------------------
// An array of breakpoint identifiers exctracted from the
// breakpointsConfig to be used to compile mobileFirst media queries

const mobileFirstBreakpoints = perScreenBreakpoints.slice(1);

// atomTree
// ------------------------------------------------------------------
// Wraps up all functionality to process a minimal set of inputs into
// an object containing all classes for a given CSS property

export const atomTree = ({
  props,
  propSeparator = '',
  subProps = {},
  values = [],
  mobileFirstValues = null,
  perScreenValues = null
}) => {
  const propGroups = propsCompile({props, propSeparator, subProps})

  const output = Object.assign(
    ...Object.entries(props).map(([propName, prop]) => ({
      [prop]: {
        "values": {
          all: propsValuesMerge(
                propGroups[prop],
                valuesCompile(Object.assign(values, mobileFirstValues))
                ).map(classCompile)
        },
        "mobileFirstValues": mobileFirstValues === null
          ? []
          : breakpointsClassCompile({
              prop: propGroups[prop],
              values: mobileFirstValues,
              breakpoints: mobileFirstBreakpoints
            }),
        "perScreenValues": perScreenValues === null
          ? []
          : breakpointsClassCompile({
              prop: propGroups[prop],
              values: perScreenValues,
              breakpoints: perScreenBreakpoints
            })
      }
    })
  ))
  // console.log('OUTPUT',output)
  return output
};

// atomList
// ------------------------------------------------------------------
// Generates an object with all classes and their associated
// declarations

export const atomList = ({
  props,
  propSeparator = '',
  subProps = {},
  subPropSeparator = '',
  values = [],
  mobileFirstValues = [],
  perScreenValues = []
}) => {
  const propGroups = propsCompile({props, propSeparator, subProps, subPropSeparator})

  return Object.entries(props).flatMap(([propName, prop]) => (
    propsValuesMerge(
      propGroups[prop],
      valuesCompile(Object.assign(values, mobileFirstValues))
    ).map(classCompile)
    .concat(
      ...mobileFirstBreakpoints.map(bp => (
        propsValuesMerge(
          propGroups[prop],
          valuesCompile(mobileFirstValues, bp)
        ).map(classCompile)
      ))
    ).concat(
      ...perScreenBreakpoints.map(bp => (
        propsValuesMerge(
          propGroups[prop],
          valuesCompile(perScreenValues, bp)
        ).map(classCompile)
      ))
    )
  ));
}

// mobileFirstQueries
// ------------------------------------------------------------------
// Creates an object with mobileFirst media query params

export const mobileFirstQueries = mobileFirstBreakpoints.reduce((accum, bp) => {
  accum[bp] = `(min-width: ${breakpointsConfig[bp]}px)`
  return accum
}, {})

// perScreenQueries
// ------------------------------------------------------------------
// Creates an object with media query arguments per screen

export const perScreenQueries = () => {
  const min = perScreenBreakpoints.slice(1)
  const max = perScreenBreakpoints.slice(0, -1)
  const both = min.filter(n => max.indexOf(n) !== -1);

  const allQueries = Object.keys(breakpointsConfig)
    .reduce((accum, bp) => {
      accum[bp] = ''
      return accum
    }, {});

  min.map(bp => (
    allQueries[bp] = `(min-width: ${breakpointsConfig[bp]}px)`
  ))

  let count = 0;
  max.map(bp => {
    count++
    allQueries[bp] +=
      `(max-width: ${breakpointsConfig[perScreenBreakpoints[count]]-1}px)`
  })

  both.map(bp => {
    allQueries[bp] = allQueries[bp].replace(')(',') and (');
  })

  return allQueries;
};

// printProps
// ------------------------------------------------------------------
// Creates a formatted block of CSS property and value sets as a
// string which can be passed to a another to printClass to finish
// formatting

export const printProps = (classObj, multiple) => {
  return String(Object.entries(classObj[Object.keys(classObj)]).map(
    ([prop, value]) => (
      multiple ? `\t${prop}: ${value};\n` : `${prop}: ${value}`
    )
  )).replace(',','').trim()
}

// printClass
// ------------------------------------------------------------------
// Creates a formatted block of classes in a string which can be
// passed to a another function to render it into a CSS file.

export const printClass = (classObj) => {
  const multiple = Object.keys(classObj[Object.keys(classObj)]).length > 1;
  const className = Object.keys(classObj)

  let renderedClass;
  if (multiple) {
    renderedClass = `.${className} {\n\t${printProps(classObj, multiple)}\n}\n`
  } else {
    renderedClass = `.${className} { ${printProps(classObj, multiple)} }`
  }
  return renderedClass
}

// printClasses
// ------------------------------------------------------------------
// Run through a
export const printClasses = (allClasses) => {
  return String(allClasses.map(classObj => printClass(classObj))).replace(/,/g,'\n')
}

// printBreakpoint
// ------------------------------------------------------------------

export const printBreakpoint = ([bp, classObjs], mediaQueryObj) => {
  return `@media ${mediaQueryObj[bp]} {\n${printClasses(classObjs)}\n}\n`
}

// printMobileFirst
// ------------------------------------------------------------------

export const printMobileFirst = (obj) => {
  return String(
    Object.entries(obj)
      .map(([bp,classObjs]) => printBreakpoint([bp,classObjs], mobileFirstQueries))
    )
}

// printPerScreen
// ------------------------------------------------------------------

export const printPerScreen = (obj) => {
  return String(
    Object.entries(obj)
      .map(([bp,cxs]) => printBreakpoint([bp,cxs], perScreenQueries()))
  )
}

// printAtom
// ------------------------------------------------------------------

// export const printAtom = (obj) => {
//   const everyClass = Object.keys(obj).map(propGroup => {
//     return printClasses(obj[propGroup].values.all).concat('\n')
//       .concat('\n',printMobileFirst(obj[propGroup].mobileFirstValues))
//       .concat('\n',printPerScreen(obj[propGroup].perScreenValues));
//   })

//   return String(everyClass).replace(/,@/g,'\n@')
// }

export const printAtom = (obj) => {
  const allValues = Object.keys(obj).map(propGroup => {
    return printClasses(obj[propGroup].values.all)
  });

  const allMobileFirst = Object.keys(obj).map(propGroup =>
    obj[propGroup].mobileFirstValues) === [[]]
    ? ''
    : Object.keys(obj)
      .map(propGroup => printMobileFirst(obj[propGroup].mobileFirstValues)
  );

  const allPerScreen = Object.keys(obj).map(propGroup =>
    obj[propGroup].perScreenValues) === [[]]
    ? ''
    : Object.keys(obj)
      .map(propGroup => printPerScreen(obj[propGroup].perScreenValues)
  );

  return String(
    allValues
    .concat(allMobileFirst)
    .concat(allPerScreen)
  ).replace(/,@/g,'\n@')
}

// ------------------------------------------------------------------
// Test Compile
// ------------------------------------------------------------------



const compile = (atoms) => {
  const allAtoms = Object.keys(atoms).map(atom => atoms[atom]);
  const atomicJSON = Object.assign({ }, ...allAtoms.flatMap(atomList));
  const atomicCSS = allAtoms.flatMap(atomTree);

  return { css: atomicCSS, JSON: atomicJSON }
}

export const atomic = compile({
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
});