// eslint-disable-next-line no-restricted-imports
import { ComponentType, lazy } from 'react'
import cookie from 'js-cookie'

const COOKIE_KEY = 'chunk-refreshed'

const lazyWithRetry = <T extends ComponentType<any>>(
  componentImport: () => Promise<{ default: T }>
) =>
  lazy<T>(async () => {
    const chunkRefreshed = JSON.parse(cookie.get(COOKIE_KEY) || 'false')

    try {
      const component = await componentImport()

      cookie.remove(COOKIE_KEY)

      return component
    } catch (error) {
      if (!chunkRefreshed) {
        // eslint-disable-next-line @miovision/disallow-date/no-new-date
        const date = new Date()

        date.setMinutes(date.getMinutes() + 10)

        cookie.set(COOKIE_KEY, 'true', { expires: date })

        // eslint-disable-next-line no-restricted-properties
        window.location.reload()

        return new Promise(() => {})
      }

      throw error
    }
  })

export default lazyWithRetry
