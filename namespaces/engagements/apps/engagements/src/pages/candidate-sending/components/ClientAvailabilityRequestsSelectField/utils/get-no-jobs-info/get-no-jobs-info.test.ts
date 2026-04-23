import getNoJobsInfo from './get-no-jobs-info'

describe('getNoJobsInfo', () => {
  describe('when there are no params', () => {
    it('returns default info', () => {
      expect(getNoJobsInfo()).toBe(
        `This company has no pending jobs. Try to select another one.`
      )
    })
  })

  describe('when `hasTalentVertical` equals `undefined`', () => {
    it('returns proper info', () => {
      expect(getNoJobsInfo({ talentType: 'Developer' })).toBe(
        `This company has no pending jobs for Developer's. Try to select another one.`
      )
    })
  })

  describe('when `hasTalentVertical` equals `true`', () => {
    it('returns proper info', () => {
      expect(
        getNoJobsInfo({ talentType: 'Developer', hasTalentVertical: true })
      ).toBe(
        `This company has no pending jobs matching Developer's specializations. Try to select another one.`
      )
    })
  })
})
