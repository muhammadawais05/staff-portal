import useGetSectionInfoText from './use-get-section-info-text'

jest.mock('../../../../hooks', () => ({
  useGetRoleTitle: () => ({
    loading: false,
    roleTitle: 'expert'
  })
}))

describe('useGetSectionInfoText', () => {
  describe('when there are no `jobId` & `talentId`', () => {
    it('returns default text', () => {
      expect(useGetSectionInfoText()).toBeUndefined()
    })
  })

  describe('when there is `talentId`', () => {
    it('returns proper text', () => {
      expect(useGetSectionInfoText({ talentId: 'id' })).toBe(
        `Select the company and job where you want this candidate sent:`
      )
    })
  })

  describe('when there is `jobId`', () => {
    it('returns proper text', () => {
      expect(useGetSectionInfoText({ jobId: 'id' })).toBe(
        `Select expert you want to send to this job:`
      )
    })
  })
})
