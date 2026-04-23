#!/usr/bin/env node

const path = require('path')
const { execSync } = require('child_process')
// @staff-portal/pact-utils can't be used here because it's written in TS
// eslint-disable-next-line import/no-extraneous-dependencies
const publisher = require('@pact-foundation/pact-node')

const gitBranch =
  process.env.GIT_BRANCH ||
  execSync('git rev-parse --abbrev-ref HEAD 2> /dev/null')
    .toString()
    .replace(/\//g, '-')
    .trim()

const appVersion =
  process.env.GIT_COMMIT ||
  execSync('git rev-parse HEAD 2> /dev/null').toString().trim()

process.env.SSL_CERT_DIR = '/etc/ssl/certs'

publisher.publishPacts({
  pactFilesOrDirs: [path.resolve(process.cwd(), 'pacts')],
  pactBroker: 'https://pact-broker.toptal.net/',
  pactBrokerUsername: process.env.PACT_BROKER_USR,
  pactBrokerPassword: process.env.PACT_BROKER_PSW,
  tags: [gitBranch],
  branch: gitBranch,
  consumerVersion: appVersion,
  buildUrl: process.env.BUILD_URL
})
