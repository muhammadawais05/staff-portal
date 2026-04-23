import { useGetNode } from '@staff-portal/data-layer-service'

import { GetClientSignerDetailsDocument } from '../data/get-client-signer-details/get-client-signer-details.staff.gql.types'

export const useGetClientSignerDetails = (clientId: string) => {
  const { data, loading, error, called } = useGetNode(
    GetClientSignerDetailsDocument
  )({
    clientId
  })

  return { data, loading, error, called }
}
