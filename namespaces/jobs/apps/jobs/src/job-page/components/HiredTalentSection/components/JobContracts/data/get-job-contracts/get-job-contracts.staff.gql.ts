import { gql } from '@staff-portal/data-layer-service'
import {
  ROLE_OR_CLIENT_FRAGMENT,
  WEB_RESOURCE_FRAGMENT
} from '@staff-portal/facilities'
import { CONTRACT_COMMON_FRAGMENT } from '@staff-portal/clients'

export const GET_JOB_CONTRACTS = gql`
  query GetJobContracts($jobId: ID!) {
    node(id: $jobId) {
      ... on Job {
        id
        webResource {
          text
          url
        }
        contracts(filter: { scope: ACTIVE_OR_EXPIRED }) {
          nodes {
            ...JobContractFragment
          }
        }
      }
    }
  }

  fragment JobContractFragment on Contract {
    id
    inheritedFrom {
      ...RoleOrClientFragment
    }
    sender {
      id
      fullName
    }
    subject {
      ... on Engagement {
        id
        talent {
          id
          type
          fullName
          ...WebResourceFragment
        }
      }
    }
    ...ContractCommonFragment
  }
  ${CONTRACT_COMMON_FRAGMENT}
  ${WEB_RESOURCE_FRAGMENT}
  ${ROLE_OR_CLIENT_FRAGMENT}
`
