// eslint-env jest, node
import {
  atomTree,
  atomList,
  breakpointsClassCompile,
  breakpointClassFormat,
  breakpointsCompile,
  classCompile,
  colors,
  lengths,
  mobileFirstQueries,
  perScreenQueries,
  printBreakpoint,
  positionCoordinateProps,
  printAtom,
  printClass,
  printClasses,
  printMobileFirst,
  printPerScreen,
  printProps,
  propsCompile,
  propsValuesMerge,
  remify,
  scaler,
  scaleValues,
  valueObjectFormat,
  valuesCompile
} from './index';

describe('Battery', () => {
  describe('valueObjectFormat', () => {
    it('matches snapshot', () => {
      expect(valueObjectFormat({
        name: '1',
        value: '0.6rem'
      })).toMatchSnapshot()
    });
  });

  describe('valuesCompile', () => {
    it('matches snapshot', () => {
      expect(valuesCompile(
        { 'lime': '#00FF00', 'navy': '#000080' },
        'sm'
      )).toMatchSnapshot()
    });
  });

  describe('lengths', () => {
    it('matches snapshot', () => {
      console.log(remify.name)
      expect(lengths({
        values: [1,2,3,4],
        transform: [remify],
        keySuffix: 'px',
        valueSuffix: 'rem'
      })).toMatchSnapshot()
    });
  });

  describe('colors', () => {
    it('matches snapshot', () => {
      expect(colors(['lime','navy'])).toMatchSnapshot()
    });
  });

  describe('propsCompile', () => {
    it('matches snapshot', () => {
      expect(propsCompile({
        props: {
          'p': 'padding',
          'm': 'margin'
        },
        subProps: {
          't': ['top'],
          'x': ['right', 'left']
        }
      })).toMatchSnapshot()
    });
  });

  describe('propsValuesMerge', () => {
    it('matches expectations', () => {
      expect(propsValuesMerge(
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
      )).toMatchSnapshot()
    });
  });

  describe('breakpointClassFormat', () => {
    it('matches snapshot', () => {
      expect(breakpointClassFormat('pt2','sm')).toMatchSnapshot()
    });
  });

  describe('classCompile', () => {
    it('matches snapshot', () => {
      expect(classCompile({
        propName: 'py',
        props: ['padding-top', 'padding-bottom'],
        valueName: '1',
        value: '0.6rem'
      })).toMatchSnapshot()
    });
  });

  describe('breakpointsClassCompile', () => {
    it('matches snapshot', () => {
      expect(breakpointsClassCompile({
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
      })).toMatchSnapshot()
    });
  });

  describe('atomTree', () => {
    it('matches expectations', () => {
      expect(atomTree({
        props: {
          'p': 'padding',
          'm': 'margin'
        },
        subProps: {
          't': ['top'],
          'x': ['right', 'left']
        },
        mobileFirstValues: scaleValues([0,1,2,3,4])
      })).toMatchSnapshot();
    });
  });

  describe('atomList', () => {
    it('matches snapshot', () => {
      expect(atomList({
        props: {
          'p': 'padding'
        },
        subProps: {
          't': ['top'],
          'r': ['right'],
          'b': ['bottom'],
          'l': ['left'],
          'x': ['right', 'left'],
          'y': ['top', 'bottom']
        },
        mobileFirstValues: lengths({
          values: [1,2,3,4],
          transform: [remify, scaler],
          valueSuffix: 'rem'
        }),
        perScreenValues: {
          '-auto': 'auto'
        }
      })).toMatchSnapshot();
    })
  });

  describe('mobileFirstQueries', () => {
    it('matches snapshot', () => {
      expect(mobileFirstQueries).toMatchSnapshot()
    });
  });

  describe('perScreenQueries', () => {
    it('matches snapshot', () => {
      expect(perScreenQueries()).toMatchSnapshot()
    });
  });

  describe('printProps', () => {
    it('matches snapshot', () => {
      expect(printProps({
        'rounded': { 'border-radius': '0.2rem' }
      })).toMatchSnapshot()
    });
  });

  describe('printClass', () => {
    it('matches snapshot', () => {
      expect(printClass({
        'rounded': { 'border-radius': '0.2rem' }
      })).toMatchSnapshot()
    });
  });

  describe('printClasses', () => {
    it('matches snapshot', () => {
      expect(printClasses([
        { 'rounded': { 'border-radius': '0.2rem' } },
        { 'rounded-medium': { 'border-radius': '0.4rem' } }
      ])).toMatchSnapshot()
    });
  });

  describe('printBreakpoint', () => {
    it('matches snapshot', () => {
      expect(printBreakpoint(
      [
        'sm', [
          { 'rounded': { 'border-radius': '0.2rem' } },
          { 'rounded-medium': { 'border-radius': '0.4rem' } }
        ]
      ],
      {
        'sm': '(min-width: 600px)',
        'md': '(min-width: 900px)'
      }
      )).toMatchSnapshot()
    });
  });

  describe('printMobileFirst', () => {
    it('matches snapshot', () => {
      expect(printMobileFirst({
        sm: [
          { "block-sm": { "display": "block" } },
          { "inline-sm": { "display": "inline" } }
        ],
        md: [
          { "block-md": { "display": "block" } },
          { "inline-md": { "display": "inline" } }
        ],
        lg: [
          { "block-lg": { "display": "block" } },
          { "inline-lg": { "display": "inline" } }
        ]
      })).toMatchSnapshot()
    });
  });

  describe('printPerScreen', () => {
    it('matches snapshot', () => {
      expect(printPerScreen({
        xs: [
          { "hide-xs": { "display": "none" } }
        ],
        sm: [
          { "hide-sm": { "display": "none" } }
        ],
        md: [
          { "hide-md": { "display": "none" } }
        ],
        lg: [
          { "hide-lg": { "display": "none" } }
        ],
      })).toMatchSnapshot()
    });
  });

  describe('printAtom', () => {
    it('matches snapshot', () => {
      expect(printAtom(atomTree({
        props: {
          '': 'display'
        },
        values: {
          'table': 'table'
        },
        mobileFirstValues: {
          'block': 'block',
          'inline': 'inline',
          'inline-block': 'inline-block',
          'flex': 'flex'
        },
        perScreenValues: {
          'hide': 'none'
        },
      }))).toMatchSnapshot()
    });
  });
});
