// map     :: [A] ~> (A ->  B ) -> [B]
// flatMap :: [A] ~> (A -> [B]) -> [B]

declare global {
  interface Array<T> {
    flatMap<B>(fn: (x: T) => B[]): Array<B>;
  }
}

Array.prototype.flatMap = function<T, B>(fn: (x: T) => B[]) {
  return this.map(fn).reduce((xs, x) => xs.concat(x), []);
};

// ------------------------------------------------------------------
// C O M P I L E R
// ------------------------------------------------------------------

// valueObjectFormat
// ------------------------------------------------------------------
// Formats input as a valueObject

type Pseudo = 'hover' | 'focus' | 'active' | 'target' | 'before' | 'after' | '';

interface ValueObject {
  name: string;
  value: string;
  type: string;
  breakpoint: string;
  pseudo: Pseudo;
}

interface FormattedValueObject {
  valueName: string;
  value: string;
  valueType: string;
  breakpoint: string;
  pseudo: Pseudo;
}

export const valueObjectFormat = ({
  name,
  value,
  type = 'none',
  breakpoint = '',
  pseudo = ''
}: ValueObject): FormattedValueObject => ({
  valueName: name,
  value,
  valueType: type,
  breakpoint,
  pseudo
});

// valuesCompile
// ------------------------------------------------------------------
// Iterates over an object and passes each entry to the
// valueObject formatter.

export const valuesCompile = ({
  values,
  breakpoint = '',
  type = 'none',
  pseudo = ''
}: {
  values: { [key: string]: string };
  breakpoint?: string;
  type?: string;
  pseudo?: Pseudo;
}) =>
  Object.entries(values).map(([name, value]) =>
    valueObjectFormat({ name, value, type, breakpoint, pseudo })
  );

// propsCompile
// ------------------------------------------------------------------
// Converts a propsConfig object into an array containing objects
// correctly formatted to be merged with a valueObject

export const propsCompile = ({
  props = {},
  subProps = {},
  propSeparator = '',
  subPropSeparator = '',
  includeShorthand = true
}: {
  props: { [key: string]: string };
  subProps: { [key: string]: string[] };
  propSeparator: string;
  subPropSeparator: string;
  includeShorthand?: boolean;
}) => {
  const formatBorderSubProps = (prop: string, sp: string) => {
    let fullProp = prop.split(/-/);
    fullProp.splice(1, 0, sp);
    return fullProp.join('-');
  };

  return Object.assign(
    {},
    ...Object.entries(props).map(([propName, prop]) => ({
      [prop]: [
        includeShorthand ? { propName: propName, props: [prop] } : {},
        ...Object.entries(subProps).map(([subPropName, sps]) => ({
          propName: `${propName}${propSeparator}${subPropName}${subPropSeparator}`,
          props: sps.map(
            sp =>
              prop.includes('border-')
                ? formatBorderSubProps(prop, sp)
                : `${prop}-${sp}`
          )
        }))
      ]
    }))
  );
};

// propsValuesMerge
// ------------------------------------------------------------------
// Merges an array of valueObjects with an array of propObjects and
// forms a classObject

interface PropsObject {
  propName: string;
  props: string[];
}

export const propsValuesMerge = (
  props: PropsObject[],
  values: FormattedValueObject[]
) => {
  return props.flatMap(prop => values.map(value => ({ ...prop, ...value })));
};

// breakpointClassFormat
// ------------------------------------------------------------------
// Adds a breakpoint indicator as a suffix or prefix depending on
// the user config.

export const breakpointClassFormat = (
  bpPosition: 'prefix' | 'suffix',
  separator: string
) => (baseClass: string, breakpoint: string) =>
  bpPosition === 'suffix'
    ? baseClass + separator + breakpoint
    : breakpoint + separator + baseClass;

// classCompile
// ------------------------------------------------------------------
// Converts a classObject into a complete class. Optionally adds
// a breakpoint indicator.
type ClassObject = FormattedValueObject & PropsObject;
type CompiledClassObject = { [key: string]: { [key: string]: string } };

export const classCompile = (
  {
    propName,
    props,
    valueName,
    value,
    breakpoint = '',
    pseudo = ''
  }: ClassObject,
  breakpointPrefixOrSuffix: 'prefix' | 'suffix',
  breakpointSeparator: string
): { [key: string]: { [key: string]: string } } => {
  const _breakpointClassFormat = breakpointClassFormat(
    breakpointPrefixOrSuffix,
    breakpointSeparator
  );
  let baseClassName = `${propName}${valueName}`;
  if (breakpoint !== '') {
    baseClassName = _breakpointClassFormat(baseClassName, breakpoint);
  }

  if (pseudo !== '') {
    baseClassName += `:${pseudo}`;
  }
  return {
    [`${baseClassName}`]: Object.assign(
      {},
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
  {
    prop,
    values,
    breakpoints,
    pseudo
  }: {
    prop: PropsObject[];
    values: { [key: string]: string };
    breakpoints: string[];
    pseudo?: Pseudo;
  },
  breakpointPrefixOrSuffix: 'prefix' | 'suffix',
  breakpointSeparator: string
) => {
  if (values === undefined) {
    return [];
  }

  return breakpoints.reduce(
    (obj: { [key: string]: CompiledClassObject[] }, breakpoint: string) => {
      obj[breakpoint] = propsValuesMerge(
        prop,
        valuesCompile({
          values,
          breakpoint,
          pseudo
        })
      ).map(x =>
        classCompile(x, breakpointPrefixOrSuffix, breakpointSeparator)
      );
      return obj;
    },
    {}
  );
};

// atomTree
// ------------------------------------------------------------------
// Wraps up all functionality to process a minimal set of inputs into
// an object containing all classes for a given CSS property

// interface BaseTreeProps {
//   props: { [key: string]: string };
//   propSeparator?: string;
//   subProps?: { [key: string]: string[] };
//   pseudo?: Pseudo;
// }

// interface Breakpoints extends BaseTreeProps {
//   values: ...
//   mobileFirstValues?:
// }

// interface MobileFirstBreakpoints extends BaseTreeProps {
//   values?:
//   mobileFirstValues: ...
// }

// Breakpoints | MobileFirstBreakpoints

export const atomTree = (
  {
    props,
    propSeparator = '',
    subProps = {},
    subPropSeparator = '',
    pseudo = '',
    values = {}, // TODO: Is it necessary?
    mobileFirstValues,
    perScreenValues
  }: {
    props: { [key: string]: string };
    propSeparator?: string;
    subProps?: { [key: string]: string[] };
    subPropSeparator?: string;
    pseudo?: Pseudo;
    values?: { [key: string]: string };
    mobileFirstValues?: { [key: string]: string };
    perScreenValues?: { [key: string]: string };
  },
  config: { [key: string]: string }
) => {
  const propGroups = propsCompile({
    props,
    propSeparator,
    subProps,
    subPropSeparator
  });
  return Object.assign(
    {},
    ...Object.entries(props).map(([propName, prop]) => ({
      [prop]: {
        values: {
          all: propsValuesMerge(
            propGroups[prop],
            valuesCompile({
              values: Object.assign({}, values, mobileFirstValues),
              pseudo
            })
          ).map(classCompile)
        },
        mobileFirstValues: breakpointsClassCompile(
          {
            prop: propGroups[prop],
            values: mobileFirstValues,
            breakpoints: Object.keys(config.breakpointsConfig),
            pseudo
          },
          config.breakpointPrefixOrSuffix,
          config.breakpointSeparator
        ),
        perScreenValues: breakpointsClassCompile(
          {
            prop: propGroups[prop],
            values: perScreenValues,
            breakpoints: Object.keys(config.breakpointsConfig).slice(1),
            pseudo
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

export const atomList = (
  {
    props,
    propSeparator = '',
    subProps = {},
    subPropSeparator = '',
    pseudo = '',
    values = [],
    mobileFirstValues = [],
    perScreenValues = []
  },
  config
) => {
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
        values: Object.assign({}, values, mobileFirstValues)
      })
    )
      .map(x =>
        classCompile(
          x,
          config.breakpointPrefixOrSuffix,
          config.breakpointSeparator
        )
      )
      .concat(
        ...Object.keys(config.breakpointsConfig).map(breakpoint =>
          propsValuesMerge(
            propGroups[prop],
            valuesCompile({
              values: mobileFirstValues,
              breakpoint,
              pseudo
            })
          ).map(x =>
            classCompile(
              x,
              config.breakpointPrefixOrSuffix,
              config.breakpointSeparator
            )
          )
        )
      )
      .concat(
        ...Object.keys(config.breakpointsConfig).slice(1).map(breakpoint =>
          propsValuesMerge(
            propGroups[prop],
            valuesCompile({
              values: perScreenValues,
              breakpoint,
              pseudo
            })
          ).map(x =>
            classCompile(
              x,
              config.breakpointPrefixOrSuffix,
              config.breakpointSeparator
            )
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
    {},
    ...allAtoms.flatMap(x => atomList(x, config))
  );
  const atomicCSS = allAtoms.flatMap(x => atomTree(x, config));

  return { css: atomicCSS, JSON: atomicJSON };
};

export const compileMolecules = (obj, JSONObject) => {
  return Object.keys(obj).flatMap(x => ({
    [x]: Object.assign({}, ...obj[x].map(y => JSONObject[y]))
  }));
};
