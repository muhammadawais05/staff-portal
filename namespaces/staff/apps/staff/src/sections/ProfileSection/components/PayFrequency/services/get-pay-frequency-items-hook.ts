import { useMemo } from 'react'
import { useLazyQuery } from '@staff-portal/data-layer-service'

import { GetPayFrequenciesItemsDocument } from '../data'

const getPayFrequencyItemsHook = () => () => {
  const [request, { data, loading, called, error }] = useLazyQuery(
    GetPayFrequenciesItemsDocument
  )

  const nodes = data?.rolesPaymentsFrequencies
  const options = useMemo(
    () =>
      nodes?.map(payFrequency => ({
        text: payFrequency,
        value: payFrequency
      })),
    [nodes]
  )

  return {
    request,
    loading,
    error,
    data: options,
    called
  }
}

export default getPayFrequencyItemsHook
