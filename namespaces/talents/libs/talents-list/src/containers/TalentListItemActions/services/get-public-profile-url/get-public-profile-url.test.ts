import { encodeEntityId } from '@staff-portal/data-layer-service'

import { getPublicProfileUrl } from './get-public-profile-url'

jest.mock('@staff-portal/navigation', () => ({
  ...jest.requireActual<object>('@staff-portal/navigation'),
  getOrigin: () => 'https://toptal.com'
}))

describe('getPublicProfileUrl', () => {
  const talentId = encodeEntityId('456', 'Talent')
  const resumeUrl = 'https://public_profile.com'

  describe('when jobId is passed', () => {
    const jobId = encodeEntityId('123', 'Job')

    it('return an URL to the new resume page', () => {
      expect(getPublicProfileUrl(resumeUrl, talentId, jobId)).toBe(
        'https://toptal.com/platform/staff/resume_token?job_id=123&talent_id=456&forward_job_id=true'
      )
    })
  })

  describe('when jobId is not passed', () => {
    it('returns an URL to the public profile page', () => {
      expect(getPublicProfileUrl(resumeUrl, talentId)).toBe(resumeUrl)
    })
  })
})
