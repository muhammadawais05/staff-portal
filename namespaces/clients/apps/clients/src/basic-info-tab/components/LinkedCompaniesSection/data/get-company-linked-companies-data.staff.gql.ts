import { gql, useGetStaffNode } from '@staff-portal/data-layer-service'

import { GetLinkedClientDocument } from './get-company-linked-companies-data.staff.gql.types'
import { LINKED_COMPANY_NODE_FRAGMENT } from './linked-company-node-fragment.staff.gql'

export default gql`
  query GetLinkedClient($clientId: ID!) {
    staffNode(id: $clientId) {
      ...LinkedCompanyFragment
    }
  }

  fragment LinkedCompanyFragment on Client {
    id
    fullName
    children(filter: { badLead: true }) {
      nodes {
        ...LinkedCompanyNodeFragment
      }
    }
  }
  ${LINKED_COMPANY_NODE_FRAGMENT}
`

export const useGetCompanyLinkedCompanies = (clientId: string) => {
  const { data, refetch, loading } = useGetStaffNode(GetLinkedClientDocument)({
    clientId
  })

  return {
    companies: data?.children?.nodes || [],
    refetch,
    loading
  }
}
