import { asQueryParam } from '@staff-portal/query-params-state'
import { DEFAULT_PAGE_SIZE, DEFAULT_LIMIT_OPTIONS } from '@staff-portal/config'

interface LimitQueryParamOptions {
  defaultLimit?: number
  availableLimits?: number[]
}

export const limitQueryParam = ({
  defaultLimit = DEFAULT_PAGE_SIZE,
  availableLimits = DEFAULT_LIMIT_OPTIONS
}: LimitQueryParamOptions = {}) =>
  asQueryParam<number, string>({
    encode: (limit: number) => limit?.toString(),
    decode: (limitParam: string) => {
      const limit = parseInt(limitParam)

      if (
        limitParam &&
        (!limitParam.match(/^\d+$/) ||
          (availableLimits && !availableLimits.includes(limit)))
      ) {
        return defaultLimit
      }

      return limit
    }
  })
