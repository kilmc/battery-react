/* eslint-env node */
const fs = require('fs-extra');
const { molecules } = require('../atomic/atomic.js');
const { compileMolecules } = require('../atomic/battery.js');

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

generateMolecules(
  moleculesCSSFile,
  compileMolecules(molecules, JSON.parse(compiledJSON))
);