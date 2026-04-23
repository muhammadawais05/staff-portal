import { isAbsoluteUrlWithoutProtocol } from './url-matchers'

describe('#urlMatchers', () => {
  describe('isAbsoluteUrlWithoutProtocol', () => {
    it.each([
      ['toptal.com/path', true],
      ['toptal.com/@path', true],
      ['w.toptal.com', true],
      ['www.toptal.com/path', true],
      ['www.subdomain.toptal.com', true],
      ['www.subdomain.toptal.com/path', true],
      ['------', false],
      ['-github.com', false],
      ['user:pass@toptal.com/path', false],
      ['https:toptal.com/path', false],
      ['https:/toptal.com/path', false],
      ['https://toptal.com/path', false],
      ['http://www.subdomain.toptal.com', false],
      ['localhost/path', false],
      ['/localhost/path', false],
      ['email@toptal.com', false],
      ['/localhost/path?returnPath=https%3A%2F%2Fsubdomain.toptal.net', false]
    ])('%s should be %s', (value, result) => {
      expect(isAbsoluteUrlWithoutProtocol(value)).toBe(result)
    })
  })
})
