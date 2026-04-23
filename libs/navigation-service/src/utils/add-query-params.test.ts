import { addQueryParams } from './add-query-params'

const baseUrl = 'http://my-site.com'

describe('#addQueryParams', () => {
  describe('adds query params to the', () => {
    it(`empty url`, () => {
      expect(addQueryParams(baseUrl, { foo: 'bar' })).toBe(
        `${baseUrl}/?foo=bar`
      )
    })

    it(`url with params`, () => {
      expect(addQueryParams(`${baseUrl}/?zoo=test`, { foo: 'bar' })).toBe(
        `${baseUrl}/?zoo=test&foo=bar`
      )
    })
  })

  describe('replaces query params', () => {
    it(`when url already has param with the same name`, () => {
      expect(
        addQueryParams(`${baseUrl}/?a=test&b[]=val1&b[]=val2`, { b: 'bar' })
      ).toBe(`${baseUrl}/?a=test&b=bar`)
    })
  })

  it('merge strategy should work properly', () => {
    expect(
      addQueryParams(
        `${baseUrl}/?a=test&b[]=val1&b[]=val2`,
        { c: 'bar' },
        (_, next) => next
      )
    ).toBe(`${baseUrl}/?c=bar`)
  })
})
