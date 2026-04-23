import { asQueryParam } from '@staff-portal/query-params-state'

interface LimitQueryParamOptions {
  defaultLimit?: number
  availableLimits?: number[]
}

const DEFAULT_PAGE_LIMIT = 10

export const LimitQueryParam = ({
  defaultLimit = DEFAULT_PAGE_LIMIT,
  availableLimits
}: LimitQueryParamOptions = {}) =>
  asQueryParam({
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
