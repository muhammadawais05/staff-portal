import { gql } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'

export const SPECIALIZATION_APPLICATION_FRAGMENT = gql`
  fragment SpecializationApplicationFragment on SpecializationApplication {
    id
    status
    startedAt
    rejectionReason {
      id
      comment
      place
      reason
      operations {
        id
        updateSpecializationApplicationRejectionReason {
          ...OperationFragment
        }
      }
    }
  }
  ${OPERATION_FRAGMENT}
`
