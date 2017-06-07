/* eslint-env node */
const fs = require('fs-extra');
const { printAtom } = require('../atomic/atomic.js');
const { compiled } = require('../atomic/atomic.js');

const atomicJSONFile = __dirname + '/../atomic/output/atomic.json'
const generateLibrary = (file, obj) => {
  fs.outputJson(file, obj, err => {

    fs.readJson(file, (err, data) => {
      if (err) return console.error(err)
    })
  })
};

const atomicCSSFile = __dirname + '/../atomic/output/atomic.css'
console.log('Writing this file',atomicCSSFile)
const generateCSS = (file, obj) => {
  fs.outputFile(file, obj, err => {

    fs.readFile(file, 'utf8', (err, data) => {
      if (err) return console.error(err)
    })
  })
}

generateLibrary(atomicJSONFile, compiled.JSON)
generateCSS(atomicCSSFile, compiled.css)