#!/usr/bin/env node

const fs = require('fs')
const lernaPkg = require('lerna/package.json')
const lernaCli = require('@lerna/cli')
const lernaRunCommand = require('@lerna/run/command')
const { RunCommand: LernaRunCommand } = require('@lerna/run')

const preparePackageGroups = () => {
  let packages = fs.readFileSync('./package-tests-count.json').toString()
  const groups = []

  packages = JSON.parse(packages)

  for (let index = 0; index < process.env.CI_NODE_TOTAL; index++) {
    groups.push({ index, packages: [], size: 0 })
  }

  const smallestGroup = () =>
    groups.reduce(
      (sGroup, group) => (group.size < sGroup.size ? group : sGroup),
      groups[0]
    )

  packages.forEach(pckg => {
    const nextGroup = smallestGroup()

    nextGroup.packages.push(pckg.name)
    nextGroup.size += pckg.testFilesNumber
  })

  return groups
}

// This script distributes the packages between workers evenly
// and picks the correct group for the current worker
class RunCommand extends LernaRunCommand {
  execute() {
    const packageGroups = preparePackageGroups()
    const currentGroup = packageGroups[process.env.CI_NODE_INDEX]

    // eslint-disable-next-line no-console
    console.log(currentGroup)

    this.packagesWithScript = this.packagesWithScript.filter(pkg =>
      Boolean(currentGroup.packages.find(name => pkg.name === name))
    )

    this.count = this.packagesWithScript.length

    return super.execute()
  }
}

const context = {
  lernaVersion: lernaPkg.version
}

lernaRunCommand.handler = argv => new RunCommand(argv)

process.env.CI = true

lernaCli()
  .command(lernaRunCommand)
  .parse(
    [
      'run',
      'test',
      '--stream',
      '--',
      '-i',
      '--bail',
      '--silent',
      '--ci',
      '--passWithNoTests',
      '--coverage',
      'true'
    ],
    context
  )
