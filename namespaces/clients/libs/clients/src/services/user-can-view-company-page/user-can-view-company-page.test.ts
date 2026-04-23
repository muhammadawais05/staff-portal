import { userCanViewCompanyPage } from './user-can-view-company-page'

describe('userCanViewCompanyPage', () => {
  describe('when data is not available or the webResource.url value is not null', () => {
    it.each([
      null,
      undefined,
      { webResource: { url: undefined, text: '' } },
      { webResource: { url: 'https://toptal.com', text: '' } }
    ])('returns true', company => {
      expect(userCanViewCompanyPage(company)).toBe(true)
    })
  })

  describe('when the webResource.url value is null', () => {
    it.each([{ webResource: { url: null, text: '' } }])(
      'returns false',
      company => {
        expect(userCanViewCompanyPage(company)).toBe(false)
      }
    )
  })
})
