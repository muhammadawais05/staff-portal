import getFilteredInternalFeedback, {
  Props
} from './get-filtered-internal-feedback'

describe('getFilteredInternalFeedback', () => {
  it.each([
    {
      feedback: { a: true, b: true, c: false },
      expectedFeedback: ['a', 'b']
    },
    {
      feedback: undefined,
      expectedFeedback: []
    },
    {
      feedback: { c: false },
      expectedFeedback: []
    }
  ])('formats feedback', ({ feedback, expectedFeedback }) => {
    expect(
      getFilteredInternalFeedback({
        internalFeedback: feedback
      } as Props)
    ).toStrictEqual(expectedFeedback)
  })
})
