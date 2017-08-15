// eslint-env jest, node

import {
  valueObjectFormat,
  valuesCompile,
  propsCompile,
  propsValuesMerge,
  breakpointClassFormat,
  classCompile,
  breakpointsClassCompile,
  atomTree,
  atomList
} from './compiler';

import { baseRemify, baseScaler, baseLengths, Config } from './valueHelpers';

const config: Config = {
  baseFontSize: 10,
  baseUnit: 6,
  systemColors: {
    'hot-pink': '#FF0099',
    blue: '#0000FF',
    red: '#FF0000'
  },
  breakpointPrefixOrSuffix: 'suffix',
  breakpointSeparator: '-',
  breakpointsConfig: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1100
  }
};

const remify = baseRemify(config);
const scaler = baseScaler(config);
const lengths = baseLengths(config);

const scalers = (units: number[], negative = false) =>
  lengths({
    values: units,
    valueConverters: [remify, scaler],
    lengthUnit: 'rem',
    negative: negative
  });

export const pixels = (units: number[], negative = false) =>
  lengths({
    values: units,
    valueConverters: [remify],
    lengthUnit: 'rem',
    unitIndicator: 'px',
    negative: negative
  });

describe('valueObjectFormat', () => {
  it('matches snapshot', () => {
    expect(
      valueObjectFormat({
        name: '2',
        value: '1.2rem',
        type: 'scale',
        breakpoint: 'sm'
      })
    ).toMatchSnapshot();
  });
});

describe('valuesCompile', () => {
  describe('with values only', () => {
    it('matches snapshot', () => {
      expect(
        valuesCompile({
          values: {
            block: 'block',
            'display-inline': 'inline',
            'inline-block': 'inline-block',
            flex: 'flex'
          }
        })
      ).toMatchSnapshot();
    });
  });

  describe('with all config options', () => {
    it('matches snapshot', () => {
      expect(
        valuesCompile({
          values: {
            'hot-pink': '#FF0099',
            blue: '#0000FF',
            red: '#FF0000'
          },
          breakpoint: 'sm',
          pseudo: 'hover',
          type: 'color'
        })
      ).toMatchSnapshot();
    });
  });
});

describe('propsCompile', () => {
  describe('single prop', () => {
    it('matches snapshot', () => {
      expect(
        propsCompile({
          props: { '': 'display' }
        })
      ).toMatchSnapshot();
    });
  });

  describe('multiple props with sub props', () => {
    it('matches snapshot', () => {
      expect(
        propsCompile({
          props: {
            p: 'padding',
            m: 'margin'
          },
          subProps: {
            t: ['top'],
            x: ['right', 'left']
          }
        })
      ).toMatchSnapshot();
    });
  });

  describe('border prop with sub props', () => {
    it('matches snapshot', () => {
      expect(
        propsCompile({
          props: { '': 'border-radius' },
          subProps: {
            top: ['top-left', 'top-right'],
            right: ['top-right', 'bottom-right'],
            bottom: ['bottom-left', 'bottom-right'],
            left: ['top-left', 'bottom-left'],
            'top-right': ['top-right'],
            'bottom-right': ['bottom-right'],
            'top-left': ['top-left'],
            'bottom-left': ['bottom-left']
          }
        })
      ).toMatchSnapshot();
    });
  });
});

describe('propsValuesMerge', () => {
  it('matches snapshot', () => {
    expect(
      propsValuesMerge(
        [
          {
            propName: 'p',
            props: ['padding']
          },
          {
            propName: 'py',
            props: ['padding-top', 'padding-bottom']
          }
        ],
        [
          {
            valueName: '1px',
            value: '0.1rem'
          },
          {
            valueName: '2px',
            value: '0.2rem'
          }
        ]
      )
    ).toMatchSnapshot();
  });
});

describe('breakpointClassFormat', () => {
  it('matches snapshot', () => {
    expect(
      breakpointClassFormat(
        config.breakpointPrefixOrSuffix,
        config.breakpointSeparator
      )('pt2', 'sm')
    ).toMatchSnapshot();
  });
});

describe('classCompile', () => {
  describe('without breakpoint', () => {
    it('matches snapshot', () => {
      expect(
        classCompile(
          {
            propName: 'py',
            props: ['padding-top', 'padding-bottom'],
            valueName: '1',
            value: '0.6rem'
          },
          config.breakpointPrefixOrSuffix,
          config.breakpointSeparator
        )
      ).toMatchSnapshot();
    });
  });

  describe('with breakpoint', () => {
    it('matches snapshot', () => {
      expect(
        classCompile(
          {
            propName: '',
            props: ['display'],
            valueName: 'block',
            value: 'block',
            breakpoint: 'md'
          },
          config.breakpointPrefixOrSuffix,
          config.breakpointSeparator
        )
      ).toMatchSnapshot();
    });
  });
});

describe('breakpointsClassCompile', () => {
  it('matches snapshot', () => {
    expect(
      breakpointsClassCompile(
        {
          prop: [
            {
              propName: 'p',
              props: ['padding']
            },
            {
              propName: 'py',
              props: ['padding-top', 'padding-bottom']
            }
          ],
          values: {
            '1px': '0.1rem',
            '2px': '0.2rem'
          },
          breakpoints: ['sm', 'md', 'lg']
        },
        config.breakpointPrefixOrSuffix,
        config.breakpointSeparator
      )
    ).toMatchSnapshot();
  });
});

describe('atomTree', () => {
  it('matches expectations', () => {
    expect(
      atomTree(
        {
          props: {
            p: 'padding',
            m: 'margin'
          },
          subProps: {
            t: ['top'],
            x: ['right', 'left']
          },
          mobileFirstValues: scalers([0, 1, 2, 3, 4])
        },
        config
      )
    ).toMatchSnapshot();
  });
});

describe('atomList', () => {
  it('matches snapshot', () => {
    expect(
      atomList(
        {
          props: {
            p: 'padding'
          },
          subProps: {
            t: ['top'],
            r: ['right'],
            b: ['bottom'],
            l: ['left'],
            x: ['right', 'left'],
            y: ['top', 'bottom']
          },
          mobileFirstValues: pixels([1, 2, 3, 4]),
          perScreenValues: {
            '-auto': 'auto'
          }
        },
        config
      )
    ).toMatchSnapshot();
  });
});
