import { useMemo } from 'react'
import { useNotifications } from '@toptal/picasso/utils'

import { useGetParentCompanies } from '../data/get-parent-companies'

type ParentCompanyOptions = {
  label: string
  value: string
}

export const useGetParentCompaniesFilter = () => {
  const { showError } = useNotifications()

  const { parentCompanies, loading } = useGetParentCompanies({
    onError: () =>
      showError('An error occurred, unable to fetch parent companies.')
  })

  const options: ParentCompanyOptions[] = useMemo(
    () =>
      parentCompanies
        ? parentCompanies.map(company => ({
            label: company?.fullName || '',
            value: company?.id || ''
          }))
        : [],
    [parentCompanies]
  )

  return {
    options,
    loading
  } as const
}
