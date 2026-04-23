import { PaginationParams } from '@staff-portal/filters'
import { getVerticalIds, useGetUserVerticals } from '@staff-portal/verticals'
import { useMemo } from 'react'

export const useGetVerticalIds = (
  filterValues: Omit<PaginationParams, 'limit' | 'page'>
) => {
  const { data, initialLoading: verticalsLoading } = useGetUserVerticals({
    skip: !filterValues.job_types
  })

  const verticalIds = useMemo(() => {
    const verticals = data || []

    return getVerticalIds({
      jobTypes: filterValues.job_types,
      verticals
    })
  }, [data, filterValues.job_types])

  return { verticalIds, verticalsLoading }
}
