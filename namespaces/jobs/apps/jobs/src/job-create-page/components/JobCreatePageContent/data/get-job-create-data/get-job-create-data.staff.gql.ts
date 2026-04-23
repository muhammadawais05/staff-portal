import {
  gql,
  useGetNode,
  useGetStaffNode
} from '@staff-portal/data-layer-service'

import {
  GetClientDataByRoleIdDocument,
  GetClientDataByClientIdDocument,
  GetJobCreateOpportunityDocument
} from './get-job-create-data.staff.gql.types'

export default gql`
  query GetClientDataByClientId($clientId: ID!) {
    node(id: $clientId) {
      ...JobCreateClientFragment
    }
  }

  query GetClientDataByRoleId($roleId: ID!) {
    staffNode(id: $roleId) {
      ...JobCreateClientFragment
    }
  }

  query GetJobCreateOpportunity($opportunityId: ID!) {
    node(id: $opportunityId) {
      ...JobCreateOpportunityFragment
    }
  }

  fragment JobCreateClientFragment on Client {
    id
    jobContactsEnabled
    enterprise
    webResource {
      text
      url
    }
    billingDefaults {
      id
      billCycle
    }
    timeZone {
      name
      value
    }
  }

  fragment JobCreateOpportunityFragment on Opportunity {
    id
    jobType
    estimatedStartWorkDate
    estimatedEndWorkDate
    buyer {
      id
      fullName
    }
    webResource {
      text
      url
    }
  }
`

export const useGetJobCreateData = (
  roleId?: string,
  clientId?: string,
  opportunityId?: string
) => {
  if (!roleId && !clientId) {
    throw new Error('Either clientId or roleId should be specified.')
  }

  const { data: companyData, loading: companyLoading } = useGetStaffNode(
    GetClientDataByRoleIdDocument
  )({ roleId: roleId as string }, { skip: !roleId || !!clientId })

  const { data: clientData, loading: clientLoading } = useGetNode(
    GetClientDataByClientIdDocument
  )({ clientId: clientId as string }, { skip: !clientId })

  const { data: opportunityData, loading: opportunityLoading } = useGetNode(
    GetJobCreateOpportunityDocument
  )({ opportunityId: opportunityId as string }, { skip: !opportunityId })

  return {
    client: companyData || clientData,
    opportunity: opportunityData,
    loading: companyLoading || clientLoading || opportunityLoading
  }
}
