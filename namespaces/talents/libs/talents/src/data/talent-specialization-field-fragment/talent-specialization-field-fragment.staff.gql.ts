import { gql } from '@staff-portal/data-layer-service'

export const TALENT_SPECIALIZATION_FIELD_FRAGMENT = gql`
  fragment TalentSpecializationFieldFragment on SpecializationApplication {
    id
    status
    specialization {
      id
      title
    }
  }
`
