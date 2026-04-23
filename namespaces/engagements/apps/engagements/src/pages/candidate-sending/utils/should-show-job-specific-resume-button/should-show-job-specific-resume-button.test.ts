import shouldShowJobSpecificResumeButton from './should-show-job-specific-resume-button'

describe('shouldShowJobSpecificResumeButton', () => {
  it.each([
    {
      newEngagementResumeUrl: 'https://example.com/job-specific-resume',
      talentResumeUrl: 'https://example.com/talent-resume',
      result: true
    },
    {
      newEngagementResumeUrl: 'https://example.com/talent-resume',
      talentResumeUrl: 'https://example.com/talent-resume',
      result: false
    },
    {
      newEngagementResumeUrl: null,
      talentResumeUrl: 'https://example.com/talent-resume',
      result: false
    },
    {
      newEngagementResumeUrl: 'https://example.com/talent-resume',
      talentResumeUrl: null,
      result: false
    },
    {
      newEngagementResumeUrl: null,
      talentResumeUrl: null,
      result: false
    }
  ])(
    'returns valid value',
    ({ newEngagementResumeUrl, talentResumeUrl, result }) => {
      expect(
        shouldShowJobSpecificResumeButton(
          newEngagementResumeUrl,
          talentResumeUrl
        )
      ).toBe(result)
    }
  )
})
