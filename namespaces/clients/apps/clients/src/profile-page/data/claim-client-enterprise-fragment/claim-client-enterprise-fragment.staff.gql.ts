import { gql } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'

export const ClAIM_CLIENT_ENTERPRISE_FRAGMENT = gql`
  fragment ClaimClientEnterpriseFragment on Client {
    operations {
      claimClientEnterprise {
        ...OperationFragment
      }
    }
  }
  ${OPERATION_FRAGMENT}
`
