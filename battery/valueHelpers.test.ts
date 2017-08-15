// eslint-env jest, node

import {
  baseRemify,
  baseScaler,
  opacify,
  baseColorHex,
  baseLengths,
  baseColors,
  baseIntegers,
  baseKeywords,
  defaultValue,
  Config
} from './valueHelpers';

const config: Config = {
  baseFontSize: 10,
  baseUnit: 6,
  systemColors: {
    'hot-pink': '#FF0099',
    blue: '#0000FF'
  }
};

const remify = baseRemify(config);
const scale = baseScaler(config);
const colorHex = baseColorHex(config);

const lengths = baseLengths(config);
const colors = baseColors(config);
const integers = baseIntegers(config);
const keywords = baseKeywords(config);

describe('remify', () => {
  it('divides integer by baseFontSize', () => {
    expect(remify(24)).toEqual(2.4);
  });
});

describe('scaler', () => {
  it('multiplies integer by baseUnitSize', () => {
    expect(scale(4)).toEqual(24);
  });
});

describe('opacify', () => {
  it('divides integer by 100', () => {
    expect(opacify(10)).toEqual(0.1);
  });
});

describe('colorHex', () => {
  it('returns HEX value from color name', () => {
    expect(colorHex('hot-pink')).toEqual('#FF0099');
  });
});

describe('Lengths', () => {
  it('matches snapshot', () => {
    expect(
      lengths({
        values: [1, 2, 3, 4],
        lengthUnit: 'rem',
        valueConverters: [remify, scale]
      })
    ).toMatchSnapshot();
  });
});

describe('colors', () => {
  it('matches snapshot', () => {
    expect(colors(['blue'])).toMatchSnapshot();
  });
});

describe('integers', () => {
  it('matches snapshot', () => {
    expect(integers([1, 2, 3, 4])).toMatchSnapshot();
  });
});

describe('keywords', () => {
  it('matches snapshot', () => {
    expect(
      keywords({
        block: 'block',
        hide: 'none'
      })
    ).toMatchSnapshot();
  });
});

describe('defaultValue', () => {
  it('matches snapshot', () => {
    expect(
      defaultValue(`0.1rem solid ${colorHex('hot-pink')}`)
    ).toMatchSnapshot();
  });
});
