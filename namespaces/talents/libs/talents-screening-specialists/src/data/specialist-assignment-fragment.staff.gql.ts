import { gql } from '@staff-portal/data-layer-service'

import { SPECIALIST_ASSIGNMENT_ARCHIVING_FRAGMENT } from './specialist-assignment-archiving-fragment.staff.gql'
import { SCREENING_SPECIALIST_FRAGMENT } from './screening-specialist-fragment.staff.gql'
import { SPECIALIST_ASSIGNMENT_OPERATIONS_FRAGMENT } from './specialist-assignment-operations-fragment.staff.gql'

export const SPECIALIST_ASSIGNMENT_FRAGMENT = gql`
  fragment SpecialistAssignmentFragment on SpecialistAssignment {
    id
    status
    archiving {
      ...SpecialistAssignmentArchivingFragment
    }
    assignee {
      ...ScreeningSpecialistFragment
    }
    operations {
      ...SpecialistAssignmentOperationsFragment
    }
  }

  ${SPECIALIST_ASSIGNMENT_ARCHIVING_FRAGMENT}
  ${SCREENING_SPECIALIST_FRAGMENT}
  ${SPECIALIST_ASSIGNMENT_OPERATIONS_FRAGMENT}
`
