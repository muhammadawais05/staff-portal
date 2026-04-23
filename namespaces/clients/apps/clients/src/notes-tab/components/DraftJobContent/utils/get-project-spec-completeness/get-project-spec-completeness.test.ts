import { JobProjectSpecCompleteness } from '@staff-portal/graphql/staff'

import { NO_FIELD } from '../../../../config'
import { getProjectSpecCompleteness } from './get-project-spec-completeness'

describe('getProjectSpecCompleteness', () => {
  describe('when survey options are missing', () => {
    it('returns no field message', () => {
      expect(
        getProjectSpecCompleteness({
          projectSpecCompletenessSurvey: { options: [], question: 'Test' }
        })
      ).toBe(NO_FIELD)
    })
  })

  describe('when there are no option for the spec completeness', () => {
    it('returns no field message', () => {
      expect(
        getProjectSpecCompleteness({
          projectSpecCompleteness: JobProjectSpecCompleteness.N_A,
          projectSpecCompletenessSurvey: {
            options: [
              {
                label: 'Test Label',
                value: JobProjectSpecCompleteness.HAS_ROUGH_IDEA
              }
            ],
            question: 'Test'
          }
        })
      ).toBe(NO_FIELD)
    })
  })

  describe('when there are option for the spec completeness', () => {
    it('returns the survey label', () => {
      expect(
        getProjectSpecCompleteness({
          projectSpecCompleteness: JobProjectSpecCompleteness.N_A,
          projectSpecCompletenessSurvey: {
            options: [
              {
                label: 'Test Label',
                value: JobProjectSpecCompleteness.N_A
              }
            ],
            question: 'Test'
          }
        })
      ).toBe('Test Label')
    })
  })
})
