// eslint-env jest, node

import {
  printProps,
  printClass,
  printClasses,
  printBreakpoint,
  mobileFirstQueries,
  perScreenQueries,
  printMobileFirst,
  printPerScreen,
  // basePrintAtom
} from './battery.printAtoms';

const breakpointsConfig = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1100
}

describe('printProps', () => {
  describe('single prop', () => {
    it('matches snapshot', () => {
      expect(printProps({
        'block': { 'display': 'block' }
      })).toMatchSnapshot()
    });
  });

  describe('multiple props', () => {
    it('matches snapshot', () => {
      expect(printProps({
        'py4': {
          'padding-top': '2.4rem',
          'padding-bottom': '2.4rem'
        }
      }, true)).toMatchSnapshot()
    });
  });
});

describe('printClass', () => {
  describe('single prop', () => {
    it('matches snapshot', () => {
      expect(printClass({
        'rounded': { 'border-radius': '0.2rem' }
      })).toMatchSnapshot()
    });
  });

  describe('multiple props', () => {
    it('matches snapshot', () => {
      expect(printClass({
        'mx2': {
          'margin-top': '1.2rem',
          'margin-bottom': '1.2rem'
        }
      })).toMatchSnapshot()
    });
  });
});

describe('printClasses', () => {
  it('matches snapshot', () => {
    expect(printClasses([
      { 'rounded': { 'border-radius': '0.2rem' } },
      {
        'top-rounded': {
          'border-top-right-radius': '0.2rem',
          'border-top-left-radius': '0.2rem'
        }
      }
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

describe('mobileFirstQueries', () => {
  it('matches snapshot', () => {
    expect(mobileFirstQueries(breakpointsConfig)).toMatchSnapshot()
  });
});

describe('perScreenQueries', () => {
  it('matches snapshot', () => {
    expect(perScreenQueries(breakpointsConfig)).toMatchSnapshot()
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
    },mobileFirstQueries(breakpointsConfig))).toMatchSnapshot()
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
    }, perScreenQueries(breakpointsConfig))).toMatchSnapshot()
  });
});


// describe('printAtom', () => {
//   it('matches snapshot', () => {
//     expect(printAtom(atomTree({
//       props: {
//         '': 'display'
//       },
//       values: {
//         'table': 'table'
//       },
//       perScreenValues: {
//         'hide': 'none'
//       },
//     }))).toMatchSnapshot()
//   });
// });
