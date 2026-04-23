import { validate } from './validate'
import { isEngagementSelected } from '../is-engagement-selected'

jest.mock('../is-engagement-selected', () => ({
  isEngagementSelected: jest.fn()
}))

const isEngagementSelectedMock = isEngagementSelected as jest.Mock

const answersMock = {
  scores: Array(1).fill(null)
}

describe('#validate', () => {
  describe('when there is more than 1 engagement', () => {
    it('calls isEngagementSelected', () => {
      const engagementsCountMock = 2

      isEngagementSelectedMock.mockReturnValue([])

      const result = validate(answersMock, engagementsCountMock)

      expect(isEngagementSelectedMock).toHaveBeenCalledWith(answersMock)
      expect(result).toEqual({
        negative: []
      })
    })
  })

  describe('when there is not more than 1 engagement', () => {
    it('does not calls isEngagementSelected', () => {
      const engagementsCountMock = 1

      validate(answersMock, engagementsCountMock)

      expect(isEngagementSelectedMock).not.toHaveBeenCalled()
    })
  })

  describe('when no errors', () => {
    it('returns empty error arrays', () => {
      const engagementsCountMock = 1

      const result = validate(answersMock, engagementsCountMock)

      expect(result).toEqual({
        negative: [null]
      })
    })
  })
})
