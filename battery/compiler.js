import entries from 'object.entries';
Object.entries = entries;

Array.prototype.flatMap = function(fn) {
  return this.map(fn).reduce((xs, x) => xs.concat(x), []);
};

// ------------------------------------------------------------------
// C O M P I L E R
// ------------------------------------------------------------------

// valueObjectFormat
// ------------------------------------------------------------------
// Formats input as a valueObject

export const valueObjectFormat = ({
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

export const valuesCompile = ({
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

export const propsCompile = ({
  props,
  subProps = {},
  propSeparator = '',
  subPropSeparator = '',
  includeShorthand = true
}) => {
  const formatBorderSubProps = (prop,sp) => {
    let fullProp = prop.split(/-/);
    fullProp.splice(1,0,sp)
    return fullProp.join('-')
  }
  return Object.assign(
    ...Object.entries(props).map(([propName, prop]) => ({
      [prop]: [
        includeShorthand ? { propName: propName, props: [prop] } : {},
        ...Object.entries(subProps).map(([subPropName, subProps]) => ({
          propName: `${propName}${propSeparator}${subPropName}${subPropSeparator}`,
          props: subProps.map(sp =>
            prop.includes('border-')
            ? formatBorderSubProps(prop,sp)
            : `${prop}-${sp}`)
        }))
      ]
    }))
  )};

// propsValuesMerge
// ------------------------------------------------------------------
// Merges an array of valueObjects with an array of propObjects and
// forms a classObject

export const propsValuesMerge = (props, values) => {
  return props.flatMap(prop => values.map(value => ({ ...prop, ...value })))
}

// breakpointClassFormat
// ------------------------------------------------------------------
// Adds a breakpoint indicator as a suffix or prefix depending on
// the user config.

export const breakpointClassFormat = (bpPosition, separator) =>
  (baseClass, breakpoint) =>
    bpPosition === 'suffix'
      ? baseClass.concat(separator, breakpoint)
      : breakpoint.concat(separator, baseClass);


// classCompile
// ------------------------------------------------------------------
// Converts a classObject into a complete class. Optionally adds
// a breakpoint indicator.

export const classCompile = (
  {
    propName,
    props,
    valueName,
    value,
    breakpoint = '',
    psuedo = ''
  },
  breakpointPrefixOrSuffix,
  breakpointSeparator
) => {
  const _breakpointClassFormat = breakpointClassFormat(
    breakpointPrefixOrSuffix,
    breakpointSeparator
  )
  let baseClassName = `${propName}${valueName}`;
  if (breakpoint !== '') {
    baseClassName = _breakpointClassFormat(baseClassName, breakpoint);
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

export const breakpointsClassCompile = (
  { prop, values, breakpoints, psuedo },
  breakpointPrefixOrSuffix,
  breakpointSeparator
) => {
  if (values === undefined) { return [] }

  return breakpoints.reduce((obj, breakpoint) => {
    obj[breakpoint] = propsValuesMerge(prop, valuesCompile({
      values,
      breakpoint,
      psuedo
    })).map(x =>
      classCompile(x,breakpointPrefixOrSuffix,breakpointSeparator)
    );
    return obj;
  }, {});
};

  // atomTree
  // ------------------------------------------------------------------
  // Wraps up all functionality to process a minimal set of inputs into
  // an object containing all classes for a given CSS property

export const atomTree = ({
  props,
  propSeparator = '',
  subProps = {},
  subPropSeparator = '',
  psuedo = '',
  values = [],
  mobileFirstValues,
  perScreenValues
}, config) => {
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
        mobileFirstValues: breakpointsClassCompile(
          {
            prop: propGroups[prop],
            values: mobileFirstValues,
            breakpoints: Object.keys(config.breakpointsConfig),
            psuedo
          },
          config.breakpointPrefixOrSuffix,
          config.breakpointSeparator
        ),
        perScreenValues: breakpointsClassCompile(
          {
            prop: propGroups[prop],
            values: perScreenValues,
            breakpoints: Object.keys(config.breakpointsConfig).slice(1),
            psuedo
          },
          config.breakpointPrefixOrSuffix,
          config.breakpointSeparator
        )
      }
    }))
  );
};

// atomList
// ------------------------------------------------------------------
// Generates an object with all classes and their associated
// declarations

export const atomList = ({
  props,
  propSeparator = '',
  subProps = {},
  subPropSeparator = '',
  psuedo = '',
  values = [],
  mobileFirstValues = [],
  perScreenValues = []
}, config) => {
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
    .map(x => classCompile(
      x,
      config.breakpointPrefixOrSuffix,
      config.breakpointSeparator
    ))
    .concat(
      ...Object.keys(config.breakpointsConfig).map(breakpoint =>
        propsValuesMerge(
          propGroups[prop],
          valuesCompile({
            values: mobileFirstValues,
            breakpoint,
            psuedo
          })
        ).map(x => classCompile(
          x,
          config.breakpointPrefixOrSuffix,
          config.breakpointSeparator)
        )
      ))
    .concat(
      ...Object.keys(config.breakpointsConfig).slice(1).map(breakpoint =>
        propsValuesMerge(
          propGroups[prop],
          valuesCompile({
            values: perScreenValues,
            breakpoint,
            psuedo
          })
        ).map(x => classCompile(
          x,
          config.breakpointPrefixOrSuffix,
          config.breakpointSeparator)
        )
      )
    )
  );
};

// Compiler
// ------------------------------------------------------------------

export const baseCompileAtoms = config => atoms => {

  const allAtoms = Object.keys(atoms).map(atom => atoms[atom]);
  const atomicJSON = Object.assign(
    {}, ...allAtoms.flatMap(x => atomList(x,config))
  );
  const atomicCSS = allAtoms.flatMap(x => atomTree(x,config));

  return { css: atomicCSS, JSON: atomicJSON };
};

export const compileMolecules = (obj, JSONObject) => {
  return Object.keys(obj)
    .flatMap(x => (
      { [x]: Object.assign({}, ...obj[x].map(y => JSONObject[y]))}
    ))
}