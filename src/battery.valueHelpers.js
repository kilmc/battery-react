import {
  compose,
  identity
} from './battery.utils';

export const baseRemify = config => x => x / config.baseFontSize;
export const baseScaler = config => x => x * config.baseUnit;
export const baseOpacify = x => x / 100;
export const baseColorHex = config => name => config.systemColors[name];

// lengths
// ------------------------------------------------------------------
// Generates an object with length type values. The output of this
// is meant to be used with the valuesCompile function.

export const baseLengths = config => ({
  values,
  unitIndicator = '',
  lengthUnit = '',
  valueConverters = [identity],
  negative = false,
  separator = config.lengthValueSeparator || ''
}) => {
  return values.reduce((obj, value) => {
    const minus = negative ? '-' : '';
    const negativeIndicator = negative ? config.negativeValueIndicator : '';

    obj[
      `${separator}${negativeIndicator}${value}${unitIndicator}`
    ] = `${minus}${compose(...valueConverters)(value)}${lengthUnit}`;
    return obj;
  }, {});
};

// Color value generator
// ------------------------------------------------------------------
// Converts an array of color names into an object with color names
// and color hex values.

export const baseColors = config => (
  array,
  separator = config.colorValueSeparator || ''
) => {
  return array.reduce((obj, value) => {
    obj[`${separator}${value}`] = config.systemColors[value];
    return obj;
  }, {});
};

// Integer Values
// ------------------------------------------------------------------

export const baseIntegers = config => (
  arr,
  separator = config.integerValueSeparator || ''
) =>
  arr.reduce((xs, x) => {
    xs[`${separator}${x}`] = x;
    return xs;
  }, {});

// Keyword Values
// ------------------------------------------------------------------

export const baseKeywords = config => (
  obj,
  separator = config.keywordValueSeparator || ''
) => {
  const newKey = key => separator.concat(key);
  return Object.assign(
    {},
    ...Object.keys(obj).map(key => ({ [newKey(key)]: obj[key] }))
  );
};

export const defaultValue = str => ({ '': str });