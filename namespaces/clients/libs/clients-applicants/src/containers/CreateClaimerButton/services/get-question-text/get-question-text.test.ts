import { getQuestionText } from './get-question-text'

describe('getQuestionText', () => {
  describe('when obscureLead is not provided', () => {
    it.each([false, undefined, null])(
      'returns question with user fullName',
      obscureLead => {
        const fullName = 'fullName'

        const actual = getQuestionText({
          obscureLead,
          fullName
        })

        expect(actual).toBe(
          `Are you sure that you want to claim "${fullName}"?`
        )
      }
    )
  })

  describe('when obscureLead is provided', () => {
    it('returns question without user fullName', () => {
      const fullName = 'fullName'
      const obscureLead = true

      const actual = getQuestionText({
        obscureLead,
        fullName
      })

      expect(actual).toBe('Are you sure that you want to claim the applicant?')
    })
  })
})
