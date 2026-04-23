import { useMemo } from 'react'
import { useQuery } from '@staff-portal/data-layer-service'

import {
  GetAvailableJobsDocument,
  GetAvailableJobsQueryVariables
} from './get-available-jobs.staff.gql.types'

export const useGetAvailableJobs = (
  variables: GetAvailableJobsQueryVariables
) => {
  const { data, loading, error } = useQuery(GetAvailableJobsDocument, {
    variables
  })

  const options = useMemo(
    () =>
      (data?.node?.jobs?.nodes || []).map(({ id, title }) => ({
        value: id,
        text: title
      })),
    [data]
  )

  return {
    options,
    loading,
    error
  }
}
