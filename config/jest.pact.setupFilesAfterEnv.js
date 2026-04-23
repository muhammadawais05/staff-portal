import { execSync } from 'child_process'
import failOnConsole from 'jest-fail-on-console'

// remove package-level pacts when running pact tests locally
if (!process.env.CI) {
  execSync('rm -rf ./pacts; rm -rf ./logs')
}

process.env.LANG = 'en_US'
process.env.TZ = 'UTC'

const PACT_TIMEOUT = 30000

jest.setTimeout(PACT_TIMEOUT)

failOnConsole()
