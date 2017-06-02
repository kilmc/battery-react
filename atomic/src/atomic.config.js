import * as battery from './battery';

// ------------------------------------------------------------------
// Core Config
// ------------------------------------------------------------------

export const config = {
  // Typorgraphy
  // -----------------------------------------------
  //
  baseFontSize: 10,

  // Baseline
  // -----------------------------------------------
  baseUnit: 6,

  // Color
  // -----------------------------------------------
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

  negativeValueIndicator: '-',
  keywordValueSeparator: '',
  lengthValueSeparator: '',
  integerValueSeparator: '-',
  colorValueSeparator: '-',

  // Breakpoints
  // -----------------------------------------------
  breakpointPrefixOrSuffix: 'suffix',
  breakpointSeparator: '-',
  breakpointsConfig: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1100
  }
};

// ------------------------------------------------------------------
// Helper Functions
// ------------------------------------------------------------------

export const defaultValue = battery.defaultValue;

// keywords
// ------------------------------------------------------------------
export const keywords = battery.baseKeywords(config)

// colors
// ------------------------------------------------------------------

export const colors = battery.baseColors(config)

// integers
// ------------------------------------------------------------------

export const integers = battery.baseIntegers(config)

// colorHex
// ------------------------------------------------------------------
// Takes a color name that exists in the systemColors object in your
// config and returns its hex value. This is useful when used in
// conjunction with defaultValue.

export const colorHex = battery.baseColorHex(config)




// lengths
// ------------------------------------------------------------------
// A universal function which takes some configuration paramaters
// and an array of numbers to generate an object with key-values
// pairs of the classname indicator and corresponding css value.
//
// Configurable parameters:
//
// lengthUnit (string)
// The type of unit you want to generate e.g. px, rem, %
//
// unitIndicator (string)
// This is used to indicate which unit type the given class represents.
//
// valueConverters (array[functions])
// Allows you to convert an array of numbers into whatever end value
// you desire e.g. rem, opacity, baseline grid multiple.
//
// negative (boolean)
// Adds your configured negativeValueIndicator to the class name and
// adds a minus in front of each value.
//
// separator (string)
// Allows you to add a separator between the property and the value in
// the class name. You can set a default separator for all values
// generated with this function by setting the lengthValueSeparator
// in your config object.

const lengths = battery.baseLengths(config)


// valueConverter: remify (num)
// ------------------------------------------------------------------
// Converts a pixel value to a rem value based on your baseFontSize
// Note: This returns a unitless value. Length units are added via
// the lengths function.

export const remify = battery.baseRemify(config)

// valueConverter: scaler
// ------------------------------------------------------------------
// Multiplies a number by your configured baseUnit. This can be used
// to generate a set of values which aligns with your baseline grid
// should you choose to add one.

export const scaler = battery.baseScaler(config)

// valueConverter: opacify
// ------------------------------------------------------------------
// Converts a number to a decimal for use in conjunction with CSS's
// opacity property.

export const opacify = battery.baseOpacify

// Length Value Helpers
// ------------------------------------------------------------------
// A set of helpers to generate various kinds of length units and
// their corrosponding classname indicator.
//
// NOTE: All of these helpers take an array of numbers.


// Percentages
export const percentages = (units, negative = false) => lengths({
  values: units,
  lengthUnit: '%',
  unitIndicator: "p"
});

// Viewport Height
export const viewportHeights = (units, negative = false) => lengths({
  values: units,
  lengthUnit: 'vh',
  unitIndicator: "vh"
});

// Viewport Width
export const viewportWidths = (units, negative = false) => lengths({
  values: units,
  lengthUnit: 'vh',
  unitIndicator: "vh"
});

export const pixels = (units, negative = false) => lengths({
  values: units,
  valueConverters: [remify],
  lengthUnit: 'rem',
  unitIndicator: "px"
});

export const scalers = (units, negative = false) => lengths({
  values: units,
  valueConverters: [remify, scaler],
  lengthUnit: 'rem'
});

// Percentages
export const opacities = (units, negative = false) => lengths({
  values: units,
  valueConverters: [opacify],
  lengthUnit: '%',
  unitIndicator: "p"
});


