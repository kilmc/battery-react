import entries from 'object.entries';
// import fs from 'fs';

Object.entries = entries;

// Helpers
const JSONlog = (x) => console.log(JSON.stringify(x, null, 2));

// Utilities
const compose = (...functions) =>
  functions.reduce((f, g) => (...xs) => f(g(...xs)));
const identity = x => x;

// --------------------------------------------------------
// Atomic Base Config
// --------------------------------------------------------

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
}

// --------------------------------------------------------
// Atomic Functions
// --------------------------------------------------------

const remify = (x) => x/baseFontSize;
const scaler = (x) => x*baseUnit;
const colorHex = (name) => systemColors[name];
const opacify = (x) => x/10;

// --------------------------------------------------------
// Generators
// --------------------------------------------------------

// Value generator functions
// --------------------------------------------------------

const valueObjectFormat = (name, value) => ({
  "valueName": name,
  "value": value
});

const valuesCompile = (obj) => (
  Object.entries(obj).map(([name, value]) =>
    valueObjectFormat(name, value))
);

JSONlog(valuesCompile({
  '': '0.1rem solid #ff0099'
}))

// Length value generator
// --------------------------------------------------------
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
// --------------------------------------------------------
const colors = (array) => {
  return array.reduce((obj, value) => {
    obj[value] = systemColors[value];
    return obj
  },{});
};

// Keyword value generator
// --------------------------------------------------------
const keywords = (obj) => {

}

// Prop generator functions
// --------------------------------------------------------
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
  ]}))
);

// Length value generator
// --------------------------------------------------------
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

export const classCompile = ({
  propName,
  props,
  valueName,
  value
}) => ({
  [`.${propName}${valueName}`]: Object.assign(
    ...props.map((prop) => ({
      [prop]: value
    }))
  )
});

const printClass = (obj) => Object.keys(obj)
  .map(className => {
    Object.entries(obj[className]).map(
      ([prop, value]) =>
        console.log(`${className} { ${prop}: ${value} }`)
    )
  }
);

/**
 * ------------------------------------------------------------------
 * Values
 * ------------------------------------------------------------------
 */

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


