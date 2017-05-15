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

const mobileOnlyBreakpintName = 'xs';
const mobileFirstConfig = {
  sm: '600px',
  md: '900px',
  lg: '1100px'
};


// Mobile first
// bp1: (min-width: bp1)
// bp2: (min-width: bp2)
// bp3: (min-width: bp3)

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
const colorHex = (name) => systemColors[name];
const opacify = (x) => x/10;

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

// Formats input as a valueObject
// Working: 100%
const valueObjectFormat = (name, value, type = 'none') => ({
  valueName: name,
  value: value,
  valueType: type
});

// Iterates over an object and passes each entry to the
// valueObject formatter.
// Working: 100%
const valuesCompile = (obj, type = 'none') => (
  Object.entries(obj).map(([name, value]) =>
    valueObjectFormat(name, value))
);

// lengths
// ------------------------------------------------------------------
// Generates an object with length type values. The output of this
// is meant to be used with the valuesCompile function.
// Working: 100%

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
// Consumed by: valuesCompile
// Working: 100%

const colors = (array) => {
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
// Working: 100%

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
// Merges an arrary of valueObjects with an array of propObjects
// Working: 75%

export const propsValuesMerge = (props, values) =>
  Object.keys(props).map(prop => (
    [props[prop]]
      .concat([values])
      .reduce((accum, items) =>
        accum.map(
          x => items.map(
            y => x.concat(y)
          )
        ).reduce((a,b) => a.concat(b)), [[]]
      )
  )
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
// Converst a classObject into a complete class. Optionally adds
// a breakpoint indicator.

export const classCompile = ({
  propName,
  props,
  valueName,
  value,
  breakpoint = ''
}) => {
  const baseClassName = `${propName}${valueName}`;
  let fullClassName = baseClassName;
  if (breakpoint !== '') {
    fullClassName = breakpointClassFormat(baseClassName,breakpoint);
  }
  return {
    [`.${fullClassName}`]: Object.assign(
      ...props.map((prop) => ({
        [prop]: value
      }))
    )
  }
};

// mobileFirstBreakpoints
// ------------------------------------------------------------------
// Creates an object with mobileFirst media query params
// Working: Partially

const mobileFirstBreakpoints = (obj) => Object.assign(
  ...Object.entries(obj).map(([bp, value]) => ({
    [bp]: `(min-width: ${value})`
  }))
);

// printClass
// ------------------------------------------------------------------
// Working: Partially
const printClass = (obj) => Object.keys(obj)
  .map(className => {
    Object.entries(obj[className]).map(
      ([prop, value]) =>
        console.log(`${className} { ${prop}: ${value} }`)
    )
  }
);

// ------------------------------------------------------------------
// Values
// ------------------------------------------------------------------


const percentageValues = [
  0, 5, 10, 15, 20, 25, 30, 33, 40, 50,
  60, 66, 70, 80, 85, 90, 95, 100
];
const scaleMultipliers = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
  12, 13, 14, 15, 16, 17, 18, 19, 20
];
const pixelValues = [1, 2, 3, 4];

const percentageUnits = valuesCompile(lengths({
  values: percentageValues,
  keySuffix: "p",
  valueSuffix: '%'
}));
// console.log(percentageUnits);

const viewportHeightUnits = valuesCompile(lengths({
  values: percentageValues,
  keySuffix: "vh",
  valueSuffix: 'vh'
}));
// console.log(viewportHeightUnits);

export const pixelUnits = valuesCompile(lengths({
  values: pixelValues,
  transform: [remify],
  keySuffix: "px",
  valueSuffix: 'rem'
}));

export const scaleUnits = valuesCompile(lengths({
  values: scaleMultipliers,
  transform: [remify, scaler],
  valueSuffix: 'rem'
}));

const textColors = valuesCompile(colors([
  'aqua',
  'teal',
  'blue',
  'navy'
]));


const backgroundColors = valuesCompile(colors([
  'white',
  'silver',
  'gray',
  'black',
  'red'
]));

export const spacingClasses =
  propsValuesMerge(
    propsCompile({
      props: {
        'p': 'padding',
        'm': 'margin'
      },
      subProps: {
        't': ['top'],
        'r': ['right'],
        'b': ['bottom'],
        'l': ['left'],
        'x': ['right', 'left'],
        'y': ['top', 'bottom']
      }
    }
  ),
  scaleUnits
);

// const atomBackgroundColor = propsValuesMerge(
//   propsCompile(backgroundColorConfig),
//   backgroundColors
// );

// JSONlog(spacingClasses)



const displayConfig = {
  props: {
    '': 'display'
  },
  values: {
    'table': 'table'
  },
  responsiveValues: {
    'block': 'block',
    'inline': 'inline',
    'inline-block': 'inline-block',
    'flex': 'flex',
  },
  perBreakpointValues: {
    'hide': 'none'
  }
};

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

const borderConfig = {
  props: {
    'border': 'border'
  },
  propSeparator: '-',
  subProps: {
    'top': ['top'],
    'right': ['right'],
    'bottom': ['bottom'],
    'left': ['left']
  },
  responsiveValues: {
    '': `0.1rem solid ${colorHex('navy')}`
  }
}

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


