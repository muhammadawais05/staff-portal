import { gql } from 'graphql-tag'
import { useQuery } from '@staff-portal/data-layer-service'

import { GetClientForCreateRepresentativeDocument } from './get-client-for-create-representative.staff.gql.types'

export default gql`
  query GetClientForCreateRepresentative($clientId: ID!) {
    node(id: $clientId) {
      ... on Client {
        id
        fullName
        companyLegacyId
        contactInvitable
        portalPermissionsEnabled
      }
    }
  }
`

export const useGetClientForCreateRepresentative = (clientId: string) => {
  const { data, ...rest } = useQuery(GetClientForCreateRepresentativeDocument, {
    variables: { clientId }
  })

  return { ...rest, client: data?.node }
}
