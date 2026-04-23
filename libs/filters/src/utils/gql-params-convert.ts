import { QueryParams } from '@staff-portal/query-params-state'

import { getPaginationOffset } from './get-pagination-offset'

type GQLKey = string
type GQLConverter = (value: unknown, urlValues: QueryParams) => unknown

export interface OffsetPagination {
  limit: number
  offset: number
}

export interface GqlParams {
  [param: string]: [GQLConverter, GQLKey] | [GQLConverter]
}

const isGqlValueEmpty = (result: unknown) =>
  !result || (Array.isArray(result) && !result.length)

/**
 *
 * converts GQL configuration object to a GQL ready-to-use object,
 * that is used to filter queries results
 */
export const toGqlFilter = <T extends QueryParams, P>(
  config: GqlParams,
  urlValues: T
): P => {
  const allowedParams = Object.keys(config)

  return Object.entries(urlValues).reduce((gqlFilters, [urlKey, value]) => {
    if (allowedParams.includes(urlKey)) {
      const [converter, gqlKey] = config[urlKey]
      const result = converter(value, urlValues)
      const resultKey = gqlKey || urlKey

      if (typeof result === 'boolean') {
        return { ...gqlFilters, [resultKey]: result }
      }

      return isGqlValueEmpty(result)
        ? gqlFilters
        : { ...gqlFilters, [resultKey]: result }
    }

    return gqlFilters
  }, {}) as P
}

/**
 *
 * converts page + page size parameters to a GQL ready-to-use object,
 * that is used for pagination
 */
export const toGqlPagination = (
  pageSize: number,
  page?: string | number
): OffsetPagination => {
  return {
    limit: pageSize,
    offset: getPaginationOffset(page, pageSize)
  }
}
