import * as Apollo from '@apollo/client'
import { UseGetDataHookResult } from '@staff-portal/billing/src/components/ListPage/components/ListState/ListState'

const useGetMyExpectedCommissionsFormattedData = <T>(
  queryResult: Apollo.QueryResult
) => {
  const { data, ...rest } = queryResult

  return {
    ...rest,
    data: data?.viewer.expectedCommissions ?? undefined
  } as UseGetDataHookResult<T, void>
}

export default useGetMyExpectedCommissionsFormattedData
