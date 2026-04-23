import localStorageService from './local-storage'
import { QUOTA_EXCEEDED_ERROR_NAME } from './utils/is-quota-exceeded-error'

const ITEM_KEY_1 = 'item-1'
const ITEM_KEY_2 = 'item-2'
const ITEM_VALUE = 'aaa'

describe('LocalStorageService', () => {
  afterEach(() => {
    localStorageService.clear()
  })

  describe('clear', () => {
    it('clears `LocalStorage`', () => {
      localStorageService.setItem(ITEM_KEY_1, ITEM_VALUE)
      localStorageService.setItem(ITEM_KEY_2, ITEM_VALUE)
      localStorageService.clear()

      const item1 = localStorageService.getItem(ITEM_KEY_1)
      const item2 = localStorageService.getItem(ITEM_KEY_2)

      expect(item1).toBeNull()
      expect(item2).toBeNull()
    })

    it('returns false if the value does not exist in `LocalStorage`', () => {
      const result = localStorageService.hasItem(ITEM_KEY_1)

      expect(result).toBe(false)
    })
  })

  describe('hasItem', () => {
    it('returns true if the value exists in `LocalStorage`', () => {
      localStorageService.setItem(ITEM_KEY_1, ITEM_VALUE)
      const result = localStorageService.hasItem(ITEM_KEY_1)

      expect(result).toBe(true)
    })

    it('returns false if the value does not exist in `LocalStorage`', () => {
      const result = localStorageService.hasItem(ITEM_KEY_1)

      expect(result).toBe(false)
    })
  })

  describe('getItem', () => {
    it('returns item if the value exists in `LocalStorage`', () => {
      localStorageService.setItem(ITEM_KEY_1, ITEM_VALUE)
      const item = localStorageService.getItem(ITEM_KEY_1)

      expect(item).toBe(ITEM_VALUE)
    })

    it('returns null if the value does not exist in `LocalStorage`', () => {
      const item = localStorageService.getItem(ITEM_KEY_1)

      expect(item).toBeNull()
    })
  })

  describe('setItem', () => {
    it('sets item', () => {
      localStorageService.setItem(ITEM_KEY_1, ITEM_VALUE)
      const item = localStorageService.getItem(ITEM_KEY_1)

      expect(item).toBe(ITEM_VALUE)
    })

    describe('when `QuotaExceed` error happens', () => {
      const initialSetItem = Storage.prototype.setItem

      beforeEach(() => {
        Storage.prototype.setItem = jest.fn(() => {
          throw new DOMException('err', QUOTA_EXCEEDED_ERROR_NAME)
        })
      })

      afterEach(() => {
        Storage.prototype.setItem = initialSetItem
      })

      it('does not set item', () => {
        localStorageService.setItem(ITEM_KEY_1, ITEM_VALUE)
        const item = localStorageService.getItem(ITEM_KEY_1)

        expect(item).toBeNull()
      })
    })
  })

  describe('removeItem', () => {
    it('removes item', () => {
      localStorageService.setItem(ITEM_KEY_1, ITEM_VALUE)
      localStorageService.removeItem(ITEM_KEY_1)
      const item = localStorageService.getItem(ITEM_KEY_1)

      expect(item).toBeNull()
    })
  })
})
