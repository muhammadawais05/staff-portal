import { AnySchema, mixed } from 'yup'

import { createArrayValidator } from '../create-array-validator/create-array-validator'
import { createStringValidator } from '../create-string-validator/create-string-validator'
import { getSchemaValidator } from './get-schema-validator'

jest.mock('../create-array-validator/create-array-validator')
jest.mock('../create-string-validator/create-string-validator')
jest.mock('yup', () => ({
  ...jest.requireActual('yup'),
  mixed: jest.fn()
}))

const mockCreateArrayValidator = createArrayValidator as jest.Mock
const mockCreateStringValidator = createStringValidator as jest.Mock
const mockMixed = mixed as jest.Mock

describe('getSchemaValidator', () => {
  beforeEach(() => {
    mockCreateArrayValidator.mockImplementation(() => null)
    mockCreateStringValidator.mockImplementation(() => null)
    mockMixed.mockImplementation(() => null)
  })

  describe('when type is string', () => {
    it('returns a string validator', () => {
      getSchemaValidator('string', { acceptedValues: ['abc'] })

      expect(mockCreateStringValidator).toHaveBeenCalledWith({
        acceptedValues: ['abc']
      })
    })
  })

  describe('when type is mixed', () => {
    it('returns a mixed validator', () => {
      getSchemaValidator('mixed')

      expect(mockMixed).toHaveBeenCalled()
    })
  })

  describe('when type is array', () => {
    it('returns a array validator', () => {
      getSchemaValidator('array', {
        schemaOf: { name: 'test' } as unknown as AnySchema
      })

      expect(mockCreateArrayValidator).toHaveBeenCalledWith({ name: 'test' })
    })
  })
})
