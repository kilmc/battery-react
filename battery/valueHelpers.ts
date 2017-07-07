import { squash, identity } from './utils';

export interface BreakpointsConfig {
  [key: string]: number;
}

export interface Config {
  baseFontSize: number;
  baseUnit: number;
  systemColors: { [key: string]: string };
  negativeValueIndicator: string;
  keywordValueSeparator: string;
  lengthValueSeparator: string;
  integerValueSeparator: string;
  colorValueSeparator: string;
  breakpointPrefixOrSuffix: 'prefix' | 'suffix';
  breakpointSeparator: string;
  breakpointsConfig: BreakpointsConfig;
  outputGzippedCSS: boolean;
  outputJSON: boolean;
  outputDocs: boolean;
  outputChangelog: boolean;
}

export const baseRemify = (config: Config) => (x: number) =>
  x / config.baseFontSize;
export const baseScaler = (config: Config) => (x: number) =>
  x * config.baseUnit;

export const opacify = (x: number) => x / 100;
export const baseColorHex = (config: Config) => (name: string) =>
  config.systemColors[name];

// lengths
// ------------------------------------------------------------------
// Generates an object with length type values. The output of this
// is meant to be used with the valuesCompile function.

interface LengthsConfig {
  values: number[];
  unitIndicator: string;
  lengthUnit: string;
  valueConverters: Array<(x: number) => number>;
  negative: boolean;
  separator: string;
}

export const baseLengths = (config: Config) => ({
  values,
  unitIndicator = '',
  lengthUnit = '',
  valueConverters = [identity],
  negative = false,
  separator = config.lengthValueSeparator || ''
}: LengthsConfig) => {
  return values.reduce((obj: { [key: string]: string }, value) => {
    const minus = negative ? '-' : '';
    const negativeIndicator = negative ? config.negativeValueIndicator : '';

    obj[
      `${separator}${negativeIndicator}${value}${unitIndicator}`
    ] = `${minus}${squash(valueConverters)(value)}${lengthUnit}`;
    return obj;
  }, {});
};

// Color value generator
// ------------------------------------------------------------------
// Converts an array of color names into an object with color names
// and color hex values.

export const baseColors = (config: Config) => (
  array: string[],
  separator: string = config.colorValueSeparator || ''
): { [key: string]: string } => {
  return array.reduce((obj: { [key: string]: string }, value) => {
    obj[`${separator}${value}`] = config.systemColors[value];
    return obj;
  }, {});
};

// Integer Values
// ------------------------------------------------------------------

export const baseIntegers = (config: Config) => (
  arr: number[],
  separator: string = config.integerValueSeparator || ''
) =>
  arr.reduce((xs: { [key: string]: number }, x) => {
    xs[`${separator}${x}`] = x;
    return xs;
  }, {});

// Keyword Values
// ------------------------------------------------------------------

export const baseKeywords = (config: Config) => (
  obj: { [key: string]: string },
  separator: string = config.keywordValueSeparator || ''
): { [key: string]: string } => {
  const newKey = (key: string) => separator.concat(key);
  return Object.assign(
    {},
    ...Object.keys(obj).map(key => ({ [newKey(key)]: obj[key] }))
  );
};

export const defaultValue = (str: string) => ({ '': str });
