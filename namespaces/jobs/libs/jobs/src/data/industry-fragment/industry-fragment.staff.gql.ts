import { gql } from '@staff-portal/data-layer-service'

export const INDUSTRY_FRAGMENT = gql`
  fragment IndustryFragment on Industry {
    id
    name
  }
`
