const fs = require('fs-extra');
const path = require('path');

// Get absolute paths of all directories under packages/*
module.exports = function getFiles(dir) {
  return fs
    .readdirSync(dir)
    .map(file => path.resolve(dir, file))
    .filter(f => fs.lstatSync(path.resolve(f)).isFile());
};

module.exports = function getDirecotries(dir) {
  return fs
    .readdirSync(dir)
    .map(file => path.resolve(dir, file))
    .filter(f => fs.lstatSync(path.resolve(f)).isDirectory());
};