import {
  createActiveEngagementMock,
  createTopShieldApplicationMock
} from '@staff-portal/talents-top-shield/src/mocks'

import { getWeeklyWorkingHours } from './get-weekly-working-hours'

describe('getWeeklyWorkingHours', () => {
  it('returns weekly working hours', () => {
    const engagement = createActiveEngagementMock()
    const talentTopShield = createTopShieldApplicationMock({
      engagements: {
        nodes: [engagement]
      },
      workingPeriods: {
        nodes: [
          {
            start: '2021-01-01',
            activeEngagements: {
              edges: [
                {
                  workingHours: 20,
                  node: {
                    id: engagement.id
                  }
                }
              ]
            }
          },
          {
            start: '2021-01-14',
            activeEngagements: {
              edges: [
                {
                  workingHours: 12,
                  node: {
                    id: engagement.id
                  }
                }
              ]
            }
          },
          {
            start: '2021-01-07',
            activeEngagements: {
              edges: [
                {
                  workingHours: 35,
                  node: {
                    id: engagement.id
                  }
                }
              ]
            }
          }
        ]
      }
    })

    expect(getWeeklyWorkingHours(talentTopShield, engagement)).toBe('12')
  })
})
