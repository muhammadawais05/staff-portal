#!/usr/bin/env node

import { validateCommand } from './services/validate-command.js'
import { runCommand } from './services/run-command.js'

validateCommand()
runCommand()
