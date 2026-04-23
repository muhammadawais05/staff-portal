import { isQuotaExceededError } from './utils'

const localStorageService = {
  clear: (): void => {
    if (!window.localStorage) {
      return
    }

    // eslint-disable-next-line no-restricted-syntax
    localStorage.clear()
  },

  hasItem: (key: string): boolean => {
    if (!window.localStorage || !key) {
      return false
    }

    // eslint-disable-next-line no-restricted-syntax
    const item = localStorage.getItem(key)

    return item !== null
  },

  getItem: <T>(key: string): T | null | undefined => {
    if (!window.localStorage || !key) {
      return
    }

    // eslint-disable-next-line no-restricted-syntax
    const item = localStorage.getItem(key)

    if (item === null) {
      return null
    }

    try {
      return JSON.parse(item) as T
    } catch {
      return null
    }
  },

  setItem: (key: string, value: unknown): void => {
    if (!window.localStorage || !key) {
      return
    }

    try {
      // eslint-disable-next-line no-restricted-syntax
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      if (error instanceof Error && isQuotaExceededError(error)) {
        return
      }

      throw error
    }
  },

  removeItem: (key: string): void => {
    if (!window.localStorage || !key) {
      return
    }

    // eslint-disable-next-line no-restricted-syntax
    localStorage.removeItem(key)
  },

  length: () => {
    if (!window.localStorage) {
      return 0
    }

    // eslint-disable-next-line no-restricted-syntax
    return localStorage.length
  },

  key: (keyIndex: number) => {
    if (!window.localStorage) {
      return
    }

    // eslint-disable-next-line no-restricted-syntax
    return localStorage.key(keyIndex)
  }
}

export default localStorageService
