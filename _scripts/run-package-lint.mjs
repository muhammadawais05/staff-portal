#!/usr/bin/env node
import { execSync } from 'child_process'
// eslint-disable-next-line import/no-extraneous-dependencies
import { getWorkspaceRoot } from '@toptal/davinci-engine/src/utils/index.js'

// We get this env variable from the workflow when we call `yarn lint:ci`
const IS_CI = process.env.CI_LINT

const commands = {
  code: {
    command: 'davinci syntax lint code .',
    autoFixFlag: undefined,
    checkFlag: '--check',
    enabled: true,
    getOptions: () =>
      process.env.MAX_WARNINGS >= 0 &&
      `--max-warnings ${process.env.MAX_WARNINGS}`
  },
  styles: {
    command: 'davinci syntax lint styles .',
    /* 
      At this moment `lint styles` doesn't support autofix mode.
      As soon as davinci supports it, we can add it here.
     */
    autoFixFlag: undefined,
    checkFlag: undefined,
    enabled: true
  },
  markdown: {
    command: `markdownlint '**/*.md'`,
    autoFixFlag: '--fix',
    checkFlag: undefined,
    enabled: true,
    getOptions: () => {
      const workspaceRootPath = getWorkspaceRoot()
      /* 
       `.markdownlintignore` file is not detected automatically, like `.markdownlintrc`.
        We have to pass it directly if we don't want to add `.markdownlintignore` for every package.
      */
      const pathToIgnoreFile = `${workspaceRootPath}/.markdownlintignore`

      return `--ignore-path ${pathToIgnoreFile}`
    }
  }
}

const finalCommand = Object.values(commands)
  .reduce((acc, cur) => {
    const { command, autoFixFlag, checkFlag, getOptions, enabled } = cur

    if (!enabled) {
      return acc
    }
    const commandWithFlags = [command]

    if (getOptions) {
      commandWithFlags.push(getOptions())
    }
    commandWithFlags.push(IS_CI ? checkFlag : autoFixFlag)

    const resultCommand = commandWithFlags.filter(Boolean).join(' ')

    acc.push(resultCommand)

    return acc
  }, [])
  .join(' && ')

try {
  execSync(finalCommand, { stdio: 'inherit' })
} catch (error) {
  // eslint-disable-next-line no-console
  console.error('Lint failed with', error.message.toString())
  process.exit(1)
}
