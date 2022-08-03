const fs = require('fs');
const pathUtils = require('path');
const snapConfig = require('./snap.config');

const bundlePath = pathUtils.join(snapConfig.cliOptions.dist, snapConfig.cliOptions.outfileName);

let bundleString = fs.readFileSync(bundlePath, 'utf8');


// Remove readonly assignment 
bundleString = bundleString.replace(`Error.captureStackTrace = `, '');
bundleString = bundleString.replace(`Error.getStackTrace = function `, 'function removed1 ');


fs.writeFileSync(bundlePath, bundleString);