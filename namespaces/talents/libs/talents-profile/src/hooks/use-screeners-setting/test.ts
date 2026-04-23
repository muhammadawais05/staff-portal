import { renderHook } from '@testing-library/react-hooks'
import { localStorageService } from '@staff-portal/local-storage-service'

import { useScreenersSetting } from './use-screeners-setting'

const LOCAL_STORAGE_KEY = 'screeners-view'

jest.mock('@staff-portal/local-storage-service', () => ({
  localStorageService: {
    setItem: jest.fn(),
    getItem: jest.fn()
  }
}))

const localStorageServiceMock = localStorageService as unknown as {
  getItem: jest.Mock<ReturnType<typeof localStorageService.getItem>>
  setItem: jest.Mock<ReturnType<typeof localStorageService.setItem>>
}

describe('useScreenersSetting', () => {
  describe('screenersSetting', () => {
    it('returns value from local storage', () => {
      // arrange
      localStorageServiceMock.getItem.mockReturnValue(true)

      // act
      const {
        result: { current: { screenersSetting } }
      } = renderHook(() => useScreenersSetting())

      // assert
      expect(localStorageServiceMock.getItem).toHaveBeenCalledWith(
        LOCAL_STORAGE_KEY
      )
      expect(screenersSetting).toBe(true)
    })
  })

  describe('setScreenersSetting', () => {
    it('sets value to local storage', () => {
      // arrange
      const {
        result: { current: { setScreenersSetting } }
      } = renderHook(() => useScreenersSetting())

      // act
      setScreenersSetting(true)

      // assert
      expect(localStorageServiceMock.setItem).toHaveBeenCalledWith(
        LOCAL_STORAGE_KEY,
        true
      )
    })
  })
})
