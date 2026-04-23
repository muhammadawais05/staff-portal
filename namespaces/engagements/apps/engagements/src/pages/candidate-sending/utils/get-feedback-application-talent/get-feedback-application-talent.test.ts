import { getFeedbackApplicationTalent } from './get-feedback-application-talent'

describe('getFeedbackApplicationTalent', () => {
  describe('when data is missing', () => {
    it('returns undefined', () => {
      expect(getFeedbackApplicationTalent()).toBeUndefined()
    })
  })

  describe('when applicants are missing', () => {
    it('returns null', () => {
      expect(getFeedbackApplicationTalent({})).toBeNull()
    })
  })

  describe('when jobApplicationTalent is available and availabilityRequestTalent is missing', () => {
    it('returns the jobApplicationTalent skills', () => {
      expect(
        getFeedbackApplicationTalent({ jobApplicationTalent: { id: '1' } })
      ).toStrictEqual({ id: '1' })
    })
  })

  describe('when availabilityRequestTalent is available and jobApplicationTalent is missing', () => {
    it('shows the availabilityRequestTalent skills', () => {
      expect(
        getFeedbackApplicationTalent({ availabilityRequestTalent: { id: '2' } })
      ).toStrictEqual({ id: '2' })
    })
  })

  describe('when both, availabilityRequestTalent and  jobApplicationTalent are available', () => {
    it('shows the availabilityRequestTalent skills', () => {
      expect(
        getFeedbackApplicationTalent({
          jobApplicationTalent: { id: '1' },
          availabilityRequestTalent: { id: '2' }
        })
      ).toStrictEqual({ id: '2' })
    })
  })
})
