import { gql } from '@staff-portal/data-layer-service'

export const COUNTRY_FRAGMENT = gql`
  fragment CountryFragment on Country {
    id
    name
    code

    defaultTimeZone {
      name
      value
    }
  }
`
