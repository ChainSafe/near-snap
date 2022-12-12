const fs = require('fs');
const pathUtils = require('path');
const snapConfig = require('./snap.config');

const bundlePath = pathUtils.join(snapConfig.cliOptions.dist, snapConfig.cliOptions.outfileName);

let bundleString = fs.readFileSync(bundlePath, 'utf8');

bundleString = bundleString.replaceAll(`Error.captureStackTrace = function `, 'function removed2');
bundleString = bundleString.replaceAll(`Error.getStackTrace = function `, 'function removed1 ');

fs.writeFileSync(bundlePath, bundleString);