import { gql } from '@staff-portal/data-layer-service'

export const ENGAGEMENT_PITCH_SNIPPET_FRAGMENT = gql`
  fragment EngagementPitchSnippetFragment on Engagement {
    id

    talentHourlyRate

    talent {
      id
      allocatedHours
      allocatedHoursAvailability(upcoming: true)
      allocatedHoursConfirmedAt
      availableHours(upcoming: true)
      fullName
      hourlyRate
      locationV2 {
        country {
          id
          name
        }
        cityName
        stateName
      }
      resumeUrl
      type
      roleTitle
      webResource {
        url
      }
    }

    resumeUrl
  }
`
