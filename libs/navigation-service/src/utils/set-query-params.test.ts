import { setQueryParams } from './set-query-params'

const baseUrl = 'http://my-site.com'

describe('#setQueryParams', () => {
  describe('sets query params', () => {
    it('to url without params', () => {
      expect(setQueryParams(baseUrl, { foo: 'bar' })).toBe(
        `${baseUrl}/?foo=bar`
      )
    })

    it('to url with params', () => {
      expect(setQueryParams(`${baseUrl}/?test=value`, { foo: 'bar' })).toBe(
        `${baseUrl}/?foo=bar`
      )
    })

    it('to url with hash', () => {
      expect(setQueryParams(`${baseUrl}/#myHash`, { foo: 'bar' })).toBe(
        `${baseUrl}/?foo=bar#myHash`
      )
    })
  })

  describe('sets empty query params', () => {
    it('to url with params', () => {
      expect(setQueryParams(`${baseUrl}/?foo=bar`, {})).toBe(`${baseUrl}/`)
    })
  })
})
