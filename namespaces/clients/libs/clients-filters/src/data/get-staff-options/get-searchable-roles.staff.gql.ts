import { BATCH_KEY, gql, useQuery } from '@staff-portal/data-layer-service'

import { CLIENT_STAFF_BATCH_KEY } from '../../config'
import { GetClientStaffOptionsDocument } from './get-searchable-roles.staff.gql.types'

export default gql`
  query GetClientStaffOptions {
    accountManagers: searchableRoles(
      filter: { scope: COMPANY_SMB_ACCOUNT_MANAGERS }
      order: { field: FULL_NAME, direction: ASC }
    ) {
      nodes {
        id
        fullName
        type
      }
    }

    claimers: searchableRoles(
      filter: { scope: COMPANY_CLAIMERS }
      order: { field: FULL_NAME, direction: ASC }
    ) {
      nodes {
        id
        fullName
        type
      }
    }

    clientPartners: searchableRoles(
      filter: { scope: COMPANY_CLIENT_PARTNERS }
      order: { field: FULL_NAME, direction: ASC }
    ) {
      nodes {
        id
        fullName
        type
      }
    }

    financeTeamMembers: searchableRoles(
      filter: { scope: COMPANY_FINANCE_TEAM_MEMBERS }
      order: { field: FULL_NAME, direction: ASC }
    ) {
      nodes {
        id
        fullName
        type
      }
    }

    deliveryManagers: searchableRoles(
      filter: { scope: COMPANY_SMB_PROJECT_DELIVERY_MANAGERS }
      order: { field: FULL_NAME, direction: ASC }
    ) {
      nodes {
        id
        fullName
        type
      }
    }

    salesSpecialists: searchableRoles(
      filter: { scope: COMPANY_SMB_PROJECT_SALES_SPECIALISTS }
      order: { field: FULL_NAME, direction: ASC }
    ) {
      nodes {
        id
        fullName
        type
      }
    }

    projectRelationshipManagers: searchableRoles(
      filter: { scope: COMPANY_SMB_PROJECT_RELATIONSHIP_MANAGERS }
      order: { field: FULL_NAME, direction: ASC }
    ) {
      nodes {
        id
        fullName
        type
      }
    }

    relationshipManagers: searchableRoles(
      filter: { scope: SMB_RELATIONSHIP_MANAGERS }
      order: { field: FULL_NAME, direction: ASC }
    ) {
      nodes {
        id
        fullName
        type
      }
    }

    matchingOperationsCoordinators: searchableRoles(
      filter: { scope: COMPANY_MATCHING_OPERATIONS_COORDINATORS }
      order: { field: FULL_NAME, direction: ASC }
    ) {
      nodes {
        id
        fullName
        type
      }
    }
  }
`

const rolesToOptions = ({
  fullName,
  id
}: {
  fullName: string
  id: string
}) => ({ label: fullName, value: id })

export const useGetClientStaffOptions = () => {
  const { data, initialLoading, loading } = useQuery(
    GetClientStaffOptionsDocument,
    {
      context: { [BATCH_KEY]: CLIENT_STAFF_BATCH_KEY }
    }
  )

  const {
    accountManagers,
    claimers,
    clientPartners,
    deliveryManagers,
    financeTeamMembers,
    projectRelationshipManagers,
    relationshipManagers,
    salesSpecialists,
    matchingOperationsCoordinators
  } = data || {}

  return {
    accountManagerOptions: accountManagers?.nodes.map(rolesToOptions) || [],
    claimerOptions: claimers?.nodes.map(rolesToOptions) || [],
    clientPartnerOptions: clientPartners?.nodes.map(rolesToOptions) || [],
    financeTeamMemberOptions:
      financeTeamMembers?.nodes.map(rolesToOptions) || [],
    deliveryManagerOptions: deliveryManagers?.nodes.map(rolesToOptions) || [],
    salesSpecialistsOptions: salesSpecialists?.nodes.map(rolesToOptions) || [],
    projectRelationshipManagerOptions:
      projectRelationshipManagers?.nodes.map(rolesToOptions) || [],
    relationshipManagerOptions:
      relationshipManagers?.nodes.map(rolesToOptions) || [],
    matchingOperationsCoordinatorsOptions:
      matchingOperationsCoordinators?.nodes.map(rolesToOptions) || [],
    initialLoading,
    loading
  }
}
