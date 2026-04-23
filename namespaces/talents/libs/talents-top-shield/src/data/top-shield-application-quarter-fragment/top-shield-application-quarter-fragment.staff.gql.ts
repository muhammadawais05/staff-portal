import { gql } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'

export const TOP_SHIELD_APPLICATION_QUARTER_FRAGMENT = gql`
  fragment TopShieldApplicationQuarterFragment on TopShieldApplicationQuarter {
    id
    startDate
    endDate
    paymentEndDate
    operations {
      updateTopShieldApplicationQuarter {
        ...OperationFragment
      }
    }
  }

  ${OPERATION_FRAGMENT}
`
