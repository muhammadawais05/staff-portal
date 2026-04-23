import { gql } from '@staff-portal/data-layer-service'

export const COMMUNITY_EVENT_FRAGMENT = gql`
  fragment CommunityEventFragment on CommunityEvent {
    id
    description
    endDate
    location {
      cityName
      countryName
      stateName
    }
    name
    shortName
    startDate
    typeformUrl
    webResource {
      url
      text
    }
  }
`
