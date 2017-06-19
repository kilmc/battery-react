// Utilities
export const compose = (...functions) =>
  functions.reduce((f, g) => (...xs) => f(g(...xs)));

export const identity = x => x;

const fs = require('fs-extra');
const path = require('path');

// Get absolute paths of all directories under packages/*
export const getFiles = (dir) => {
  return fs
    .readdirSync(dir)
    .map(file => path.resolve(dir, file))
    .filter(f => fs.lstatSync(path.resolve(f)).isFile());
};