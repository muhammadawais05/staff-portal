import { gql } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'

export const SPECIALIST_ASSIGNMENT_OPERATIONS_FRAGMENT = gql`
  fragment SpecialistAssignmentOperationsFragment on SpecialistAssignmentOperations {
    archiveSpecialistAssignment {
      ...OperationFragment
    }
    reactivateSpecialistAssignment {
      ...OperationFragment
    }
  }

  ${OPERATION_FRAGMENT}
`
