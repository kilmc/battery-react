/* eslint-env node */
const fs = require('fs-extra');
const { printAtom } = require('../atomic/atomic.config.js');
const {
  compiled,
  molecules
 } = require('../atomic/atomic.js');
const { compileMolecules } = require('../atomic/battery.js');

const atomicJSONFile = __dirname + '/../atomic/output/atomic.json'
const generateLibrary = (file, obj) => {
  fs.outputJson(file, obj, err => {

    fs.readJson(file, (err, data) => {
      if (err) return console.error(err)
    })
  })
};

const atomsCSSFile = __dirname + '/../atomic/output/atoms.css'
console.log('Writing this file',atomsCSSFile)
const generateAtoms = (file, obj) => {
  fs.outputFile(file, obj, err => {

    fs.readFile(file, 'utf8', (err, data) => {
      if (err) return console.error(err)
    })
  })
}

const moleculesCSSFile = __dirname + '/../atomic/output/molecules.css'
console.log('Writing this file',moleculesCSSFile)
const generateMolecules = (file, obj) => {
  fs.outputFile(file, obj, err => {

    fs.readFile(file, 'utf8', (err, data) => {
      if (err) return console.error(err)
    })
  })
}

const compiledJSON = fs.readFileSync(__dirname + '/../atomic/output/atomic.json');


generateLibrary(atomicJSONFile, compiled.JSON);
generateAtoms(atomsCSSFile, compiled.css.map(printAtom));
generateMolecules(
  moleculesCSSFile,
  compileMolecules(molecules, JSON.parse(compiledJSON))
);