import { getValue } from './get-value'
import { interpolate } from './interpolate'
import { getValueByPath, getAssociationReferenceValueByPath } from './payload'
import { PayloadValueType } from './types'

jest.mock('./interpolate', () => ({
  interpolate: jest.fn()
}))
jest.mock('./payload', () => ({
  ...jest.requireActual('./payload'),
  getValueByPath: jest.fn(),
  getAssociationReferenceValueByPath: jest.fn()
}))

const interpolateMock = interpolate as jest.Mock
const getValueByPathMock = getValueByPath as jest.Mock
const getAssociationReferenceValueByPathMock =
  getAssociationReferenceValueByPath as jest.Mock

describe('getValue', () => {
  beforeEach(() => {
    interpolateMock.mockImplementation(
      ({ payload }: { payload: PayloadValueType | null }) => payload
    )
  })

  describe('when `getValueByPath` returns `undefined`', () => {
    it('returns `[variable.path]`', () => {
      getValueByPathMock.mockImplementation(() => undefined)

      expect(
        getValue(
          { path: 'performer', modifier: undefined },
          {
            action: 'claimed',
            payload: null
          }
        )
      ).toStrictEqual(['performer'])
    })
  })

  describe(`when 'getValueByPath' returns 'undefined' & 'path' doesn't include required substring`, () => {
    it('returns `[variable.path]`', () => {
      getValueByPathMock.mockImplementation(() => undefined)

      expect(
        getValue(
          { path: 'test.client', modifier: undefined },
          { action: 'claimed', payload: null }
        )
      ).toStrictEqual(['test.client'])
    })
  })

  describe(`when 'getValueByPath' returns 'undefined'
    & 'path' includes required substring & 'associationReferenceValue' exists`, () => {
    it('returns `associationReferenceValue`', () => {
      getValueByPathMock.mockImplementation(() => undefined)
      getAssociationReferenceValueByPathMock.mockImplementation(
        () => 'associationReferenceValue'
      )

      expect(
        getValue(
          { path: 'subject.client', modifier: undefined },
          { action: 'claimed', payload: null }
        )
      ).toBe('associationReferenceValue')
    })
  })

  describe(`when 'getValueByPath' returns 'PayloadValue'`, () => {
    it('returns `PayloadValue`', () => {
      getValueByPathMock.mockImplementation(() => 'PayloadValue')

      expect(
        getValue(
          { path: 'subject.client', modifier: undefined },
          { action: 'claimed', payload: null }
        )
      ).toBe('PayloadValue')
    })
  })
})
