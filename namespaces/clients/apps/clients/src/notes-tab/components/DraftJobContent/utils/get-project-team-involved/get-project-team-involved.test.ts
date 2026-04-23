import { JobProjectTeamInvolved } from '@staff-portal/graphql/staff'

import { getProjectTeamInvolved } from './get-project-team-involved'

describe('getProjectTeamInvolved', () => {
  describe('when survey options are missing', () => {
    it('returns undefined', () => {
      expect(
        getProjectTeamInvolved({
          projectTeamInvolvedSurvey: { options: [], question: 'Test' }
        })
      ).toBeUndefined()
    })
  })

  describe('when there are no option for the project team involved', () => {
    it('returns undefined', () => {
      expect(
        getProjectTeamInvolved({
          projectTeamInvolved: JobProjectTeamInvolved.INVOLVED_2_TO_6_MEMBERS,
          projectTeamInvolvedSurvey: {
            options: [
              {
                label: 'Test Label',
                value: JobProjectTeamInvolved.INVOLVED_UNSURE
              }
            ],
            question: 'Test'
          }
        })
      ).toBeUndefined()
    })
  })

  describe('when there are option for the project team involved', () => {
    it('returns label', () => {
      expect(
        getProjectTeamInvolved({
          projectTeamInvolved: JobProjectTeamInvolved.INVOLVED_UNSURE,
          projectTeamInvolvedSurvey: {
            options: [
              {
                label: 'Test Label',
                value: JobProjectTeamInvolved.INVOLVED_UNSURE
              }
            ],
            question: 'Test'
          }
        })
      ).toBe('Test Label')
    })
  })
})
