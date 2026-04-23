import { QueryParams } from '@staff-portal/query-params-state'

import { LogicOperator } from '../../types'
import { badgesToGql } from './badges-to-gql'

export const SearchBarGqlParam =
  <T, P = never, S = string>(convert?: (option: P) => S) =>
  (value: unknown, urlValues: QueryParams) => {
    const result = { ...(value as { [key: string]: S[] }) }

    if (!Object.values(result).some(arr => arr.length)) {
      return undefined
    }

    if (convert) {
      Object.entries(result).map(
        ([key, values]) =>
          (result[key] = (values as unknown[]).map(it => convert(it as P)))
      )
    }

    return badgesToGql<T>(
      result as unknown as unknown[][],
      urlValues.logic as LogicOperator
    )
  }
