#!/usr/bin/env node

/* eslint-disable no-console */
// @ts-check

// for logger
// eslint-disable-next-line
const util = require('util');
util.inspect.defaultOptions.getters = true;

const program = require('commander');

// Existed commands
require('./commands/audit');
require('./commands/verify');

// New Commands
require('./commands/pi');
require('./commands/oi');

program.parse(process.argv);
