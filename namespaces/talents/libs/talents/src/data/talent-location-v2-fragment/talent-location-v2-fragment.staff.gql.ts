import { gql } from '@staff-portal/data-layer-service'

export const TALENT_LOCATION_V2_FRAGMENT = gql`
  fragment TalentLocationV2Fragment on Location {
    cityName
    countryName
    stateName
    placeId
  }
`
