import {
  spacingProps,
  classCompile,
  propsCompile,
  scaleUnits,
  positionCoordinateProps,
  propsValuesMerge,
  pixelUnits,
  propGroupCompile
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

  describe('propGroupCompile', () => {
    it('matches expectations', () => {
      expect(propGroupCompile(
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
      )).toEqual(
        {
          padding: {
            "p1px": {
              "padding:": "0.1rem"
            },
            "p2px": {
              "padding": "0.2rem"
            },
            "py1px": {
              'padding-top': "0.1rem",
              'padding-bottom': "0.1rem"
            },
            "py2px": {
              'padding-top': "0.2rem",
              'padding-bottom': "0.2rem"
            }
          }
        }
      )
    });
  });

  describe('scaleUnits', () => {
    it('matches snapshot', () => {
      expect(scaleUnits).toMatchSnapshot()
    });
  });

  // describe('positionCoordinateProps', () => {
  //   it('matches snapshot', () => {
  //     expect(positionCoordinateProps).toMatchSnapshot()
  //   });
  // });

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
      Array.prototype.flatMap = function(x) {
        return x.map(x)
      };
      expect(as.flatMap(a =>
        [a, a]
      )).toEqual([1,1,2,2,3,3])
      expect(flatMap(a =>
        [a, a]
      ), as).toEqual([1,1,2,2,3,3])
    })
  })
});