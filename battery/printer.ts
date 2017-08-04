import { compileMolecules } from './compiler.js';
import { BreakpointsConfig, Config } from './valueHelpers';

// ------------------------------------------------------------------
// C L A S S  P R I N T E R
// ------------------------------------------------------------------

// printProps
// ------------------------------------------------------------------
// Creates a formatted block of CSS property and value sets as a
// string which can be passed to a another to printClass to finish
// formatting

interface ClassPair {
  [key: string]: { [key: string]: string };
}

export const printProps = (
  // TODO: classObj: [string, { [key: string]: string }]
  classObj: ClassPair,
  multiple: boolean
) => {
  return Object.entries(classObj[Object.keys(classObj)[0]])
    .map(
      ([prop, value]) =>
        multiple ? `\n${prop}: ${value};` : `${prop}: ${value}`
    )
    .join('');
};

// printClass
// ------------------------------------------------------------------
// Creates a formatted block of classes in a string which can be
// passed to a another function to render it into a CSS file.

export const printClass = (classObj: ClassPair) => {
  const multiple = Object.keys(classObj[Object.keys(classObj)[0]]).length > 1;
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

export const printClasses = (allClasses: ClassPair[]) => {
  return allClasses.map(classObj => printClass(classObj)).join('\n');
};

// printBreakpoint
// ------------------------------------------------------------------

export const printBreakpoint = (
  [bp, classObjs]: [string, ClassPair[]],
  mediaQueryObj: { [key: string]: string }
) => {
  return `@media ${mediaQueryObj[bp]} {\n${printClasses(classObjs)}\n}\n`;
};

// mobileFirstQueries
// ------------------------------------------------------------------
// Creates an object with mobileFirst media query params

export const mobileFirstQueries = (breakpointsConfig: BreakpointsConfig) =>
  Object.keys(breakpointsConfig)
    .slice(1)
    .reduce((accum: { [key: string]: string }, bp) => {
      accum[bp] = `(min-width: ${breakpointsConfig[bp]}px)`;
      return accum;
    }, {});

// perScreenQueries
// ------------------------------------------------------------------
// Creates an object with media query arguments per screen

export const perScreenQueries = (breakpointsConfig: BreakpointsConfig) => {
  const perScreenBreakpoints = Object.keys(breakpointsConfig);

  const min = perScreenBreakpoints.slice(1);
  const max = perScreenBreakpoints.slice(0, -1);
  const both = min.filter(n => max.indexOf(n) !== -1);

  const allQueries = Object.keys(
    breakpointsConfig
  ).reduce((accum: { [key: string]: string }, bp) => {
    accum[bp] = '';
    return accum;
  }, {});

  min.map(bp => (allQueries[bp] = `(min-width: ${breakpointsConfig[bp]}px)`));

  let count = 0;
  max.map(bp => {
    count++;
    allQueries[bp] += `(max-width: ${breakpointsConfig[
      perScreenBreakpoints[count]
    ] - 1}px)`;
  });

  both.map(bp => {
    allQueries[bp] = allQueries[bp].replace(')(', ') and (');
  });

  return allQueries;
};

// printMobileFirst
// ------------------------------------------------------------------

export const printMobileFirst = (
  obj: { [key: string]: ClassPair[] },
  inMobileFirstQueries: {
    [key: string]: string;
  }
) =>
  Object.entries(obj)
    .map(([bp, classObjs]) =>
      printBreakpoint([bp, classObjs], inMobileFirstQueries)
    )
    .join('\n');

// printPerScreen
// ------------------------------------------------------------------

export const printPerScreen = (
  obj: { [key: string]: ClassPair[] },
  inPerScreenQueries: {
    [key: string]: string;
  }
) =>
  Object.entries(obj)
    .map(([bp, cxs]) => printBreakpoint([bp, cxs], inPerScreenQueries))
    .join('\n');

// printAtom
// ------------------------------------------------------------------
type Pairs = { [key: string]: ClassPair[] };

interface Atoms {
  [key: string]: {
    values: {
      all: ClassPair[];
    };
    mobileFirstValues: Pairs;
    perScreenValues: Pairs;
  };
}

export const basePrintAtoms = (config: Config) => (obj: Atoms) => {
  const { breakpointsConfig } = config;

  const inMobileFirstQueries = mobileFirstQueries(breakpointsConfig);
  const inPerScreenQueries = perScreenQueries(breakpointsConfig);

  const inPrintMobileFirst = (
    pairs: Pairs,
    queries: { [key: string]: string }
  ) => printMobileFirst(pairs, queries);

  const inPrintPerScreen = (pairs: Pairs, queries: { [key: string]: string }) =>
    printPerScreen(pairs, queries);

  const allValues = Object.keys(obj).map(propGroup =>
    printClasses(obj[propGroup].values.all)
  );

  const allMobileFirst =
    Object.keys(obj[Object.keys(obj)[0]].mobileFirstValues).length === 0
      ? ''
      : Object.keys(obj).map(propGroup =>
          inPrintMobileFirst(
            obj[propGroup].mobileFirstValues,
            inMobileFirstQueries
          )
        );

  const allPerScreen =
    Object.keys(obj[Object.keys(obj)[0]].perScreenValues).length === 0
      ? ''
      : Object.keys(obj).map(propGroup =>
          inPrintPerScreen(obj[propGroup].perScreenValues, inPerScreenQueries)
        );

  return allValues.concat(allMobileFirst).concat(allPerScreen).join('\n');
};

export const printMolecules = (obj, JSONObject) => {
  return compileMolecules(obj, JSONObject).map(printClass).join('\n');
};
