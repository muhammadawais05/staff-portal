import { userCanViewStaffProfile } from './user-can-view-staff-profile-page'

describe('userCanViewStaffProfile', () => {
  describe('when data is not available or the webResource.url value is not null', () => {
    it.each([
      null,
      undefined,
      { webResource: { url: undefined, text: '' } },
      { webResource: { url: 'https://toptal.com', text: '' } }
    ])('returns true', company => {
      expect(userCanViewStaffProfile(company)).toBe(true)
    })
  })

  describe('when the webResource.url value is null', () => {
    it.each([{ webResource: { url: null, text: '' } }])(
      'returns false',
      company => {
        expect(userCanViewStaffProfile(company)).toBe(false)
      }
    )
  })
})
