import { TalentInfractionReasonValue } from '@staff-portal/graphql/staff'

import { ReasonSlugQueryParam } from './reason-slug-query-param'

describe('ReasonSlugQueryParam', () => {
  describe('decode', () => {
    it('decodes valid reason slugs', () => {
      const reason = ReasonSlugQueryParam.decode('COMMUNICATION_RUDE', {}, {})

      expect(reason).toBe(TalentInfractionReasonValue.COMMUNICATION_RUDE)
    })

    it('returns undefined for invalid reason slugs', () => {
      const reason = ReasonSlugQueryParam.decode('UNKNOWN', {}, {})

      expect(reason).toBeUndefined()
    })
  })
  describe('encode', () => {
    it('converts slugs to lower case', () => {
      const param = ReasonSlugQueryParam.encode(
        TalentInfractionReasonValue.COMMUNICATION_RUDE
      )

      expect(param).toBe('communication_rude')
    })
  })
})
