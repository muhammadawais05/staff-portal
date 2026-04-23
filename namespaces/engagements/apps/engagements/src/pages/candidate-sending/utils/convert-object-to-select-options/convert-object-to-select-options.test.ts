import { convertObjectToSelectOptions } from './convert-object-to-select-options'

describe('convertObjectToSelectOptions', () => {
  describe('when object is null', () => {
    it('returns empty list', () => {
      expect(convertObjectToSelectOptions()).toStrictEqual([])
    })
  })

  describe('when passing an empty object', () => {
    it('returns empty list', () => {
      expect(convertObjectToSelectOptions({})).toStrictEqual([])
    })
  })

  describe('when passing an object', () => {
    it('returns a list', () => {
      expect(
        convertObjectToSelectOptions({ propOne: 'value 1', propTwo: 'value 2' })
      ).toStrictEqual([
        { text: 'value 1', value: 'propOne' },
        { text: 'value 2', value: 'propTwo' }
      ])
    })
  })

  describe('when passing an enum', () => {
    it('returns a list', () => {
      enum MyEnum {
        ACTIVE = 'Active',
        INACTIVE = 'Inactive'
      }

      expect(convertObjectToSelectOptions(MyEnum)).toStrictEqual([
        { text: 'Active', value: 'ACTIVE' },
        { text: 'Inactive', value: 'INACTIVE' }
      ])
    })
  })
})
