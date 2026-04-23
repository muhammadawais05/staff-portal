import { BusinessTypes } from '@staff-portal/graphql/staff'

import { isEnterpriseBusiness } from './is-enterprise-business'

describe('isEnterpriseBusiness', () => {
  it('returns expected values depending on business type', () => {
    expect(isEnterpriseBusiness(BusinessTypes.ENTERPRISE_BUSINESS)).toBe(true)
    expect(isEnterpriseBusiness(BusinessTypes.GOVERNMENT)).toBe(false)
    expect(isEnterpriseBusiness(undefined)).toBe(false)
    expect(isEnterpriseBusiness(null)).toBe(false)
  })
})
