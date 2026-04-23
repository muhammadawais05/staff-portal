import { getSchemaValidator } from '../get-schema-validator/get-schema-validator'
import { createSchemaValidator } from './create-schema-validator'

jest.mock('../get-schema-validator/get-schema-validator')

const mockGetSchemaValidator = getSchemaValidator as jest.Mock
const mockNullable = jest.fn()
const mockRequired = jest.fn()

describe('createSchemaValidator', () => {
  beforeEach(() => {
    mockGetSchemaValidator.mockImplementation(() => ({
      required: jest.fn(() => {
        mockRequired()

        return { nullable: mockNullable }
      }),
      nullable: mockNullable
    }))
  })

  describe('when required and nullable are false', () => {
    it('does not call the required or nullable', () => {
      createSchemaValidator({})

      expect(mockGetSchemaValidator).toHaveBeenCalledWith('string', {
        acceptedValues: undefined,
        schemaOf: undefined
      })
      expect(mockRequired).not.toHaveBeenCalled()
      expect(mockNullable).not.toHaveBeenCalled()
    })
  })

  describe('when required is true', () => {
    it('calls the required function', () => {
      createSchemaValidator({ required: true })

      expect(mockGetSchemaValidator).toHaveBeenCalledWith('string', {
        acceptedValues: undefined,
        schemaOf: undefined
      })
      expect(mockRequired).toHaveBeenCalled()
      expect(mockNullable).not.toHaveBeenCalled()
    })
  })

  describe('when nullable is true', () => {
    it('calls the nullable function', () => {
      createSchemaValidator({ nullable: true })

      expect(mockGetSchemaValidator).toHaveBeenCalledWith('string', {
        acceptedValues: undefined,
        schemaOf: undefined
      })
      expect(mockRequired).not.toHaveBeenCalled()
      expect(mockNullable).toHaveBeenCalled()
    })
  })

  describe('when required and nullable are true', () => {
    it('calls the required and nullable', () => {
      createSchemaValidator({ required: true, nullable: true })

      expect(mockGetSchemaValidator).toHaveBeenCalledWith('string', {
        acceptedValues: undefined,
        schemaOf: undefined
      })
      expect(mockRequired).toHaveBeenCalled()
      expect(mockNullable).toHaveBeenCalled()
    })
  })
})
