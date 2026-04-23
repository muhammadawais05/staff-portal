import { gql } from '@staff-portal/data-layer-service'

export const SPECIALIST_ASSIGNMENT_ARCHIVING_FRAGMENT = gql`
  fragment SpecialistAssignmentArchivingFragment on SpecialistAssignmentArchiving {
    reason
    comment
    createdAt
  }
`
