import {
  spacingProps,
  classCompile,
  propsCompile,
  scaleUnits,
  positionCoordinateProps,
  propsValuesMerge,
  pixelUnits,
  propGroupCompile,
  lengths,
  remify,
  scaler,
  valuesCompile
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
      expect(propGroupCompile({
        props: {
          'p': 'padding',
          'm': 'margin'
        },
        subProps: {
          't': ['top'],
          'x': ['right', 'left']
        },
        responsiveValues: scaleUnits
      })).toEqual(
        {
          'padding': {
            values: [
              {
                propName: 'p',
                props: ['padding'],
                valueName: '1',
                value: '0.6rem'
              },
              {
                propName: 'p',
                props: ['padding'],
                valueName: '2',
                value: '1.2rem'
              },
              {
                propName: 'p',
                props: ['padding'],
                valueName: '3',
                value: '1.8rem'
              },
              {
                propName: 'p',
                props: ['padding'],
                valueName: '4',
                value: '2.4rem'
              },
              {
                propName: 'pt',
                props: ['padding-top'],
                valueName: '1',
                value: '0.6rem'
              },
              {
                propName: 'pt',
                props: ['padding-top'],
                valueName: '2',
                value: '1.2rem'
              },
              {
                propName: 'pt',
                props: ['padding-top'],
                valueName: '3',
                value: '1.8rem'
              },
              {
                propName: 'pt',
                props: ['padding-top'],
                valueName: '4',
                value: '2.4rem'
              },
              {
                propName: 'px',
                props: ['padding-left', 'padding-right'],
                valueName: '1',
                value: '0.6rem'
              },
              {
                propName: 'px',
                props: ['padding-left', 'padding-right'],
                valueName: '2',
                value: '1.2rem'
              },
              {
                propName: 'px',
                props: ['padding-left', 'padding-right'],
                valueName: '3',
                value: '1.8rem'
              },
              {
                propName: 'px',
                props: ['padding-left', 'padding-right'],
                valueName: '4',
                value: '2.4rem'
              }
            ],
            responsiveValues: [
              {
                propName: 'p',
                props: ['padding'],
                valueName: '1',
                value: '0.6rem'
              },
              {
                propName: 'p',
                props: ['padding'],
                valueName: '2',
                value: '1.2rem'
              },
              {
                propName: 'p',
                props: ['padding'],
                valueName: '3',
                value: '1.8rem'
              },
              {
                propName: 'p',
                props: ['padding'],
                valueName: '4',
                value: '2.4rem'
              },
              {
                propName: 'pt',
                props: ['padding-top'],
                valueName: '1',
                value: '0.6rem'
              },
              {
                propName: 'pt',
                props: ['padding-top'],
                valueName: '2',
                value: '1.2rem'
              },
              {
                propName: 'pt',
                props: ['padding-top'],
                valueName: '3',
                value: '1.8rem'
              },
              {
                propName: 'pt',
                props: ['padding-top'],
                valueName: '4',
                value: '2.4rem'
              },
              {
                propName: 'px',
                props: ['padding-left', 'padding-right'],
                valueName: '1',
                value: '0.6rem'
              },
              {
                propName: 'px',
                props: ['padding-left', 'padding-right'],
                valueName: '2',
                value: '1.2rem'
              },
              {
                propName: 'px',
                props: ['padding-left', 'padding-right'],
                valueName: '3',
                value: '1.8rem'
              },
              {
                propName: 'px',
                props: ['padding-left', 'padding-right'],
                valueName: '4',
                value: '2.4rem'
              }
            ]
          },
          'margin': {
            values: [
              {
                propName: 'm',
                props: ['margin'],
                valueName: '1',
                value: '0.6rem'
              },
              {
                propName: 'm',
                props: ['margin'],
                valueName: '2',
                value: '1.2rem'
              },
              {
                propName: 'm',
                props: ['margin'],
                valueName: '3',
                value: '1.8rem'
              },
              {
                propName: 'm',
                props: ['margin'],
                valueName: '4',
                value: '2.4rem'
              },
              {
                propName: 'mt',
                props: ['margin-top'],
                valueName: '1',
                value: '0.6rem'
              },
              {
                propName: 'mt',
                props: ['margin-top'],
                valueName: '2',
                value: '1.2rem'
              },
              {
                propName: 'mt',
                props: ['margin-top'],
                valueName: '3',
                value: '1.8rem'
              },
              {
                propName: 'mt',
                props: ['margin-top'],
                valueName: '4',
                value: '2.4rem'
              },
              {
                propName: 'mx',
                props: ['margin-left', 'margin-right'],
                valueName: '1',
                value: '0.6rem'
              },
              {
                propName: 'mx',
                props: ['margin-left', 'margin-right'],
                valueName: '2',
                value: '1.2rem'
              },
              {
                propName: 'mx',
                props: ['margin-left', 'margin-right'],
                valueName: '3',
                value: '1.8rem'
              },
              {
                propName: 'mx',
                props: ['margin-left', 'margin-right'],
                valueName: '4',
                value: '2.4rem'
              }
            ],
            responsiveValues: [
              {
                propName: 'm',
                props: ['margin'],
                valueName: '1',
                value: '0.6rem'
              },
              {
                propName: 'm',
                props: ['margin'],
                valueName: '2',
                value: '1.2rem'
              },
              {
                propName: 'm',
                props: ['margin'],
                valueName: '3',
                value: '1.8rem'
              },
              {
                propName: 'm',
                props: ['margin'],
                valueName: '4',
                value: '2.4rem'
              },
              {
                propName: 'mt',
                props: ['margin-top'],
                valueName: '1',
                value: '0.6rem'
              },
              {
                propName: 'mt',
                props: ['margin-top'],
                valueName: '2',
                value: '1.2rem'
              },
              {
                propName: 'mt',
                props: ['margin-top'],
                valueName: '3',
                value: '1.8rem'
              },
              {
                propName: 'mt',
                props: ['margin-top'],
                valueName: '4',
                value: '2.4rem'
              },
              {
                propName: 'mx',
                props: ['margin-left', 'margin-right'],
                valueName: '1',
                value: '0.6rem'
              },
              {
                propName: 'mx',
                props: ['margin-left', 'margin-right'],
                valueName: '2',
                value: '1.2rem'
              },
              {
                propName: 'mx',
                props: ['margin-left', 'margin-right'],
                valueName: '3',
                value: '1.8rem'
              },
              {
                propName: 'mx',
                props: ['margin-left', 'margin-right'],
                valueName: '4',
                value: '2.4rem'
              }
            ]
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

  // describe('flatmap', () => {
  //   fit('flattens', () => {
  //     const as = [1,2,3];
  //     Array.prototype.flatMap = function(x) {
  //       return x.map(x)
  //     };
  //     expect(as.flatMap(a =>
  //       [a, a]
  //     )).toEqual([1,1,2,2,3,3])
  //     expect(flatMap(a =>
  //       [a, a]
  //     ), as).toEqual([1,1,2,2,3,3])
  //   })
  // })
});