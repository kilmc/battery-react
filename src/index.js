import entries from 'object.entries';
import fs from 'fs';

Array.prototype.flatMap = function(lambda) {
    return Array.prototype.concat.apply([], this.map(lambda));
};

Object.entries = entries;

// Helpers
const JSONlog = (x) => console.log(JSON.stringify(x, null, 2));

// Utilities
const compose = (...functions) =>
  functions.reduce((f, g) => (...xs) => f(g(...xs)));
const identity = x => x;

// Atomic Utilities
const remify = (x) => x/baseFontSize;
const scaler = (x) => x*baseUnit;

// Atomic Base Config
const baseFontSize = 10;
const baseUnit = 6;



// Generates an object with a value name and a value.
// This can be used to generate classes for any property
// that takes these values

// --------------------------------------------------------
// Values
// --------------------------------------------------------

// Length value generator
// --------------------------------------------------------

const lengthUnits = ({
  values,
  keySuffix = '',
  valueSuffix = '',
  transform = [identity],
  negative = false
}) => {
  const minus = negative ? '-' : '';
  return Object.assign(
    values.map((value) => ({
      "valueName": `${minus}${value}${keySuffix}`,
      "value": `${minus}${compose(...transform)(value)}${valueSuffix}`
    })
  ));
};

const percentageValues = [
  0, 5, 10, 15, 20, 25, 30, 33, 40, 50,
  60, 66, 70, 80, 85, 90, 95, 100
];
const scaleMultipliers = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
  12, 13, 14, 15, 16, 17, 18, 19, 20
];
const pixelValues = [1, 2, 3, 4];

const percentageUnits = lengthUnits({
  values: percentageValues,
  keySuffix: "p",
  valueSuffix: '%'
});

const viewportHeightUnits = lengthUnits({
  values: percentageValues,
  keySuffix: "vh",
  valueSuffix: 'vh'
});

export const pixelUnits = lengthUnits({
  values: pixelValues,
  keySuffix: "px",
  valueSuffix: 'rem'
});

export const scaleUnits = lengthUnits({
  values: scaleMultipliers,
  transform: [remify, scaler],
  valueSuffix: 'rem'
});

// An object containing all the colors in your design system
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

// This looks at the systemColors object and creates a new
// object with a subset of colors
const colors = (array) => {
  return array.reduce((obj, value) => {
    obj[value] = systemColors[value];
    return obj
  },{});
};

const colorHex = (name) => systemColors[name];

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

export const propsValuesMerge = ({
  props,
  values
}) => Object.keys(props).map(prop => (
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

// // Input
// propsValuesMerge({
//   props: positionCoordinateProps,
//   values: pixelUnits
// });
// // Output

const positionOutput = {
  "top": [
    {
      propName: "t",
      props: ["top"],
      valueName: "1px",
      value: "0.1rem"
    },
    {
      propName: "t",
      props: ["top"],
      valueName: "2px",
      value: "0.2rem"
    },
    {
      propName: "t",
      props: ["top"],
      valueName: "3px",
      value: "0.3rem"
    },
    {
      propName: "t",
      props: ["top"],
      valueName: "4px",
      value: "0.4rem"
    }
  ],
  "right": [
    {
      propName: "r",
      props: ["right"],
      valueName: "1px",
      value: "0.1rem"
    },
    {
      propName: "r",
      props: ["right"],
      valueName: "2px",
      value: "0.2rem"
    },
    {
      propName: "r",
      props: ["right"],
      valueName: "3px",
      value: "0.3rem"
    },
    {
      propName: "r",
      props: ["right"],
      valueName: "4px",
      value: "0.4rem"
    }
  ],
  "bottom": [
    {
      propName: "b",
      props: ["bottom"],
      valueName: "1px",
      value: "0.1rem"
    },
    {
      propName: "b",
      props: ["bottom"],
      valueName: "2px",
      value: "0.2rem"
    },
    {
      propName: "b",
      props: ["bottom"],
      valueName: "3px",
      value: "0.3rem"
    },
    {
      propName: "b",
      props: ["bottom"],
      valueName: "4px",
      value: "0.4rem"
    }
  ],
  "left": [
    {
      propName: "l",
      props: ["left"],
      valueName: "1px",
      value: "0.1rem"
    },
    {
      propName: "l",
      props: ["left"],
      valueName: "2px",
      value: "0.2rem"
    },
    {
      propName: "l",
      props: ["left"],
      valueName: "3px",
      value: "0.3rem"
    },
    {
      propName: "l",
      props: ["left"],
      valueName: "4px",
      value: "0.4rem"
    }
  ]
}


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

const sample = classCompile({
  propName: "l",
  props: ["left"],
  valueName: "1px",
  value: "0.1rem"
},
{
  propName: "l",
  props: ["left"],
  valueName: "2px",
  value: "0.2rem"
},
{
  propName: "l",
  props: ["left"],
  valueName: "3px",
  value: "0.3rem"
},
{
  propName: "l",
  props: ["left"],
  valueName: "4px",
  value: "0.4rem"
});

const printClass = (obj) => Object.keys(obj).map(className => {
  Object.entries(obj[className]).map(
    ([prop, value]) => {
      `${className} { ${prop}: ${value} }`
    }
  )
});
// JSONlog(sample);
printClass(sample);

export const spacingProps = propsCompile({
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
});

export const positionCoordinateProps = propsCompile({
  props: {
    't': 'top',
    'r': 'right',
    'b': 'bottom',
    'l': 'left'
  }
});

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
    'top': 'top',
    'right': 'right',
    'bottom': 'bottom',
    'left': 'left',
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

const propertyConfig = ({
  prop,
  propName,
  values,

}) => {

};


const textColorsDefinition = ({
  propName
}) => ({
  props: {
    [textColorNameConfig]: "color"
  },
  values: colors([textColorValuesConfig]),
  features: {
    responsive: true,

  }
});