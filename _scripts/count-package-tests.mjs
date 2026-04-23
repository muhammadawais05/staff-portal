#!/usr/bin/env node
// This script calculates the number of test files in each package,
// sorts packages by their tests number in descending order
// and writes this info to package-tests-count.json
// Later we use this info to evenly distribute
// the packages between different matrix job workers.
import path from 'path'
import fs from 'fs'
import { exec, execSync } from 'child_process'

const currentDir = process.cwd()

let lernaCommand = 'yarn --silent --cwd=../.. lerna list --all --json --loglevel silent'

if (process.env.CI_ONLY_CHANGED) {
  // The check-non-root-changes script will exit 1 if there is
  // no changes in root, hence catch block will run apply --since
  // to test command
  try {
    execSync('node ./_scripts/check-non-root-changes.js')
    // eslint-disable-next-line no-console
    console.log('No root changes detected')
    lernaCommand += ' --since origin/master'
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('Root changes detected or some errors occurs', e)
  }
}

let packages = execSync(lernaCommand).toString()

packages = JSON.parse(packages).map(pckg => {
  const location = path.relative(currentDir, pckg.location)

  pckg.location = location === '' ? '.' : location

  return pckg
})

const packagesWithTestCommand = packages.filter(({ location }) => {
  const file = fs.readFileSync(`${location}/package.json`).toString()
  const packageJson = JSON.parse(file)

  return (
    packageJson && packageJson.scripts && packageJson.scripts['test']
  )
})

// eslint-disable-next-line no-console
console.time('Counting tests')

await Promise.all(packagesWithTestCommand.map(pckg => new Promise((resolve, reject) => {
  exec(`yarn --silent --cwd=${pckg.location} jest --listTests`, (error, stdout) => {
    if (error) {
      reject(error)
    }

    pckg.testFilesNumber = stdout.toString()
      .split('\n')
      .filter(testPath => /test.tsx?$/.test(testPath))
      .length

    resolve()
  })
})))

// eslint-disable-next-line no-console
console.timeEnd('Counting tests')

packagesWithTestCommand
  .sort((packageA, packageB) =>
        packageA.testFilesNumber > packageB.testFilesNumber ? -1 : 1)

fs.writeFileSync('package-tests-count.json', JSON.stringify(packagesWithTestCommand, null, 2))
