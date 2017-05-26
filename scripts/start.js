/* eslint-env node */
const fs = require('fs-extra');
const { displayConfig, atomList, atomTree, printAtom } = require('../src/index');

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

generateLibrary(atomicJSONFile, atomList(displayConfig))
generateCSS(atomicCSSFile, printAtom(atomTree(displayConfig)))