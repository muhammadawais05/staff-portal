import { asQueryParam } from '@staff-portal/query-params-state'

export interface PageQueryParamOptions {
  itemsPerPage: number
  maxItems: number
}

const DEFAULT_MIN_PAGE = 1

export const pageQueryParam = ({
  itemsPerPage,
  maxItems
}: PageQueryParamOptions) =>
  asQueryParam<number, string>({
    encode: page => page?.toString(),
    decode: pageParam => {
      if (typeof pageParam !== 'string' || !pageParam.match(/^\d+$/)) {
        return DEFAULT_MIN_PAGE
      }

      const page = parseInt(pageParam)

      if (page < DEFAULT_MIN_PAGE) {
        return DEFAULT_MIN_PAGE
      }

      const maxPage = Math.ceil(maxItems / itemsPerPage)

      return Math.min(page, maxPage)
    }
  })
