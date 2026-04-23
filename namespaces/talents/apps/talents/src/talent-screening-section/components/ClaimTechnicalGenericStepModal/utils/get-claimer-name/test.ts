import { CurrentUser } from '@staff-portal/current-user'
import { ClaimerFragment } from '@staff-portal/facilities'

import { getClaimerName } from './get-claimer-name'

describe('getClaimerName', () => {
  describe('returns selected claimer full name', () => {
    it('if selectedClaimer id is not equal to currentUser id', () => {
      const currentUser = {
        id: '11'
      } as CurrentUser

      const selectedClaimer = {
        id: '22',
        fullName: 'Rihanna'
      } as ClaimerFragment

      expect(getClaimerName(currentUser, selectedClaimer)).toBe('Rihanna')
    })
  })

  describe('returns you', () => {
    it('if selectedClaimer id equals currentUser id', () => {
      const currentUser = {
        id: '11'
      } as CurrentUser

      const selectedClaimer = {
        id: '11',
        fullName: 'Rihanna'
      } as ClaimerFragment

      expect(getClaimerName(currentUser, selectedClaimer)).toBe('you')
    })

    it(`if selectedClaimer doesn't have full name`, () => {
      const currentUser = {
        id: '11'
      } as CurrentUser

      const selectedClaimer = {
        id: '11'
      } as ClaimerFragment

      expect(getClaimerName(currentUser, selectedClaimer)).toBe('you')
    })
  })
})
