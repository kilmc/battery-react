import {
  spacingProps,
  classCompile,
  propsCompile,
  scaleUnits,
  positionCoordinateProps,
  propsValuesMerge
} from './index';

describe('Battery', () => {
  describe('spacingProps', () => {
    it('matches snapshot', () => {
      expect(spacingProps).toMatchSnapshot()
    });
  });

  describe('propsValuesMerge', () => {
    it('matches snapshot', () => {
      expect(propsValuesMerge({
        props: spacingProps,
        values: scaleUnits
      })).toMatchSnapshot()
    });
  });

  describe('scaleUnits', () => {
    it('matches snapshot', () => {
      expect(scaleUnits).toMatchSnapshot()
    });
  });

  describe('positionCoordinateProps', () => {
    it('matches snapshot', () => {
      expect(positionCoordinateProps).toMatchSnapshot()
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
});