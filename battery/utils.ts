import * as fs from 'fs-extra';
import * as path from 'path';

// Utilities
export const squash = (fns: Array<(x: number) => number>) => (x: number) =>
  fns.reduce((accum, fn) => fn(accum), x);

export const identity = <A>(x: A) => x;

// Get absolute paths of all directories under packages/*
export const getFiles = (dir: string) => {
  return fs
    .readdirSync(dir)
    .map(file => path.resolve(dir, file))
    .filter(f => fs.lstatSync(path.resolve(f)).isFile());
};
