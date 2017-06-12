const { execSync } = require('child_process');
const path = require('path');
const Watchpack = require('watchpack');
const getFiles = require('./_getFiles');
const getDirectories = require('./_getFiles');


const ATOMIC_SRC = path.resolve(__dirname, '../atomic/src');
const ATOMS_DIR = path.resolve(__dirname, '../atomic/src/atoms');

const BUILD_CMD = `NODE_ENV=development babel-node ${path.resolve(__dirname, './compile.js')}`;

var wp = new Watchpack({
  aggregateTimeout: 1000,
  poll: true,
  ignored: /node_modules/,
});

wp.watch(getFiles(ATOMS_DIR), getDirectories(ATOMIC_SRC));

wp.on("aggregated", function(changes) {
  execSync(`${BUILD_CMD} ${changes.join(' ')}`, {stdio: [0, 1, 2]});
});