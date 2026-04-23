import { gql } from '@staff-portal/data-layer-service'

export const CLAIMER_FRAGMENT = gql`
  fragment ClaimerFragment on Role {
    id
    fullName
  }
`
