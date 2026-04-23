import { string } from 'yup'

import { createStringValidator } from './create-string-validator'

jest.mock('yup', () => ({
  string: jest.fn()
}))

const mockString = string as jest.Mock

describe('createStringValidator', () => {
  describe('when accepted values are missing', () => {
    it('returns validator without calling oneOf', () => {
      const oneOf = jest.fn()

      mockString.mockImplementation(() => ({ oneOf }))

      const result = createStringValidator()

      expect(oneOf).not.toHaveBeenCalled()
      expect(result).toStrictEqual({ oneOf: expect.anything() })
    })
  })

  describe('when accepted values are passed', () => {
    it('returns validator with calling oneOf', () => {
      const oneOf = jest.fn(() => 'validator')

      mockString.mockImplementation(() => ({ oneOf }))

      const result = createStringValidator({ acceptedValues: ['abc'] })

      expect(oneOf).toHaveBeenCalledWith(['abc'])
      expect(result).toBe('validator')
    })
  })
})
