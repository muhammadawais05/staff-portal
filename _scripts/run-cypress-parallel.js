#!/usr/bin/env node

const lernaPkg = require('lerna/package.json')
const lernaCli = require('@lerna/cli')
const lernaRunCommand = require('@lerna/run/command')
const { RunCommand: LernaRunCommand } = require('@lerna/run')

// This script runs billing-frontend tests in a separate exclusive matrix instance
class RunCommand extends LernaRunCommand {
  execute() {
    this.packagesWithScript =
      process.env.CI_NODE_INDEX === 'billing-package'
        ? this.packagesWithScript.filter(
            pkg => pkg.name === '@toptal/billing-frontend'
          )
        : this.packagesWithScript.filter(
            pkg => pkg.name !== '@toptal/billing-frontend'
          )

    this.count = this.packagesWithScript.length

    return super.execute()
  }
}

const context = {
  lernaVersion: lernaPkg.version
}

lernaRunCommand.handler = argv => new RunCommand(argv)

lernaCli()
  .command(lernaRunCommand)
  .parse(['run', 'test:ui:ci', '--stream'], context)
