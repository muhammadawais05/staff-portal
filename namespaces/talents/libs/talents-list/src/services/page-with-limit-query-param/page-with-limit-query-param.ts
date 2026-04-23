import { asQueryParam } from '@staff-portal/query-params-state'

interface PageWithLimitQueryParamOptions {
  maxItems: number
  defaultItemsPerPage: number
}

const DEFAULT_MIN_PAGE = 1
const LIMIT_QUERY_PARAM_KEY = 'limit'

export const PageWithLimitQueryParam = ({
  maxItems,
  defaultItemsPerPage
}: PageWithLimitQueryParamOptions) =>
  asQueryParam<number, string>({
    encode: page => page?.toString(),
    decode: async (pageParam, values, configuration) => {
      const page = parseInt(pageParam)

      if (!pageParam.match(/^\d+$/) || page < DEFAULT_MIN_PAGE) {
        return DEFAULT_MIN_PAGE
      }

      const limitConfig = configuration[LIMIT_QUERY_PARAM_KEY]
      const itemsPerPage = limitConfig
        ? await limitConfig.decode(
            values[LIMIT_QUERY_PARAM_KEY],
            values,
            configuration
          )
        : defaultItemsPerPage
      const maxPage = Math.ceil(maxItems / itemsPerPage)

      return Math.min(page, maxPage)
    }
  })
