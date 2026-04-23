import { createActiveEngagementMock } from '@staff-portal/talents-top-shield/src/mocks'

import { getJobBreaksDaysCount } from './get-job-breaks-days-count'

describe('getJobBreaksDaysCount', () => {
  beforeEach(() => {
    jest.useFakeTimers()
    jest.setSystemTime(new Date('2020-02-03T09:00:00'))
  })

  it('returns correct days break count', () => {
    const engagement = createActiveEngagementMock()

    expect(getJobBreaksDaysCount(engagement)).toBe('18')
  })

  describe('when endDate is empty', () => {
    it('returns correct days break count', () => {
      const engagement = createActiveEngagementMock({
        engagementBreaks: {
          nodes: [
            {
              startDate: '2020-02-01T00:00:00.000Z'
            }
          ]
        }
      })

      expect(getJobBreaksDaysCount(engagement)).toBe('2')
    })
  })
})
