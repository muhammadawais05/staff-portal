import { gql } from '@staff-portal/data-layer-service'
import { WEB_RESOURCE_FRAGMENT } from '@staff-portal/facilities'

export const SURVEY_ENGAGEMENT_FRAGMENT = gql`
  fragment SurveyEngagementFragment on Client {
    engagements(filter: { scope: ELIGIBLE_FOR_CLIENT_SURVEY_DISPLAY }) {
      totalCount
      nodes {
        id
        talent {
          ...WebResourceFragment
        }
        job {
          vertical {
            name
          }
          jobType
          ...WebResourceFragment
        }
        ...WebResourceFragment
      }
    }
  }
  ${WEB_RESOURCE_FRAGMENT}
`
