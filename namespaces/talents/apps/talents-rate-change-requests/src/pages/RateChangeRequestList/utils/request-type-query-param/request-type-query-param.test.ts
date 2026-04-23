import { RateChangeRequestTypeEnum } from '@staff-portal/graphql/staff'

import { RequestTypeQueryParam } from './request-type-query-param'

describe('RequestTypeQueryParam', () => {
  describe('decode', () => {
    it('decodes valid request types', () => {
      const reason = RequestTypeQueryParam.decode('FUTURE_ENGAGEMENTS', {}, {})

      expect(reason).toBe(RateChangeRequestTypeEnum.FUTURE_ENGAGEMENTS)
    })

    it('returns undefined for invalid reason slugs', () => {
      const reason = RequestTypeQueryParam.decode('UNKNOWN', {}, {})

      expect(reason).toBeUndefined()
    })
  })

  describe('encode', () => {
    it('converts request types to lower case', () => {
      const param = RequestTypeQueryParam.encode(
        RateChangeRequestTypeEnum.CURRENT_ENGAGEMENT
      )

      expect(param).toBe('current_engagement')
    })
  })
})
