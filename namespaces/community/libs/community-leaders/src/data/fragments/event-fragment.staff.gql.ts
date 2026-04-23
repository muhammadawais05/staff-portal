import { gql } from '@staff-portal/data-layer-service'

export const EVENT_FRAGMENT = gql`
  fragment Event on CommunityEvent {
    id
    name
    description
    location {
      cityName
      country {
        name
      }
    }
    shortName
    startDate
    endDate
    typeformUrl
    webResource {
      url
      text
    }
  }
`
