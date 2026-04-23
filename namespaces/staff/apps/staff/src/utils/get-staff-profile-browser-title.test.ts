import { getStaffProfileBrowserTitle } from './get-staff-profile-browser-title'

describe('getStaffProfileBrowserTitle', () => {
  describe('when fullName is not passed', () => {
    it('returns undefined', () => {
      expect(getStaffProfileBrowserTitle()).toBeUndefined()
    })
  })

  describe('when fullName is passed', () => {
    it('returns undefined', () => {
      const fullName = 'fullName'

      expect(getStaffProfileBrowserTitle(fullName)).toBe(
        `${fullName} (Staff Profile)`
      )
    })
  })
})
