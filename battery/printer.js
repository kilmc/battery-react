import { compileMolecules } from './compiler.js'

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

// printBreakpoint
// ------------------------------------------------------------------

export const printBreakpoint = ([bp, classObjs], mediaQueryObj) => {
  return `@media ${mediaQueryObj[bp]} {\n${printClasses(classObjs)}\n}\n`;
};

// mobileFirstQueries
// ------------------------------------------------------------------
// Creates an object with mobileFirst media query params

export const mobileFirstQueries = (breakpointsConfig) =>
  Object.keys(breakpointsConfig).slice(1).reduce((accum, bp) => {
    accum[bp] = `(min-width: ${breakpointsConfig[bp]}px)`;
    return accum;
}, {});

// perScreenQueries
// ------------------------------------------------------------------
// Creates an object with media query arguments per screen

export const perScreenQueries = (breakpointsConfig) => {
  const perScreenBreakpoints = Object.keys(breakpointsConfig);

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

// printMobileFirst
// ------------------------------------------------------------------

export const printMobileFirst = (obj, inMobileFirstQueries) =>
  Object.entries(obj)
    .map(([bp, classObjs]) =>
      printBreakpoint([bp, classObjs], inMobileFirstQueries))
    .join('\n');

// printPerScreen
// ------------------------------------------------------------------

export const printPerScreen = (obj, inPerScreenQueries) => Object.entries(obj)
  .map(([bp, cxs]) =>
    printBreakpoint([bp, cxs], inPerScreenQueries))
  .join('\n');

// printAtom
// ------------------------------------------------------------------

export const basePrintAtoms = config => obj => {
  const {
    breakpointsConfig,
  } = config;

  const inMobileFirstQueries = mobileFirstQueries(breakpointsConfig);
  const inPerScreenQueries = perScreenQueries(breakpointsConfig);

  const inPrintMobileFirst = (obj, inMobileFirstQueries) =>
    printMobileFirst(obj, inMobileFirstQueries)

  const inPrintPerScreen = (obj, inPerScreenQueries) =>
    printPerScreen(obj, inPerScreenQueries)

  const allValues = Object.keys(obj)
    .map(propGroup => printClasses(obj[propGroup].values.all));

  const allMobileFirst = Object.keys(obj).map(
    propGroup => obj[propGroup].mobileFirstValues
  ) === [[]]
    ? ''
    : Object.keys(obj).map(propGroup =>
        inPrintMobileFirst(
          obj[propGroup].mobileFirstValues,
          inMobileFirstQueries
        )
      );

  const allPerScreen = Object.keys(obj).map(
    propGroup => obj[propGroup].perScreenValues
  ) === [[]]
    ? ''
    : Object.keys(obj).map(propGroup =>
        inPrintPerScreen(
          obj[propGroup].perScreenValues,
          inPerScreenQueries
        )
      );

  return allValues
    .concat(allMobileFirst)
    .concat(allPerScreen)
    .join('\n');
};

export const printMolecules = (obj, JSONObject) => {
  return compileMolecules(obj, JSONObject).map(printClass).join('\n')
};