import { gql, useGetNode } from '@staff-portal/data-layer-service'

import { GetClientRepresentativesDocument } from './get-client-representatives.staff.gql.types'

export default gql`
  query GetClientRepresentatives($clientId: ID!) {
    node(id: $clientId) {
      ... on Client {
        id
        representatives(filter: { statuses: ACTIVE }) {
          nodes {
            ...ClientRepresentative
          }
        }
      }
    }
  }

  fragment ClientRepresentative on CompanyRepresentative {
    id
    fullName
    phoneNumber
  }
`

export const useGetClientRepresentatives = ({
  clientId,
  onError
}: {
  clientId: string
  onError?: () => void
}) => {
  const { data, ...rest } = useGetNode(GetClientRepresentativesDocument)(
    { clientId },
    { onError }
  )

  return {
    ...rest,
    representatives: data?.representatives.nodes
  }
}
