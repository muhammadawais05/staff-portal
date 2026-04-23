import { gql } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'

export const MARK_CLIENT_AS_BAD_LEAD_FRAGMENT = gql`
  fragment MarkClientAsBadLeadFragment on Client {
    status
    cumulativeStatus
    operations {
      markClientAsBadLead {
        ...OperationFragment
      }
    }
  }
  ${OPERATION_FRAGMENT}
`
