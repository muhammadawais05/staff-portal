import * as hostHelpers from '.'

describe.each([
  ['www.toptal.com', 'production', true],
  ['staging.toptal.net', 'staging', false],
  ['bil556.toptal.rocks', 'temploy', false],
  ['localhost', 'testing', false]
])('hostHelpers', (host, getEnv, isProduction) => {
  describe(`when url is ${host}`, () => {
    const location = window.location

    beforeEach(() => {
      delete window.location
      window.location = { host }
    })

    afterEach(() => {
      window.location = location
    })

    describe('#getEnvironment', () => {
      it(`returns ${getEnv}`, () => {
        expect(hostHelpers.getEnvironment()).toBe(getEnv)
      })
    })

    describe('#isEnvProduction', () => {
      it(`returns ${isProduction}`, () => {
        expect(hostHelpers.isEnvProduction()).toBe(isProduction)
      })
    })
  })
})
