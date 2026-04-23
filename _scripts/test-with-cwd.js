#!/usr/bin/env node

const { spawn } = require('child_process')
const original = JSON.parse(process.env.npm_config_argv).original

original.shift()

let [cwd, path] = (original.shift() || '').split('/src/')

if (!path) {
  path = cwd
  cwd = ''
}

const command = cwd
  ? `yarn --cwd ${cwd} test ./src/${path} ${original.join(' ')}`
  : // you wouldn't like to run yarn test locally, your cpu will burn ;\
    `yarn lerna run test --stream ${original.join(' ')}`
const args = command.split(' ')

spawn(args.shift(), args, { shell: true, stdio: 'inherit' })
