// Utilities
export const compose = (...functions) =>
  functions.reduce((f, g) => (...xs) => f(g(...xs)));

export const identity = x => x;

