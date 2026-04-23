import { gql } from '@staff-portal/data-layer-service'

export default gql`
  query GetJobSourcingRequestLocationDetails($jobId: ID!) {
    node(id: $jobId) {
      ... on Job {
        id
        workType
        sourcingRequest {
          id
          onSiteLocation
          onSiteDuration
          whoCoversTravelCosts
          whoCoversTravelCostsComment
          timeZonePreference {
            name
            value
          }
          hoursOverlap
          timeZonePreferenceComment
          citizenshipRequirements
          citizenshipRequirementsComment
        }
      }
    }
  }
`
