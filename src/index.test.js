// eslint-env jest, node
import {
  baseCompile,
  baseLengths,
  baseKeywords
} from './battery';
const config = {
  baseFontSize: 10,
  baseUnit: 6,
  systemColors: {
    'white': '#FFFFFF',
    'silver': '#C0C0C0',
    'gray': '#808080'
  },
  negativeValueIndicator: '-',
  keywordValueSeparator: '',
  integerValueSeparator: '-',
  colorValueSeparator: '-',
  breakpointPrefixOrSuffix: 'suffix',
  breakpointSeparator: '-',
  breakpointsConfig: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1100
  }
}

const {
  breakpointPrefixOrSuffix,
  breakpointsConfig,
  breakpointSeparator
} = config;

const lengths = baseLengths(config)
const keywords = baseKeywords(config)

export const percentages = (units) => lengths({
  values: units,
  keySuffix: "p",
  valueSuffix: '%'
});

const compile = baseCompile(config);

describe('Battery', () => {
  describe('Battery', () => {
    it('matches snapshot', () => {
      expect(compile({
        backgroundSize: {
        props: { 'bg': 'background-size' },
        mobileFirstValues: Object.assign({},
          keywords({
            'cover': 'cover',
            'contain': 'contain',
            'full-height': 'auto 100%',
            'full-width': '100% auto'
          },'-'),
          percentages([10, 20, 25, 33, 34, 35, 40, 50, 60, 66, 75, 80, 100])
        )
      }
      })).toMatchSnapshot()
    });
  });
});