import { JobWorkType } from '@staff-portal/graphql/staff'
import { NO_VALUE } from '@staff-portal/config'

import { getWorkTypeOption } from './get-work-type-option'

describe('getWorkTypeOption', () => {
  it('returns NO_VALUE for a blank parameter', () => {
    expect(getWorkTypeOption()).toBe(NO_VALUE)
  })

  it('returns NO_VALUE for null parameter', () => {
    expect(getWorkTypeOption(null)).toBe(NO_VALUE)
  })

  it('returns a title for a JobWorkType value', () => {
    expect(getWorkTypeOption(JobWorkType.MIXED)).toBe('Mixed (Remote+Onsite)')
    expect(getWorkTypeOption(JobWorkType.RECRUITING)).toBe('Recruiting Only')
  })
})
