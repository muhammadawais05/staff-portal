import { useLazyQuery } from '@staff-portal/data-layer-service'

import { GetClientLeadStatusModalDataDocument } from '../data/get-client-lead-status-modal-data.staff.gql.types'

export const useGetClientLeadStatusModalData = (clientId: string) => {
  const [getData, { data, loading, called, error }] = useLazyQuery(
    GetClientLeadStatusModalDataDocument,
    {
      variables: { clientId }
    }
  )

  return {
    getData,
    loading,
    error,
    data,
    called
  }
}

export default useGetClientLeadStatusModalData
