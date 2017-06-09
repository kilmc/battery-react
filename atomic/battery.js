import entries from 'object.entries';
Object.entries = entries;

// Utilities
const compose = (...functions) =>
  functions.reduce((f, g) => (...xs) => f(g(...xs)));

const identity = x => x;

Array.prototype.flatMap = function(fn) {
  return this.map(fn).reduce((xs, x) => xs.concat(x), []);
};

// ------------------------------------------------------------------
// =====================  B A T T E R Y  ============================
// ------------------------------------------------------------------

export const baseRemify = config => x => x / config.baseFontSize;
export const baseScaler = config => x => x * config.baseUnit;
export const baseOpacify = x => x / 10;
export const baseColorHex = config => name => config.systemColors[name];

// lengths
// ------------------------------------------------------------------
// Generates an object with length type values. The output of this
// is meant to be used with the valuesCompile function.

export const baseLengths = config => ({
  values,
  unitIndicator = '',
  lengthUnit = '',
  valueConverters = [identity],
  negative = false,
  separator = config.lengthValueSeparator || ''
}) => {
  return values.reduce((obj, value) => {
    const minus = negative ? '-' : '';
    const negativeIndicator = negative ? config.negativeValueIndicator : '';

    obj[
      `${separator}${negativeIndicator}${value}${unitIndicator}`
    ] = `${minus}${compose(...valueConverters)(value)}${lengthUnit}`;
    return obj;
  }, {});
};

// Color value generator
// ------------------------------------------------------------------
// Converts an array of color names into an object with color names
// and color hex values.

export const baseColors = config => (
  array,
  separator = config.colorValueSeparator
) => {
  return array.reduce((obj, value) => {
    obj[`${separator}${value}`] = config.systemColors[value];
    return obj;
  }, {});
};

// Integer Values
// ------------------------------------------------------------------

export const baseIntegers = config => (
  arr,
  separator = config.integerValueSeparator
) =>
  arr.reduce((xs, x) => {
    xs[`${separator}${x}`] = x;
    return xs;
  }, {});

// Keyword Values
// ------------------------------------------------------------------

export const baseKeywords = config => (
  obj,
  separator = config.keywordValueSeparator
) => {
  const newKey = key => separator.concat(key);
  return Object.assign(
    {},
    ...Object.keys(obj).map(key => ({ [newKey(key)]: obj[key] }))
  );
};

export const defaultValue = str => ({ '': str });

// ------------------------------------------------------------------
// C O M P I L E R
// ------------------------------------------------------------------

// valueObjectFormat
// ------------------------------------------------------------------
// Formats input as a valueObject

const valueObjectFormat = ({
  name,
  value,
  type = 'none',
  breakpoint = '',
  psuedo = ''
}) => ({
  valueName: name,
  value: value,
  valueType: type,
  breakpoint: breakpoint,
  psuedo: psuedo
});

// valuesCompile
// ------------------------------------------------------------------
// Iterates over an object and passes each entry to the
// valueObject formatter.

const valuesCompile = ({
  values,
  breakpoint,
  type = 'none',
  psuedo = ''
}) =>
  Object.entries(values).map(([name, value]) =>
    valueObjectFormat({ name, value, type, breakpoint, psuedo })
  );

// propsCompile
// ------------------------------------------------------------------
// Converts a propsConfig object into an array containing objects
// correctly formatted to be merged with a valueObject

const propsCompile = ({
  props,
  subProps = {},
  propSeparator = '',
  subPropSeparator = '',
  root = true
}) =>
  Object.assign(
    ...Object.entries(props).map(([propName, prop]) => ({
      [prop]: [
        root ? { propName: propName, props: [prop] } : {},
        ...Object.entries(subProps).map(([subPropName, subProps]) => ({
          propName: `${propName}${propSeparator}${subPropName}${subPropSeparator}`,
          props: subProps.map(sp => `${prop}-${sp}`)
        }))
      ]
    }))
  );

// propsValuesMerge
// ------------------------------------------------------------------
// Merges an array of valueObjects with an array of propObjects and
// forms a classObject

export const propsValuesMerge = (props, values) => {
  return props.flatMap(prop => values.map(value => ({ ...prop, ...value })))
}



// ------------------------------------------------------------------
// C L A S S  P R I N T E R
// ------------------------------------------------------------------

// printProps
// ------------------------------------------------------------------
// Creates a formatted block of CSS property and value sets as a
// string which can be passed to a another to printClass to finish
// formatting

export const printProps = (classObj, multiple) => {
  return Object.entries(classObj[Object.keys(classObj)])
    .map(([prop, value]) =>
      multiple ? `\n${prop}: ${value};` : `${prop}: ${value}`)
    .join('');
};

// printClass
// ------------------------------------------------------------------
// Creates a formatted block of classes in a string which can be
// passed to a another function to render it into a CSS file.

export const printClass = classObj => {
  const multiple = Object.keys(classObj[Object.keys(classObj)]).length > 1;
  const className = Object.keys(classObj);

  let renderedClass;

  if (multiple) {
    renderedClass = `.${className} {${printProps(classObj, multiple)}\n}`;
  } else {
    renderedClass = `.${className} { ${printProps(classObj, multiple)} }`;
  }

  return renderedClass;
};

// printClasses
// ------------------------------------------------------------------
// Run through a

export const printClasses = (allClasses) => {
  return allClasses.map(classObj => printClass(classObj)).join('\n');
}

// printAtom
// ------------------------------------------------------------------

export const basePrintAtom = config => obj => {
  const {
    breakpointsConfig,
  } = config;

  // perScreenBreakpoints
  // ------------------------------------------------------------------
  // An array of breakpoint identifiers exctracted from the
  // breakpointsConfig to be used to compile perScreen media queries

  const perScreenBreakpoints = Object.entries(breakpointsConfig).map(
    ([bp, val]) => bp
  );

  // mobileFirstBreakpoints
  // ------------------------------------------------------------------
  // An array of breakpoint identifiers exctracted from the
  // breakpointsConfig to be used to compile mobileFirst media queries

  const mobileFirstBreakpoints = perScreenBreakpoints.slice(1);

  // mobileFirstQueries
  // ------------------------------------------------------------------
  // Creates an object with mobileFirst media query params

  const mobileFirstQueries = mobileFirstBreakpoints.reduce((accum, bp) => {
    accum[bp] = `(min-width: ${breakpointsConfig[bp]}px)`;
    return accum;
  }, {});

  // perScreenQueries
  // ------------------------------------------------------------------
  // Creates an object with media query arguments per screen

  const perScreenQueries = () => {
    const min = perScreenBreakpoints.slice(1);
    const max = perScreenBreakpoints.slice(0, -1);
    const both = min.filter(n => max.indexOf(n) !== -1)
    const allQueries = Object.keys(breakpointsConfig).reduce((accum, bp) => {
      accum[bp] = '';
      return accum;
    }, {});

    min.map(bp => (allQueries[bp] = `(min-width: ${breakpointsConfig[bp]}px)`));

    let count = 0;
    max.map(bp => {
      count++;
      allQueries[bp] +=
        `(max-width: ${breakpointsConfig[perScreenBreakpoints[count]] - 1}px)`;
    });

    both.map(bp => {
      allQueries[bp] = allQueries[bp].replace(')(', ') and (');
    });

    return allQueries;
  };

  // printBreakpoint
  // ------------------------------------------------------------------

  const printBreakpoint = ([bp, classObjs], mediaQueryObj) => {
    return `@media ${mediaQueryObj[bp]} {\n${printClasses(classObjs)}\n}\n`;
  };

  // printMobileFirst
  // ------------------------------------------------------------------

  const printMobileFirst = obj => Object.entries(obj)
    .map(([bp, classObjs]) =>
      printBreakpoint([bp, classObjs], mobileFirstQueries))
    .join('\n');

  // printPerScreen
  // ------------------------------------------------------------------

  const printPerScreen = obj => Object.entries(obj)
    .map(([bp, cxs]) =>
      printBreakpoint([bp, cxs], perScreenQueries()))
    .join('\n');

  const allValues = Object.keys(obj)
    .map(propGroup => printClasses(obj[propGroup].values.all));

  const allMobileFirst = Object.keys(obj).map(
    propGroup => obj[propGroup].mobileFirstValues
  ) === [[]]
    ? ''
    : Object.keys(obj).map(propGroup =>
        printMobileFirst(obj[propGroup].mobileFirstValues)
      );

  const allPerScreen = Object.keys(obj).map(
    propGroup => obj[propGroup].perScreenValues
  ) === [[]]
    ? ''
    : Object.keys(obj).map(propGroup =>
        printPerScreen(obj[propGroup].perScreenValues)
      );

  return allValues
    .concat(allMobileFirst)
    .concat(allPerScreen)
    .join('\n');
};


// Compiler
// ------------------------------------------------------------------

export const baseCompile = config => atoms => {
  const {
    breakpointPrefixOrSuffix,
    breakpointsConfig,
    breakpointSeparator
  } = config;

  // breakpointClassFormat
  // ------------------------------------------------------------------
  // Adds a breakpoint indicator as a suffix or prefix depending on
  // the user config.

  const breakpointClassFormat = (baseClass, breakpoint) =>
    breakpointPrefixOrSuffix === 'suffix'
      ? baseClass.concat(breakpointSeparator, breakpoint)
      : breakpoint.concat(breakpointSeparator, baseClass);

  // classCompile
  // ------------------------------------------------------------------
  // Converts a classObject into a complete class. Optionally adds
  // a breakpoint indicator.

  const classCompile = ({
    propName,
    props,
    valueName,
    value,
    breakpoint = '',
    psuedo = ''
  }) => {
    let baseClassName = `${propName}${valueName}`;
    if (breakpoint !== '') {
      baseClassName = breakpointClassFormat(baseClassName, breakpoint);
    }

    if (psuedo !== '') {
      baseClassName += `:${psuedo}`
    }
    return {
      [`${baseClassName}`]: Object.assign(
        ...props.map(prop => ({
          [prop]: value
        }))
      )
    };
  };

  // breakpointsClassCompile
  // ------------------------------------------------------------------
  // Converts a list of props, values and breakpoints into a set of
  // breakpoint specific arrays with breakpoint namespaced classes

  const breakpointsClassCompile = ({ prop, values, breakpoints, psuedo }) => {
    return values === undefined
      ? []
      : breakpoints.reduce((obj, breakpoint) => {
          obj[breakpoint] = propsValuesMerge(prop, valuesCompile({
            values,
            breakpoint,
            psuedo
          })).map(
            classCompile
          );
          return obj;
        }, {});
  };

  // perScreenBreakpoints
  // ------------------------------------------------------------------
  // An array of breakpoint identifiers exctracted from the
  // breakpointsConfig to be used to compile perScreen media queries

  const perScreenBreakpoints = Object.entries(breakpointsConfig).map(
    ([bp, val]) => bp
  );

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
    subPropSeparator = '',
    psuedo = '',
    values = [],
    mobileFirstValues,
    perScreenValues
  }) => {
    const propGroups = propsCompile({
      props,
      propSeparator,
      subProps,
      subPropSeparator
    });

    return Object.assign(
      ...Object.entries(props).map(([propName, prop]) => ({
        [prop]: {
          values: {
            all: propsValuesMerge(
              propGroups[prop],
              valuesCompile({
                values: Object.assign(values, mobileFirstValues),
                psuedo
              })
            ).map(classCompile)
          },
          mobileFirstValues: breakpointsClassCompile({
            prop: propGroups[prop],
            values: mobileFirstValues,
            breakpoints: mobileFirstBreakpoints,
            psuedo
          }),
          perScreenValues: breakpointsClassCompile({
            prop: propGroups[prop],
            values: perScreenValues,
            breakpoints: perScreenBreakpoints,
            psuedo
          })
        }
      }))
    );
  };

  // atomList
  // ------------------------------------------------------------------
  // Generates an object with all classes and their associated
  // declarations

  const atomList = ({
    props,
    propSeparator = '',
    subProps = {},
    subPropSeparator = '',
    psuedo = '',
    values = [],
    mobileFirstValues = [],
    perScreenValues = []
  }) => {
    const propGroups = propsCompile({
      props,
      propSeparator,
      subProps,
      subPropSeparator
    });

    return Object.entries(props).flatMap(([propName, prop]) =>
      propsValuesMerge(
        propGroups[prop],
        valuesCompile({
          values: Object.assign(values, mobileFirstValues)
        }))
      .map(classCompile)
      .concat(
        ...mobileFirstBreakpoints.map(breakpoint =>
          propsValuesMerge(
            propGroups[prop],
            valuesCompile({
              values: mobileFirstValues,
              breakpoint,
              psuedo
            })
          ).map(classCompile)
        ))
      .concat(
        ...perScreenBreakpoints.map(breakpoint =>
          propsValuesMerge(
            propGroups[prop],
            valuesCompile({
              values: perScreenValues,
              breakpoint,
              psuedo
            })
          ).map(classCompile)
        )
      )
    );
  };

  const allAtoms = Object.keys(atoms).map(atom => atoms[atom]);
  const atomicJSON = Object.assign({}, ...allAtoms.flatMap(atomList));
  const atomicCSS = allAtoms.flatMap(atomTree);

  return { css: atomicCSS, JSON: atomicJSON };
};


export const compileMolecules = (obj, JSONObject) => {
  return Object.keys(obj)
    .flatMap(x => (
      { [x]: Object.assign({}, ...obj[x].map(y => JSONObject[y]))}
    ))
}
