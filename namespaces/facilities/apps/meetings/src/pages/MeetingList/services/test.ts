import { MeetingPeriodEnum } from '@staff-portal/graphql/staff'

import { toGqlVariables } from './meeting-list-filter-values'

describe('toGqlVariables', () => {
  it('returns default page size when no optional parameter', () => {
    const pagination = {
      offset: 0,
      limit: 10
    }

    expect(toGqlVariables(MeetingPeriodEnum.today, pagination)).toEqual({
      filter: { periods: ['today'] },
      pagination
    })
  })

  it('returns custom page size when optional parameter is presented', () => {
    const pagination = {
      offset: 50,
      limit: 25
    }

    expect(toGqlVariables(MeetingPeriodEnum.future, pagination)).toEqual({
      filter: { periods: ['future'] },
      pagination
    })
  })
})
