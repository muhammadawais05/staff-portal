import { TalentEngagementScope } from '@staff-portal/graphql/staff'

import { JobsFilterType } from '../../../../enums'
import { getEngagementsParameters } from './get-engagements-parameters'

describe('getEngagementsParameters', () => {
  it('returns empty filter and order', () => {
    expect(getEngagementsParameters()).toStrictEqual({
      order: undefined,
      filter: undefined
    })
  })

  it('returns filter with an empty value', () => {
    expect(getEngagementsParameters([])).toStrictEqual({
      order: undefined,
      filter: { scopes: [] }
    })
  })

  it('returns filter with a multiple values', () => {
    expect(
      getEngagementsParameters([
        JobsFilterType.WORKING,
        JobsFilterType.IN_EVALUATION,
        JobsFilterType.TERMINAL
      ])
    ).toStrictEqual({
      order: undefined,
      filter: {
        scopes: [
          TalentEngagementScope.WORKING,
          TalentEngagementScope.IN_INTERVIEW,
          TalentEngagementScope.TERMINAL
        ]
      }
    })
  })

  it('returns filter with a single value when unknown value is passed', () => {
    expect(
      getEngagementsParameters([
        'unknown' as JobsFilterType,
        JobsFilterType.IN_EVALUATION
      ])
    ).toStrictEqual({
      order: undefined,
      filter: {
        scopes: [TalentEngagementScope.IN_INTERVIEW]
      }
    })
  })
})
