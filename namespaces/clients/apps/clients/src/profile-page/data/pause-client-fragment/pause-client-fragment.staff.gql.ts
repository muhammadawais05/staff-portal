import { gql } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'

export const PAUSE_CLIENT_FRAGMENT = gql`
  fragment PauseClientFragment on Client {
    operations {
      pauseClient {
        ...OperationFragment
      }
    }
  }
  ${OPERATION_FRAGMENT}
`
