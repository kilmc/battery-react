import entries from 'object.entries';
import fs from 'fs';
// var postcss = require('postcss');
// var stylefmt = require('stylefmt');

Object.entries = entries;

// Helpers
const JSONlog = (x) => console.log(JSON.stringify(x, null, 2));

// Utilities
const compose = (...functions) =>
  functions.reduce((f, g) => (...xs) => f(g(...xs)));
const identity = x => x;

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
// Atomic Functions
// ------------------------------------------------------------------

const remify = (x) => x/baseFontSize;
const scaler = (x) => x*baseUnit;
const opacify = (x) => x/10;
const colorHex = (name) => systemColors[name];

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

// lengths
// ------------------------------------------------------------------
// Generates an object with length type values. The output of this
// is meant to be used with the valuesCompile function.

export const lengths = ({
  values,
  keySuffix = '',
  valueSuffix = '',
  transform = [identity],
  negative = false
}) => {
  return values.reduce((obj, value) => {
    const minus = negative ? '-' : '';
    const negativeIndicator = negative ? negativeValueIndicator : '';

    obj[`${negativeIndicator}${value}${keySuffix}`] = `${minus}${compose(...transform)(value)}${valueSuffix}`;
    return obj;
  },{});
};

// Color value generator
// ------------------------------------------------------------------
// Converts an array of color names into an object with color names
// and color hex values.

export const colors = (array) => {
  return array.reduce((obj, value) => {
    obj[value] = systemColors[value];
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
  root = true
}) => Object.assign(
  ...Object.entries(props).map(([propName, prop]) => ({
    [prop]: [
      root ? { "propName": propName, "props": [prop] } : {},
      ...Object.entries(subProps).map(([subPropName, subProps]) => ({
        "propName": `${propName}${propSeparator}${subPropName}`,
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
  values,
  breakpoints
}) => {
  return breakpoints.reduce((obj,bp) => {
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

// atomCompile
// ------------------------------------------------------------------
// Wraps up all functionality to process a minimal set of inputs into
// an object containing all classes for a given CSS property

export const atomCompile = ({
  props,
  propSeparator = '',
  subProps = {},
  values = [],
  mobileFirstValues = [],
  perScreenValues = []
}) => {
  const propGroups = propsCompile({props, propSeparator, subProps})

  return Object.assign(
    ...Object.entries(props).map(([propName, prop]) => ({
      [prop]: {
        "values": propsValuesMerge(
          propGroups[prop],
          valuesCompile(Object.assign(values, mobileFirstValues))
        ).map(classCompile),
        "mobileFirstValues": mobileFirstValues === [] ? '' : breakpointsClassCompile({
          prop: propGroups[prop],
          values: mobileFirstValues,
          breakpoints: mobileFirstBreakpoints
        }),
        "perScreenValues": perScreenValues === [] ? '' :  breakpointsClassCompile({
          prop: propGroups[prop],
          values: perScreenValues,
          breakpoints: perScreenBreakpoints
        })
      }
    })
  ))
};

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

const perScreenQueries = () => {
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
  return (
`@media ${mediaQueryObj[bp]} {\n${printClasses(classObjs)}\n}\n`)}

// printMobileFirst
// ------------------------------------------------------------------

export const printMobileFirst = (obj) => {
  return String(
    Object.entries(obj)
      .map(([bp,classObjs]) => printBreakpoint([bp,classObjs], mobileFirstQueries))
    )
    // .replace(/,/g,'\n')
    // .replace(/^\./gm,'  .')
}

// printPerScreen
// ------------------------------------------------------------------

export const printPerScreen = (obj) => {
  return String(
    Object.entries(obj)
      .map(([bp,cxs]) => printBreakpoint([bp,cxs], perScreenQueries()))
  ).replace(/,/g,'\n')
  // .replace(/^\./gm,'  .')
    // TODO: Replacing all commas with \n will lead to bus in CSS
}

// printAtom
// ------------------------------------------------------------------

export const printAtom = (obj) => {
  const everyClass = Object.keys(obj).map(propGroup => {
    return printClasses(obj[propGroup].values).concat('\n')
      .concat('\n',printMobileFirst(obj[propGroup].mobileFirstValues))
      .concat('\n',printPerScreen(obj[propGroup].perScreenValues));
  })

  return String(everyClass).replace(/,@/g,'\n@')
}

// ------------------------------------------------------------------
// Values
// ------------------------------------------------------------------


const percentageValues = [
  0, 5, 10, 15, 20, 25, 30, 33, 40, 50,
  60, 66, 70, 80, 85, 90, 95, 100
];
const scaleMultipliers = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  11, 12, 13, 14, 15, 16, 17, 18, 19, 20
];
const pixelValues = [1, 2, 3, 4];

const percentageUnits = (units) => lengths({
  values: units,
  keySuffix: "p",
  valueSuffix: '%'
});

const viewportHeightUnits = (units) => lengths({
  values: units,
  keySuffix: "vh",
  valueSuffix: 'vh'
});

export const pixelUnits = lengths({
  values: pixelValues,
  transform: [remify],
  keySuffix: "px",
  valueSuffix: 'rem'
});

export const scaleUnits = lengths({
  values: scaleMultipliers,
  transform: [remify, scaler],
  valueSuffix: 'rem'
});

const textColors = colors([
  'aqua',
  'teal',
  'blue',
  'navy'
]);

const backgroundColors = colors([
  'white',
  'silver',
  'gray',
  'black',
  'red'
]);

const displayAtom = atomCompile({
  props: {
    '': 'display'
  },
  values: {
    'table': 'table'
  },
  mobileFirstValues: {
    'block': 'block',
    'inline': 'inline',
    'inline-block': 'inline-block',
    'flex': 'flex'
  },
  perScreenValues: {
    'hide': 'none'
  },
});





const paddingAtom = atomCompile({
  props: {
    'p': 'padding'
  },
  subProps: {
    't': ['top'],
    'r': ['right'],
    'b': ['bottom'],
    'l': ['left'],
    'x': ['right', 'left'],
    'y': ['top', 'bottom']
  },
  mobileFirstValues: lengths({
    values: [1,2,3,4],
    transform: [remify, scaler],
    valueSuffix: 'rem'
  })
});






// JSONlog(displayAtom);
// JSONlog(paddingAtom);
// console.log(printAtom(paddingAtom));
const padding = printAtom(displayAtom);

// fs.writeFile("./unprocessed-atomic.css", printAtom(paddingAtom));

// var css = fs.readFileSync('./unprocessed-atomic.css', 'utf-8');

// postcss([stylefmt])
//   .process(css, { from: 'unprocessed-atomic.css' })
//   .then(function (result) { result; });