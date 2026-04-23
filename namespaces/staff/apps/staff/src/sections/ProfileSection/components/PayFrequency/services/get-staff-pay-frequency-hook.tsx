import { useLazyQuery } from '@staff-portal/data-layer-service'

import { GetPayFrequencyDocument } from '../data'

const getStaffPayFrequencyHook = (staffId: string) => () => {
  const [request, { data, loading, called, error }] = useLazyQuery(
    GetPayFrequencyDocument,
    {
      variables: { staffId }
    }
  )

  return {
    request,
    loading,
    error,
    data: data?.node?.paymentsFrequency || '',
    called
  }
}

export default getStaffPayFrequencyHook
