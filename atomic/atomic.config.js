import * as battery from './battery';

// ------------------------------------------------------------------
// Core Config
// ------------------------------------------------------------------

export const config = {
  // Typorgraphy
  // -----------------------------------------------
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
  },

  // Output
  // -----------------------------------------------
  outputGzippedCSS: true,
  outputJSON: true,
  outputDocs: false,
  outputChangelog: true
};

// ------------------------------------------------------------------
// Base Value Helper Functions
// ------------------------------------------------------------------

const remify = battery.baseRemify(config)
const scaler = battery.baseScaler(config)
const opacify = battery.baseOpacify
const lengths = battery.baseLengths(config)


// Value Functions
// ------------------------------------------------------------------

// defaultValue
export const defaultValue = battery.defaultValue;

// keywords
export const keywords = battery.baseKeywords(config)

// colors
export const colors = battery.baseColors(config)

// integers
export const integers = battery.baseIntegers(config)

// colorHex
export const colorHex = battery.baseColorHex(config)


// Percentages
export const percentages = (units, negative = false) => lengths({
  values: units,
  lengthUnit: '%',
  unitIndicator: "p",
  negative: negative
});

// Viewport Height
export const viewportHeights = (units, negative = false) => lengths({
  values: units,
  lengthUnit: 'vh',
  unitIndicator: 'vh',
  negative: negative
});

// Viewport Width
export const viewportWidths = (units, negative = false) => lengths({
  values: units,
  lengthUnit: 'vh',
  unitIndicator: 'vh',
  negative: negative
});

export const pixels = (units, negative = false) => lengths({
  values: units,
  valueConverters: [remify],
  lengthUnit: 'rem',
  unitIndicator: 'px',
  negative: negative
});

export const scalers = (units, negative = false) => lengths({
  values: units,
  valueConverters: [remify, scaler],
  lengthUnit: 'rem',
  negative: negative
});

// Percentages
export const opacities = (units, negative = false) => lengths({
  values: units,
  valueConverters: [opacify],
  lengthUnit: '%',
  unitIndicator: "p",
  negative: negative
});


