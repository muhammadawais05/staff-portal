import { getListItemDifference } from './get-list-item-difference'

describe('getListItemDifference', () => {
  describe('when both list are empty', () => {
    it('returns undefined', () => {
      expect(
        getListItemDifference({ originalList: [], compareList: [] })
      ).toBeUndefined()
    })
  })

  describe('when both list are identical', () => {
    it('returns undefined', () => {
      const ITEM = { text: 'Some', value: 'Some' }

      expect(
        getListItemDifference({ originalList: [ITEM], compareList: [ITEM] })
      ).toBeUndefined()
    })
  })

  describe('when the compare list contains more items', () => {
    it('returns undefined', () => {
      const ITEM = { text: 'Some', value: 'Some' }
      const SECOND_ITEM = { text: 'Some 2', value: 'Some 2' }

      expect(
        getListItemDifference({
          originalList: [ITEM],
          compareList: [ITEM, SECOND_ITEM]
        })
      ).toBeUndefined()
    })
  })

  describe('when the original list contains more items', () => {
    it('returns the difference', () => {
      const ITEM = { text: 'Some', value: 'Some' }
      const SECOND_ITEM = { text: 'Some 2', value: 'Some 2' }

      expect(
        getListItemDifference({
          originalList: [ITEM, SECOND_ITEM],
          compareList: [ITEM]
        })
      ).toStrictEqual(SECOND_ITEM)
    })
  })

  describe('when the compare list is empty', () => {
    it('returns the difference', () => {
      const ITEM = { text: 'Some', value: 'Some' }

      expect(
        getListItemDifference({
          originalList: [ITEM],
          compareList: []
        })
      ).toStrictEqual(ITEM)
    })
  })

  describe('when the compare list is empty and original list contains multiple values', () => {
    it('returns the first difference', () => {
      const ITEM = { text: 'Some', value: 'Some' }
      const SECOND_ITEM = { text: 'Some 2', value: 'Some 2' }

      expect(
        getListItemDifference({
          originalList: [ITEM, SECOND_ITEM],
          compareList: []
        })
      ).toStrictEqual(ITEM)
    })
  })

  describe('when the original list contains multiple differences', () => {
    it('returns the first difference', () => {
      const ITEM = { text: 'Some', value: 'Some' }
      const SECOND_ITEM = { text: 'Some 2', value: 'Some 2' }
      const THIRD_ITEM = { text: 'Some 2', value: 'Some 3' }

      expect(
        getListItemDifference({
          originalList: [ITEM, SECOND_ITEM, THIRD_ITEM],
          compareList: [ITEM]
        })
      ).toStrictEqual(SECOND_ITEM)
    })
  })
})
