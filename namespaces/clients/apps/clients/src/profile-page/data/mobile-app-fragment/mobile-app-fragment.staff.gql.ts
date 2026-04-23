import { gql } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'

export const MOBILE_APP_FRAGMENT = gql`
  fragment MobileAppFragment on Client {
    operations {
      enableMobileAppForClient {
        ...OperationFragment
      }
      disableMobileAppForClient {
        ...OperationFragment
      }
    }
  }
  ${OPERATION_FRAGMENT}
`
