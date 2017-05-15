import {
  spacingProps,
  classCompile,
  propsCompile,
  scaleUnits,
  positionCoordinateProps,
  propsValuesMerge,
  pixelUnits
} from './index';

describe('Battery', () => {
  describe('spacingProps', () => {
    it('matches snapshot', () => {
      expect(spacingProps).toEqual()
    });
  });

  describe('propsValuesMerge', () => {
    it('matches expectations', () => {
      expect(propsValuesMerge(
        {
          padding: [
            {
              propName: 'p',
              props: ['padding']
            },
            {
              propName: 'py',
              props: ['padding-top', 'padding-bottom']
            }
          ]
        },
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
      )).toEqual(
        {
          padding: [
            {
              propName: 'p',
              props: ['padding'],
              valueName: '1px',
              value: '0.1rem'
            },
            {
              propName: 'p',
              props: ['padding'],
              valueName: '2px',
              value: '0.2rem'
            },
            {
              propName: 'py',
              props: ['padding-top', 'padding-bottom'],
              valueName: '1px',
              value: '0.1rem'
            },
            {
              propName: 'py',
              props: ['padding-top', 'padding-bottom'],
              valueName: '2px',
              value: '0.2rem'
            }
          ]
        }
      )
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

  describe('flatmap', () => {
    fit('flattens', () => {
      const as = [1,2,3];
      Array.prototype.flatMap = Array.prototype.map;
      expect(as.flatMap(a =>
        [a, a]
      )).toEqual([1,1,2,2,3,3])
    })
  })
});