import { gql } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'
import { WEB_RESOURCE_FRAGMENT } from '@staff-portal/facilities'
import { CONTRACT_COMMON_FRAGMENT } from '@staff-portal/clients'

export const CONTRACT_FRAGMENT = gql`
  fragment ContractFragment on Contract {
    id
    guid
    resentAt
    resentCount
    receiver {
      ... on Client {
        id
        fullName
      }
    }
    sender {
      ... on Staff {
        id
        fullName
      }
    }
    subject {
      ... on Engagement {
        id
        talent {
          id
          ...WebResourceFragment
        }
        job {
          id
          ...WebResourceFragment
        }
      }
    }
    ...ContractCommonFragment
  }
  ${CONTRACT_COMMON_FRAGMENT}
  ${OPERATION_FRAGMENT}
  ${WEB_RESOURCE_FRAGMENT}
`
