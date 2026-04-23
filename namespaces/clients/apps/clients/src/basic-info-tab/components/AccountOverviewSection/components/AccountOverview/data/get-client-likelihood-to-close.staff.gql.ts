import { gql, useQuery } from '@staff-portal/data-layer-service'

import { GetLikeliHoodToCloseDocument } from './get-client-likelihood-to-close.staff.gql.types'

export default gql`
  query GetLikeliHoodToClose($clientId: ID!) {
    node(id: $clientId) {
      ... on Client {
        id
        likelihoodToClose
      }
    }
  }
`

export const useGetClientLikelihoodToClose = (clientId: string) => {
  const { data, ...rest } = useQuery(GetLikeliHoodToCloseDocument, {
    variables: { clientId }
  })

  return {
    data: data?.node?.likelihoodToClose,
    ...rest
  }
}
