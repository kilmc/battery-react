// Input
const displayConfig = {
  props: {
    '': 'display'
  },
  values: {
    'table': 'table'
  },
  responsiveValues: {
    'block': 'block',
    'inline': 'inline',
    'inline-block': 'inline-block',
    'flex': 'flex',
  },
  perBreakpointValues: {
    'hide': 'none'
  }
};

// Output
const displayConfigOutput = {
  'display': {
    values: [
      {
        propName: '',
        props: ['display'],
        valueName: 'table',
        value: 'table'
      },
      {
        propName: '',
        props: ['display'],
        valueName: 'block',
        value: 'block'
      },
      {
        propName: '',
        props: ['display'],
        valueName: 'inline',
        value: 'inline'
      },
      {
        propName: '',
        props: ['display'],
        valueName: 'inline-block',
        value: 'inline-block'
      },
      {
        propName: '',
        props: ['display'],
        valueName: 'flex',
        value: 'flex'
      }
    ],
    responsiveValues: [
      {
        propName: '',
        props: ['display'],
        valueName: 'block',
        value: 'block'
      },
      {
        propName: '',
        props: ['display'],
        valueName: 'inline',
        value: 'inline'
      },
      {
        propName: '',
        props: ['display'],
        valueName: 'inline-block',
        value: 'inline-block'
      },
      {
        propName: '',
        props: ['display'],
        valueName: 'flex',
        value: 'flex'
      }
    ],
    perBreakpointValues: [
      {
        propName: '',
        props: ['display'],
        valueName: 'hide',
        value: 'none'
      }
    ]
  }
}

// Input
const spaceConfig = {
  props: {
    'p': 'padding',
    'm': 'margin'
  },
  subProps: {
    't': ['top'],
    'x': ['right', 'left']
  },
  responsiveValues: [
    lengths({
      values: [1,2,3,4],
      transform: [remify, scaler],
      valueSuffix: 'rem'
    })
  ]
}

// Output
const spaceConfigOutput = {
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


const atomStructure = {
  'display': {
    values: {
      'table': {
        'display': 'table'
      },
      'block': {
        'display': 'block'
      },
      'inline': {
        'display': 'inline'
      },
      'inline-block': {
        'display': 'inline-block'
      },
      'flex': {
        'display': 'flex'
      }
    },
    responsiveValues: {
      sm: {
        'block-sm': {
          'display': 'block'
        },
        'inline-sm': {
          'display': 'inline'
        },
        'inline-block-sm': {
          'display': 'inline-block'
        },
        'flex-sm': {
          'display': 'flex'
        }
      },
      md: {
        'block-md': {
          'display': 'block'
        },
        'inline-md': {
          'display': 'inline'
        },
        'inline-block-md': {
          'display': 'inline-block'
        },
        'flex-md': {
          'display': 'flex'
        }
      },
      lg: {
        'block-lg': {
          'display': 'block'
        },
        'inline-lg': {
          'display': 'inline'
        },
        'inline-block-lg': {
          'display': 'inline-block'
        },
        'flex-lg': {
          'display': 'flex'
        }
      }
    },
    perBreakpointValues: {
      xs: {
        'hide': {
          'display': 'none'
        }
      },
      sm: {
        'hide': {
          'display': 'none'
        }
      },
      md: {
        'hide': {
          'display': 'none'
        }
      },
      lg: {
        'hide': {
          'display': 'none'
        }
      }
    }
  }
}