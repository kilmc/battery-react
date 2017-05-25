import {
  atomCompile,
  breakpointsClassCompile,
  breakpointClassFormat,
  breakpointsCompile,
  classCompile,
  colors,
  lengths,
  pixelUnits,
  positionCoordinateProps,
  propsCompile,
  propsValuesMerge,
  remify,
  scaler,
  scaleUnits,
  spacingProps,
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


  describe('spacingProps', () => {
    it('matches snapshot', () => {
      expect(spacingProps).toEqual()
    });
  });


  describe('atomCompile', () => {
    it('matches expectations', () => {
      expect(atomCompile({
        props: {
          'p': 'padding',
          'm': 'margin'
        },
        subProps: {
          't': ['top'],
          'x': ['right', 'left']
        },
        mobileFirstValues: scaleUnits
      })).toMatchSnapshot();
    });
  });

  describe('scaleUnits', () => {
    it('matches snapshot', () => {
      expect(scaleUnits).toMatchSnapshot()
    });
  });
});
