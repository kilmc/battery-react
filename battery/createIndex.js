const path = require('path');
const cc = require('change-case');

import { getFiles } from './utils';

const ATOMS_DIR = path.resolve(__dirname, '../atomic/src/atoms')

export const printImport = (filepath) => {
  const filename = path.basename(filepath, '.js')
  return `import * as ${cc.pascal(filename)} from './src/atoms/${filename}';`;
}

export const createIndex = (arr) => {
  return arr.map(printImport)
}

export const printCompile = (arr) => {
  const compileList = arr.map(x =>  path.basename(x, '.js'))
    .map(x => cc.pascalCase(x))
    .map(x => '...' + x)
    .join(',\n')

  return `export const compiled = compile({${compileList}})`
}