import entries from 'object.entries';
// import fs from 'fs';

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

const mobileOnlyBreakpointName = ['xs'];
const mobileFirstConfig = {
  sm: '600px',
  md: '900px',
  lg: '1100px'
};

// Per Breakpoint
// bp0: (max-width: bp1 - 1px)
// bp1: (min-width: bp1) and (max-width: bp2 - 1px)
// bp2: (min-width: bp2) and (max-width: bp3 - 1px)
// bp3: (min-width: bp3)


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

const valueObjectFormat = ({
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

const valuesCompile = (values, breakpoint, type = 'none') => (
  Object.entries(values).map(([name, value]) =>
    valueObjectFormat({name, value, type, breakpoint}))
);

// lengths
// ------------------------------------------------------------------
// Generates an object with length type values. The output of this
// is meant to be used with the valuesCompile function.

const lengths = ({
  values,
  keySuffix = '',
  valueSuffix = '',
  transform = [identity],
  negative = false
}) => {
  return values.reduce((obj, value) => {
    const minus = negative ? '-' : '';

    obj[`${minus}${value}${keySuffix}`] = `${minus}${compose(...transform)(value)}${valueSuffix}`;
    return obj;
  },{});
};

// Color value generator
// ------------------------------------------------------------------
// Converts an array of color names into an object with color names
// and color hex values.

const colors = (array) => {
  return valuesCompile(array.reduce((obj, value) => {
    obj[value] = systemColors[value];
    return obj
  },{}));
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

const breakpointClassFormat = (baseClass,breakpoint) =>
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


// propGroupCompile
// ------------------------------------------------------------------
// Wraps up all functionality to process a minimal set of inputs into
// an object containing all classes for a given CSS property

export const propGroupCompile = ({
  props,
  propSeparator = '',
  subProps = {},
  values = [],
  mobileFirstValues = [],
  perBreakpointValues = []
}) => {
  const propGroups = propsCompile({props, propSeparator, subProps})

  return Object.assign(
    ...Object.entries(props).map(([propName, prop]) => ({
      [prop]: {
        "values": propsValuesMerge(
          propGroups[prop],
          valuesCompile(Object.assign(values, mobileFirstValues))
        ).map(classCompile),
        "mobileFirstValues": breakpointsClassCompile({
          prop: propGroups[prop],
          values: mobileFirstValues,
          breakpoints: Object.keys(mobileFirstConfig)
        }),
        "perBreakpointValues": breakpointsClassCompile({
          prop: propGroups[prop],
          values: perBreakpointValues,
          breakpoints: mobileOnlyBreakpointName.concat(Object.keys(mobileFirstConfig))
        })
      }
    })
  ))
};

// mobileFirstBreakpoints
// ------------------------------------------------------------------
// Creates an object with mobileFirst media query params

const mobileFirstBreakpoints = (obj) => Object.assign(
  ...Object.entries(obj).map(([bp, value]) => ({
    [bp]: `(min-width: ${value})`
  }))
);

// printClass
// ------------------------------------------------------------------
// Creates a formatted block of classes in a string which can be
// passed to a another function to render it into a CSS file.

const preCompile = propsCompile({
  props: {
    'p': 'padding'
  },
  subProps: {
    't': ['top'],
    'y': ['top','bottom']
  }
})

const classTest = propsValuesMerge(
  preCompile['padding'],
  valuesCompile(lengths({
    values: [1,2,3,4],
    transform: [remify],
    keySuffix: "px",
    valueSuffix: 'rem'
  }))
).map(classCompile);



const printClass = (all) => {
  // return all.map(className => {
  //   Object.entries(all[className]).map(
  //       ([prop, value]) =>
  //         console.log(`${className} { ${prop}: ${value} }`)
  //     )
  //   }
  // )
  return all.map(x => (
    Object.entries(x[Object.keys(x)])
      .map(([prop, value]) => (
        `${prop}: ${value}`
      ))
  ))
};

JSONlog(printClass(classTest))

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

const percentageUnits = lengths({
  values: percentageValues,
  keySuffix: "p",
  valueSuffix: '%'
});

const viewportHeightUnits = lengths({
  values: percentageValues,
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





// CSS output
// // values
// .table { display: table }
//
// // responsiveValues
// .block { display: block }
// .inline { display: inline }
// .inline-block { display: inline-block }
// .flex { display: flex }
//
// @media screen and (min-width: 600px) {
//   .block-sm { display: block }
//   .inline-sm { display: inline }
//   .inline-block-sm { display: inline-block }
//   .flex-sm { display: flex }
// }
//
// @media screen and (min-width: 900px) {
//   .block-md { display: block }
//   .inline-md { display: inline }
//   .inline-block-md { display: inline-block }
//   .flex-md { display: flex }
// }
//
// @media screen and (min-width: 1200px) {
//   .block-lg { display: block }
//   .inline-lg { display: inline }
//   .inline-block-lg { display: inline-block }
//   .flex-lg { display: flex }
// }
//
// // perBreakpointValues
// @media screen and (max-width: 600px) {
//   .hide-xs { display: none }
// };
//
// @media screen and (min-width: 600px) and (max-width: 900px) {
//   .hide-sm { display: none }
// };
//
// @media screen and (min-width: 900px) and (max-width: 1200px) {
//   .hide-md { display: none }
// };
//
// @media screen and (min-width: 1200px) {
//   .hide-lg { display: none }
// };

// const borderConfig = {
//   props: {
//     'border': 'border'
//   },
//   propSeparator: '-',
//   subProps: {
//     'top': ['top'],
//     'right': ['right'],
//     'bottom': ['bottom'],
//     'left': ['left']
//   },
//   responsiveValues: {
//     '': `0.1rem solid ${colorHex('navy')}`
//   }
// }

// .border { border: 0.1rem solid #000080 }
// .border-top { border-top: 0.1rem solid #000080 }
// .border-right { border-right: 0.1rem solid #000080 }
// .border-bottom { border-bottom: 0.1rem solid #000080 }
// .border-left { border-left: 0.1rem solid #000080 }

// @media screen and (min-width: 600px) {
//   .border-sm { border: 0.1rem solid #000080 }
//   .border-top-sm { border-top: 0.1rem solid #000080 }
//   .border-right-sm { border-right: 0.1rem solid #000080 }
//   .border-bottom-sm { border-bottom: 0.1rem solid #000080 }
//   .border-left-sm { border-left: 0.1rem solid #000080 }
// }

// @media screen and (min-width: 900px) {
//   .border-md { border: 0.1rem solid #000080 }
//   .border-top-md { border-top: 0.1rem solid #000080 }
//   .border-right-md { border-right: 0.1rem solid #000080 }
//   .border-bottom-md { border-bottom: 0.1rem solid #000080 }
//   .border-left-md { border-left: 0.1rem solid #000080 }
// }

// @media screen and (min-width: 1200px) {
//   .border-lg { border: 0.1rem solid #000080 }
//   .border-top-lg { border-top: 0.1rem solid #000080 }
//   .border-right-lg { border-right: 0.1rem solid #000080 }
//   .border-bottom-lg { border-bottom: 0.1rem solid #000080 }
//   .border-left-lg { border-left: 0.1rem solid #000080 }
// }
