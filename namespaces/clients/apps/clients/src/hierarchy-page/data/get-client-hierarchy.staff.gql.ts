import { gql, useQuery } from '@staff-portal/data-layer-service'

import { GetClientHierarchyDocument } from './get-client-hierarchy.staff.gql.types'

export default gql`
  query GetClientHierarchy($clientId: ID!, $includeBadLeads: Boolean!) {
    node(id: $clientId) {
      ... on Client {
        id
        fullName
        hierarchy {
          clients {
            nodes {
              ...ClientHierarchyItemFragment
            }
          }
        }
      }
    }
  }

  fragment ClientHierarchyItemFragment on Client {
    id
    badLead
    webResource {
      url
      text
    }
    parent {
      id
    }
    children(filter: { badLead: $includeBadLeads }) {
      nodes {
        id
      }
    }
  }
`

export const useGetClientHierarchy = (
  clientId: string,
  includeBadLeads: boolean
) =>
  useQuery(GetClientHierarchyDocument, {
    variables: { clientId, includeBadLeads }
  })
