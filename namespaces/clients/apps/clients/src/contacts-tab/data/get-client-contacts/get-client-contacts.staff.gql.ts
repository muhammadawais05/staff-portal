import { useGetNode, gql } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'
import { REPRESENTATIVE_FRAGMENT } from '@staff-portal/client-representatives'

import {
  GetClientContactsDocument,
  GetClientContactsQueryVariables as QueryVariablesType
} from './get-client-contacts.staff.gql.types'

export const GET_CLIENT_CONTACTS = gql`
  query GetClientContacts(
    $clientId: ID!
    $pagination: OffsetPagination!
    $filter: ClientRepresentativeFilter!
  ) {
    node(id: $clientId) {
      ... on Client {
        id

        children {
          totalCount
          __typename
        }

        operations {
          createCompanyRepresentative {
            ...OperationFragment
            __typename
          }

          __typename
        }

        representatives(pagination: $pagination, filter: $filter) {
          nodes {
            id
            ...Representative
          }
          totalCount
          __typename
        }

        __typename
      }
    }
  }

  ${OPERATION_FRAGMENT}
  ${REPRESENTATIVE_FRAGMENT}
`

export const useGetClientContacts = (
  variables: QueryVariablesType,
  skip?: boolean
) => {
  const { data, loading, initialLoading } = useGetNode(
    GetClientContactsDocument
  )(variables, { skip })

  const {
    representatives: { nodes, totalCount } = {
      nodes: undefined,
      totalCount: undefined
    },
    children,
    operations
  } = data ?? {}

  return {
    representatives: nodes,
    totalCount,
    hasChildrenCompanies: Boolean(children?.totalCount),
    operations,
    initialLoading,
    loading
  }
}
