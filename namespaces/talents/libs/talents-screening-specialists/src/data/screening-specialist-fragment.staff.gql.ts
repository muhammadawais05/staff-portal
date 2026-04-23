import { gql } from '@staff-portal/data-layer-service'

export const SCREENING_SPECIALIST_FRAGMENT = gql`
  fragment ScreeningSpecialistFragment on Staff {
    id
    fullName
    webResource {
      url
    }
  }
`
