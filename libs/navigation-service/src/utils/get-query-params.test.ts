import { getQueryParams } from './get-query-params'

const baseUrl = 'http://my-site.com'

describe('#getQueryParams', () => {
  describe('when `addQueryPrefix` is `true` and', () => {
    it(`url doesn't have params`, () => {
      expect(getQueryParams(baseUrl, { addQueryPrefix: true })).toBe('')
    })

    it(`url has params`, () => {
      expect(getQueryParams(`${baseUrl}/?a=b`, { addQueryPrefix: true })).toBe(
        '?a=b'
      )
    })
  })

  describe('when `addQueryPrefix` is `false` and', () => {
    it(`url doesn't have params`, () => {
      expect(getQueryParams(baseUrl)).toBe('')
    })

    it(`url has params`, () => {
      expect(getQueryParams(`${baseUrl}/?a=b`)).toBe('a=b')
    })
  })
})
