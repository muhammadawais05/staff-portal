import { isTalentInterviewFeedbackHidden } from './is-talent-interview-feedback-hidden'

describe('#isTalentInterviewFeedbackHidden', () => {
  describe('returns true', () => {
    it('when comment and rating are empty', () => {
      expect(
        isTalentInterviewFeedbackHidden({
          comment: null,
          rating: null
        })
      ).toBe(true)
    })
  })

  describe('returns false', () => {
    it('when only comment is empty', () => {
      expect(
        isTalentInterviewFeedbackHidden({
          comment: null,
          rating: 0
        })
      ).toBe(false)
    })

    it('when only rating is empty', () => {
      expect(
        isTalentInterviewFeedbackHidden({
          comment: 'Comment',
          rating: null
        })
      ).toBe(false)
    })
  })
})
