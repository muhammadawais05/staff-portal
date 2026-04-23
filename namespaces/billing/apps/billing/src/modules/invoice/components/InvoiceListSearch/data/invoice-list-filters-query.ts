import { useMemo } from 'react'
import { DropdownOptions } from '@staff-portal/billing/src/_lib/filters/filters-types'

import { useInvoicesListFiltersQuery } from './getInvoicesListFilters.graphql.types'

export const useInvoicesListFilters = () => {
  const { data, error, loading } = useInvoicesListFiltersQuery()

  if (!loading && (error || !data)) {
    throw error || `wrong data for useInvoicesListFilters`
  }

  const options: Record<string, DropdownOptions> = useMemo(
    () =>
      Object.entries(data || {}).reduce(
        (map, [key, item]) => ({
          ...map,
          [key]: item.nodes.map(({ id, fullName }) => ({
            label: fullName,
            value: id
          }))
        }),
        {}
      ),
    [data]
  )

  return { data, error, loading, options }
}

export const getInvoicesListFiltersQuerySource =
  (key: string) =>
  (): {
    options: DropdownOptions
    loading: boolean
  } => {
    const { options, loading } = useInvoicesListFilters()

    return { loading, options: options[key] || [] }
  }
