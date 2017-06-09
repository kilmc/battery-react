// eslint-env jest, node
import {
  baseCompile,
  baseLengths,
  baseKeywords,
  compileMolecules,
  printClass
} from '../atomic/battery';
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

const classJSON = {
  "fz-14": { "font-size": "1.4rem" },
  "fz-16": { "font-size": "1.6rem" },
  "fz-21": { "font-size": "2.1rem" },
  "lh2": { "line-height": "1.2rem" },
  "lh3": { "line-height": "1.8rem" },
  "lh4": { "line-height": "2.4rem" }
}

const lengths = baseLengths(config)
const keywords = baseKeywords(config)

export const percentages = (units) => lengths({
  values: units,
  unitIndicator: "p",
  lengthUnit: '%'
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


describe('Molecule', () => {
  describe('compiler', () => {
    it('matches snapshot', () => {
      expect(compileMolecules({
        'type-14': ['fz-14','lh3'],
        'type-16': ['fz-16','lh3'],
        'type-21': ['fz-21','lh4'],
      }, classJSON)).toMatchSnapshot()
    });
  });

  describe('printer', () => {
    it('matches snapshot', () => {
      expect(compileMolecules({
        'type-14': ['fz-14','lh3'],
        'type-16': ['fz-16','lh3'],
        'type-21': ['fz-21','lh4'],
      }, classJSON).map(printClass).join('\n')).toMatchSnapshot()
    });
  });
})