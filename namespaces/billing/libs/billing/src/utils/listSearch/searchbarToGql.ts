import { LogicOperator, badgesToGql } from '@staff-portal/filters'
import { QueryParams } from '@staff-portal/query-params-state'
import { isEmpty } from 'lodash-es'

// copied from https://github.com/toptal/staff-portal/blob/master/libs/filters/src/utils/gql-param/searchbar-to-gql.ts#L1
// to adjust our needs for https://toptal-core.atlassian.net/browse/SPB-1397

type ConvertModel<Option, ReturnType> = {
  [key in string]: (param: Option) => ReturnType
}
export const SearchBarGqlParam =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any


    <T, P = any, S = string>(convertModel: ConvertModel<P, S>) =>
    (value: object, urlValues: QueryParams) => {
      const result = { ...(value as { [key: string]: S[] }) }

      if (isEmpty(result)) {
        return undefined
      }

      if (!isEmpty(convertModel)) {
        Object.entries(result).map(
          ([key, values]) =>
            (result[key] = (values as unknown[]).map(
              val => convertModel[key](val as P) ?? (val as S)
            ))
        )
      }

      return badgesToGql<T>(
        result as unknown as unknown[][],
        urlValues.logic as LogicOperator
      )
    }
