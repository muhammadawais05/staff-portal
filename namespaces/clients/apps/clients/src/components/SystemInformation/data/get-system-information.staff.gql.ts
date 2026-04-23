import { gql } from '@staff-portal/data-layer-service'

import { SYSTEM_INFORMATION_FRAGMENT } from './system-information-fragment.staff.gql'

export default gql`
  query GetSystemInformation($clientId: ID!) {
    node(id: $clientId) {
      ... on Client {
        ...SystemInformationFragment
      }
    }
  }

  ${SYSTEM_INFORMATION_FRAGMENT}
`
