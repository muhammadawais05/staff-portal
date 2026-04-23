import { getTerminateEngagementTitle } from './get-terminate-engagement-title'

describe('getTerminateEngagementTitle', () => {
  it('returns end job', () => {
    expect(getTerminateEngagementTitle()).toBe('End Job')
    expect(getTerminateEngagementTitle(undefined)).toBe('End Job')
    expect(getTerminateEngagementTitle(0)).toBe('End Job')
    expect(getTerminateEngagementTitle(1)).toBe('End Job')
  })

  it('returns end engagement', () => {
    expect(getTerminateEngagementTitle(2)).toBe('End Engagement')
  })
})
