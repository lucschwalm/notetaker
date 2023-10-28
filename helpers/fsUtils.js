const fs = require('fs');
const util = require('util');

const readfromFile = util.promisify(fs.readFile);

module.exports = readfromFile;