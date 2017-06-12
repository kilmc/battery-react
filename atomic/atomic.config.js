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
    'ksr-green-300': '#00C78B',
    'ksr-green-200': '#00C78B',
    'ksr-green-100': '#00E6A1',
    'ksr-green-800': '#098530',
    'ksr-green-700': '#05AF3C',
    'ksr-green-500': '#25CB68',
    'ksr-green-400': '#2BDE73',

    'blue-600': '#003BFF',
    'blue-500': '#2B60FF',

    'cobalt-600': '#395AEB',
    'cobalt-500': '#4C6CF8',

    'soft-black': '#282828',
    'black_17': 'rgba(0,0,0,0.17)',

    'dark-grey-500': '#656868',
    'dark-grey-400': '#9B9E9E',

    'grey-500': '#DCDEDD',
    'grey-400': '#E8E8E8',
    'grey-100': '#FBFBFA',

    'red-500': '#EF0707',
    'red-400': '#FF5151',

    'navy-700': '#353535',
    'navy-600': '#626369',
    'navy-500': '#95959E',
    'transparent': 'transparent',
    'black': '#000000',
    'white': '#FFFFFF',
    'green-700': '#05AF3C',
    'green-700_0': 'rgba(#05AF3C, 0)',
    'green-700_08': 'rgba(#05AF3C, 0.08)',
    'green-700_20': 'rgba(#05AF3C, 0.2)',
    'green-500': '#25CB68',
    'green-400': '#2BDE73',
    'green-300': '#CEEBD7',
    'forrest-700': '#122C49',
    'forrest-600': '#07565F',
    'forrest-500': '#0A717D',
    'forrest-500_08': 'rgba(#0A717D, .08)',
    'forrest-500_20': 'rgba(#0A717D, .2)',
    'forrest-200': '#E8F0F0',
    'navy-900': '#020621',
    'navy-900_20': 'rgba(#020621, .2)',
    'navy-900_30': 'rgba(#020621, .3)',
    'navy-700_40': 'rgba(#353535, 0.40)',
    'navy-400': '#E6E7E8',
    'navy-300': '#EFEFF3',
    'navy-200': '#F7F7F9',
    'teal-900': '#122C49',
    'teal-500': '#21ABBB',
    'teal-400': '#2DBECF',
    'teal-300': '#96D8DB',
    'sage-400': '#D1E4DE',
    'orange-400': '#F7AA1A',
    'orange-300': '#E8E1CE',
    'red-100': '#F4E9D8',
    'coral-600': '#FE446B',
    'coral-500': '#F46969',
    'coral-400': '#FE8485',
    'peach-700': '#FD4616',
    'peach-600': '#FF6A59',
    'peach-400': '#F4DACC',
    'peach-350': '#F6E3D8',
    'peach-300': '#F4E9D8',
    'magenta-400': '#F03C63',
    'magenta-400_08':'rgba(#F03C63, .08)',
    'magenta-400_20':'rgba(#F03C63, .2)',
    'magenta-500': '#D4294E',
    'violet-900': '#0B055E',
    'violet-800': '#504083',
    'violet-600': '#212E63',
    'violet-600_08':'rgba(#212E63, 0.08)',
    'violet-600_20':'rgba(#212E63, 0.2)',
    'violet-500': '#3a328e',
    'violet-200': '#EBEDF7',
    'violet-100': '#F8F9FD',
    'grey-300': '#F2F2F2',
    'grey-200': '#F7F7F6',
    'grey-100_0': 'rgba(#FBFBFA, 0)',
    'grey-100_95': 'rgba(#FBFBFA, 0.95)',
    'drop-shadow': '#D6D6D6',
    'white_0': 'rgba(255,255,255,0)',
    'white_10': 'rgba(255,255,255,0.1)',
    'white_30': 'rgba(255,255,255,0.3)',
    'white_95': 'rgba(255,255,255, 0.95)',
    'black_05': 'rgba(0,0,0,0.05)',
    'black_20': 'rgba(0,0,0,0.2)',
    'black_40': 'rgba(0,0,0,0.4)',
    'black_50': 'rgba(0,0,0,0.5)',
    'black_60': 'rgba(0,0,0,0.6)',
    'tangerine-600': '#FF8C8C',
    'tangerine-800': '#FF6C6C',
    'tangerine-900': '#D46E6E',
    'tangerine-600_20': 'rgba(#FF8C8C, 0.2)',
    'twitter-blue': '#00ABF0',
    'facebook-blue': '#39579A'
  },

  negativeValueIndicator: '-',
  keywordValueSeparator: '-',
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

export const compile = battery.baseCompile(config);
export const printAtom = battery.basePrintAtom(config);

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

// allColors
export const allColors = Object.keys(config.systemColors);


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

// Pixels
export const pixels = (units, negative = false) => lengths({
  values: units,
  valueConverters: [remify],
  lengthUnit: 'rem',
  unitIndicator: 'px',
  negative: negative
});

// Scalers
export const scalers = (units, negative = false) => lengths({
  values: units,
  valueConverters: [remify, scaler],
  lengthUnit: 'rem',
  negative: negative
});

// Rems
export const rems = (units, negative = false) => lengths({
  values: units,
  valueConverters: [remify],
  lengthUnit: 'rem',
  negative: negative,
  separator: '-'
});

// Percentages
export const opacities = (units, negative = '') => lengths({
  values: units,
  valueConverters: [opacify],
  lengthUnit: '',
  unitIndicator: "p",
  negative: negative === 'negative' ? true : false
});


