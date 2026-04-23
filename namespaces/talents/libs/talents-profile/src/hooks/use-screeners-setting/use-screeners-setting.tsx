import { localStorageService } from '@staff-portal/local-storage-service'

const SCREENER_VIEW_KEY = 'screeners-view'

// Usage:
// const { screenersSetting, setScreenersSetting } = useScreenersSetting()
export const useScreenersSetting = () => {
  const setScreenersSetting = (value: boolean) => {
    localStorageService.setItem(SCREENER_VIEW_KEY, value)
  }
  const screenersSetting = Boolean(localStorageService.getItem(SCREENER_VIEW_KEY))

  return {
    screenersSetting,
    setScreenersSetting
  }
}
