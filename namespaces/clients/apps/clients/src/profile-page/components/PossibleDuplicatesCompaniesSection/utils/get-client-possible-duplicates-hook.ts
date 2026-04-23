import { useGetNode } from '@staff-portal/data-layer-service'

import { GetClientPossibleDuplicatesDocument } from '../data/get-client-possible-duplicates.staff.gql.types'

export const useGetClientPossibleDuplicates = (clientId: string) => {
  const { data, loading, called, error } = useGetNode(GetClientPossibleDuplicatesDocument)({ clientId })

  return {
    loading,
    error,
    data: data?.unresolvedPossibleDuplicates,
    called
  }
}
