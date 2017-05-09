import entries from 'object.entries';
// import fs from 'fs';

Object.entries = entries;

// Helpers
const JSONlog = (x) => console.log(JSON.stringify(x, null, 2));

// Utilities
const compose = (...functions) =>
  functions.reduce((f, g) => (...xs) => f(g(...xs)));
const identity = x => x;

/**
 * ------------------------------------------------------------------
 * Atomic Base config
 * ------------------------------------------------------------------
 */

const baseFontSize = 10;
const baseUnit = 6;


/**
 * ------------------------------------------------------------------
 * Atomic functions
 * ------------------------------------------------------------------
 */
const remify = (x) => x/baseFontSize;
const scaler = (x) => x*baseUnit;


/**
 * Colors
 * ------------------------------------------------------------------ */

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

const percentageUnits = lengths({
  values: percentageValues,
  keySuffix: "p",
  valueSuffix: '%'
});
// console.log(percentageUnits);

const viewportHeightUnits = lengths({
  values: percentageValues,
  keySuffix: "vh",
  valueSuffix: 'vh'
});
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

JSONlog(spacingClasses)``

// export const propsCompile = ({
//   props,
//   subProps = {},
//   propSeparator = '',
//   root = false
// }) => Object.assign(
//   ...Object.entries(props).map(([propName, prop]) => ({
//     [prop]: [
//       root ? { "propName": propName, "props": [prop] } : {},
//     ].concat(
//       Object.entries(subProps).map(([subPropName, subProps]) => ({
//         "propName": `${propName}${propSeparator}${subPropName}`,
//         "props": subProps.map((sp) => `${prop}-${sp}`)
//       }))
//     )
//   }))
// );

// fs.writeFile('atomic.css', JSON.stringify(positionCoordinateProps, null, 4), function (err) {
//   if (err) return console.log(err);
//   console.log('Hello World > helloworld.txt');
// });


