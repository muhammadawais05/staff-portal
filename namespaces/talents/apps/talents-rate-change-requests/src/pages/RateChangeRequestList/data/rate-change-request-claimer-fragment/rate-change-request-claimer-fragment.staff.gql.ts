import { gql } from '@staff-portal/data-layer-service'

export const RATE_CHANGE_REQUEST_CLAIMER_FRAGMENT = gql`
  fragment RateChangeRequestClaimerFragment on Staff {
    id
    fullName
  }
`
