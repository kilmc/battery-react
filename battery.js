import entries from 'object.entries';
Object.entries = entries;

const compose = (...functions) =>
  functions.reduce((f, g) => (...xs) => f(g(...xs)));
const identity = x => x;

Array.prototype.flatMap = function(fn) {
  return this
    .map(fn)
    .reduce((xs,x) => xs.concat(x),[])
}


// ------------------------------------------------------------------
// Atomic Functions
// ------------------------------------------------------------------
export const compile = ({
  config,
  atoms
}) => {
  // Config setup
  const [
    baseFontSize,
    baseUnit,
    systemColors,
    negativeValueIndicator,
    breakpointPrefixOrSuffix,
    breakpointsConfig,
    breakpointSeparator
  ] = config;

  // Core functions
  const remify = (x) => x/baseFontSize;
  const scaler = (x) => x*baseUnit;
  const colorHex = (name) => systemColors[name];

  // valueObject
  // ------------------------------------------------------------------
  // The valueObject is one half of the core information needed to
  // generate a full classObject. The following is an example of a
  // correctly formatted valueObject.

  // valueObjectFormat
  // ------------------------------------------------------------------
  // Formats input as a valueObject

  const valueObjectFormat = ({
    name,
    value,
    type = 'none',
    breakpoint = ''
  }) => ({
    'valueName': name,
    'value': value,
    'valueType': type,
    'breakpoint': breakpoint
  });

  // valuesCompile
  // ------------------------------------------------------------------
  // Iterates over an object and passes each entry to the
  // valueObject formatter.

  const valuesCompile = (values, breakpoint, type = 'none') => (
    Object.entries(values).map(([name, value]) =>
      valueObjectFormat({name, value, type, breakpoint}))
  );

  // lengths
  // ------------------------------------------------------------------
  // Generates an object with length type values. The output of this
  // is meant to be used with the valuesCompile function.

  const lengths = ({
    values,
    keySuffix = '',
    valueSuffix = '',
    transform = [identity],
    negative = false
  }) => {
    return values.reduce((obj, value) => {
      const minus = negative ? '-' : '';
      const negativeIndicator = negative ? negativeValueIndicator : '';

      obj[`${negativeIndicator}${value}${keySuffix}`] = `${minus}${compose(...transform)(value)}${valueSuffix}`;
      return obj;
    },{});
  };

  const percentages = (units) => lengths({
    values: units,
    keySuffix: "p",
    valueSuffix: '%'
  });

  const viewportHeights = (units) => lengths({
    values: units,
    keySuffix: "vh",
    valueSuffix: 'vh'
  });

  const viewportWidths = (units) => lengths({
    values: units,
    keySuffix: "vw",
    valueSuffix: 'vw'
  });

  const pixels = (units) => lengths({
    values: units,
    transform: [remify],
    keySuffix: "px",
    valueSuffix: 'rem'
  });

  const scalers = (units) => lengths({
    values: units,
    transform: [remify, scaler],
    valueSuffix: 'rem'
  });

  // Color value generator
  // ------------------------------------------------------------------
  // Converts an array of color names into an object with color names
  // and color hex values.

  const colors = (array) => {
    return array.reduce((obj, value) => {
      obj[value] = systemColors[value];
      return obj
    },{});
  };

  // propObject
  // ------------------------------------------------------------------
  // The propObject is the second half of the core information needed
  // to generate a full classObject. The following is an example of a
  // correctly formatted propObject.

  // propsCompile
  // ------------------------------------------------------------------
  // Converts a propsConfig object into an array containing objects
  // correctly formatted to be merged with a valueObject

  const propsCompile = ({
    props,
    subProps = {},
    propSeparator = '',
    root = true
  }) => Object.assign(
    ...Object.entries(props).map(([propName, prop]) => ({
      [prop]: [
        root ? { "propName": propName, "props": [prop] } : {},
        ...Object.entries(subProps).map(([subPropName, subProps]) => ({
          "propName": `${propName}${propSeparator}${subPropName}`,
          "props": subProps.map((sp) => `${prop}-${sp}`)
        }))
      ]
    }))
  );

  // propsValuesMerge
  // ------------------------------------------------------------------
  // Merges an array of valueObjects with an array of propObjects and
  // forms a classObject

  const propsValuesMerge = (props, values) => Object.assign(
    props.reduce((accum, prop) => (
      accum.concat(values.map(value => (
        { ...prop, ...value }
      )))
    ), [])
  );

  // breakpointClassFormat
  // ------------------------------------------------------------------
  // Adds a breakpoint indicator as a suffix or prefix depending on
  // the user config.

  const breakpointClassFormat = (baseClass,breakpoint) =>
    breakpointPrefixOrSuffix === 'suffix'
      ? baseClass.concat(breakpointSeparator,breakpoint)
      : breakpoint.concat(breakpointSeparator,baseClass);

  // classCompile
  // ------------------------------------------------------------------
  // Converts a classObject into a complete class. Optionally adds
  // a breakpoint indicator.

  const classCompile = ({
    propName,
    props,
    valueName,
    value,
    breakpoint = ''
  }) => {
    let baseClassName = `${propName}${valueName}`;
    if (breakpoint !== '') {
      baseClassName = breakpointClassFormat(baseClassName,breakpoint);
    }
    return {
      [`${baseClassName}`]: Object.assign(
        ...props.map((prop) => ({
          [prop]: value
        }))
      )
    }
  };

  // breakpointsClassCompile
  // ------------------------------------------------------------------
  // Converts a list of props, values and breakpoints into a set of
  // breakpoint specific arrays with breakpoint namespaced classes

  const breakpointsClassCompile = ({
    prop,
    values,
    breakpoints
  }) => {
    return breakpoints.reduce((obj,bp) => {
      obj[bp] = propsValuesMerge(
        prop,
        valuesCompile(values, bp)
      ).map(classCompile)
      return obj
    }, {})
  };

  // perScreenBreakpoints
  // ------------------------------------------------------------------
  // An array of breakpoint identifiers exctracted from the
  // breakpointsConfig to be used to compile perScreen media queries

  const perScreenBreakpoints = Object.entries(breakpointsConfig)
    .map(([bp, val]) => bp);

  // mobileFirstBreakpoints
  // ------------------------------------------------------------------
  // An array of breakpoint identifiers exctracted from the
  // breakpointsConfig to be used to compile mobileFirst media queries

  const mobileFirstBreakpoints = perScreenBreakpoints.slice(1);

  // atomTree
  // ------------------------------------------------------------------
  // Wraps up all functionality to process a minimal set of inputs into
  // an object containing all classes for a given CSS property

  const atomTree = ({
    props,
    propSeparator = '',
    subProps = {},
    values = [],
    mobileFirstValues = [],
    perScreenValues = []
  }) => {
    const propGroups = propsCompile({props, propSeparator, subProps})

    return Object.assign(
      ...Object.entries(props).map(([propName, prop]) => ({
        [prop]: {
          "values": {
            all: propsValuesMerge(
                  propGroups[prop],
                  valuesCompile(Object.assign(values, mobileFirstValues))
                  ).map(classCompile)
          },
          "mobileFirstValues": mobileFirstValues === [] ? '' : breakpointsClassCompile({
            prop: propGroups[prop],
            values: mobileFirstValues,
            breakpoints: mobileFirstBreakpoints
          }),
          "perScreenValues": perScreenValues === [] ? '' :  breakpointsClassCompile({
            prop: propGroups[prop],
            values: perScreenValues,
            breakpoints: perScreenBreakpoints
          })
        }
      })
    ))
  };

  // atomList
  // ------------------------------------------------------------------
  // Generates an object with all classes and their associated
  // declarations

  const atomList = ({
    props,
    propSeparator = '',
    subProps = {},
    values = [],
    mobileFirstValues = [],
    perScreenValues = []
  }) => {
    const propGroups = propsCompile({props, propSeparator, subProps})

    return Object.assign({}, ...Object.assign(
      ...Object.entries(props).map(([propName, prop]) => (
        propsValuesMerge(
          propGroups[prop],
          valuesCompile(Object.assign(values, mobileFirstValues))
        ).map(classCompile)
        .concat(
          ...mobileFirstBreakpoints.map(bp => (
            propsValuesMerge(
              propGroups[prop],
              valuesCompile(mobileFirstValues, bp)
            ).map(classCompile)
          ))
        ).concat(
          ...perScreenBreakpoints.map(bp => (
            propsValuesMerge(
              propGroups[prop],
              valuesCompile(perScreenValues, bp)
            ).map(classCompile)
          ))
        )
      ))
    ));
  }

  // mobileFirstQueries
  // ------------------------------------------------------------------
  // Creates an object with mobileFirst media query params

  const mobileFirstQueries = mobileFirstBreakpoints.reduce((accum, bp) => {
    accum[bp] = `(min-width: ${breakpointsConfig[bp]}px)`
    return accum
  }, {})

  // perScreenQueries
  // ------------------------------------------------------------------
  // Creates an object with media query arguments per screen

  const perScreenQueries = () => {
    const min = perScreenBreakpoints.slice(1)
    const max = perScreenBreakpoints.slice(0, -1)
    const both = min.filter(n => max.indexOf(n) !== -1);

    const allQueries = Object.keys(breakpointsConfig)
      .reduce((accum, bp) => {
        accum[bp] = ''
        return accum
      }, {});

    min.map(bp => (
      allQueries[bp] = `(min-width: ${breakpointsConfig[bp]}px)`
    ))

    let count = 0;
    max.map(bp => {
      count++
      allQueries[bp] +=
        `(max-width: ${breakpointsConfig[perScreenBreakpoints[count]]-1}px)`
    })

    both.map(bp => {
      allQueries[bp] = allQueries[bp].replace(')(',') and (');
    })

    return allQueries;
  };

  // printProps
  // ------------------------------------------------------------------
  // Creates a formatted block of CSS property and value sets as a
  // string which can be passed to a another to printClass to finish
  // formatting

  const printProps = (classObj, multiple) => {
    return String(Object.entries(classObj[Object.keys(classObj)]).map(
      ([prop, value]) => (
        multiple ? `\t${prop}: ${value};\n` : `${prop}: ${value}`
      )
    )).replace(',','').trim()
  }

  // printClass
  // ------------------------------------------------------------------
  // Creates a formatted block of classes in a string which can be
  // passed to a another function to render it into a CSS file.

  const printClass = (classObj) => {
    const multiple = Object.keys(classObj[Object.keys(classObj)]).length > 1;
    const className = Object.keys(classObj)

    let renderedClass;
    if (multiple) {
      renderedClass = `.${className} {\n\t${printProps(classObj, multiple)}\n}\n`
    } else {
      renderedClass = `.${className} { ${printProps(classObj, multiple)} }`
    }
    return renderedClass
  }

  // printClasses
  // ------------------------------------------------------------------
  // Run through a
  const printClasses = (allClasses) => {
    return String(allClasses.map(classObj => printClass(classObj))).replace(/,/g,'\n')
  }

  // printBreakpoint
  // ------------------------------------------------------------------

  const printBreakpoint = ([bp, classObjs], mediaQueryObj) => {
    return `@media ${mediaQueryObj[bp]} {\n${printClasses(classObjs)}\n}\n`
  }

  // printMobileFirst
  // ------------------------------------------------------------------

  const printMobileFirst = (obj) => {
    return String(
      Object.entries(obj)
        .map(([bp,classObjs]) => printBreakpoint([bp,classObjs], mobileFirstQueries))
      )
  }

  // printPerScreen
  // ------------------------------------------------------------------

  const printPerScreen = (obj) => {
    return String(
      Object.entries(obj)
        .map(([bp,cxs]) => printBreakpoint([bp,cxs], perScreenQueries()))
    )
  }

  // printAtom
  // ------------------------------------------------------------------

  const printAtom = (obj) => {
    const everyClass = Object.keys(obj).map(propGroup => {
      return printClasses(obj[propGroup].values.all).concat('\n')
        .concat('\n',printMobileFirst(obj[propGroup].mobileFirstValues))
        .concat('\n',printPerScreen(obj[propGroup].perScreenValues));
    })

    return String(everyClass).replace(/,@/g,'\n@')
  };


  const allAtoms = Object.keys(atoms).map(atom => atoms[atom]);
}






























