// eslint-env jest, node
const path = require('path');

import { createIndex, printCompile } from './createIndex';

import { getFiles } from './utils';

const ATOMS_DIR = path.resolve(__dirname, '../atomic/src/atoms');

describe('createIndex', () => {
  it('matches snapshot', () => {
    expect(createIndex(getFiles(ATOMS_DIR))).toMatchSnapshot();
  });
});

describe('printCompile', () => {
  it('matches snapshot', () => {
    expect(printCompile(getFiles(ATOMS_DIR))).toMatchSnapshot();
  });
});
