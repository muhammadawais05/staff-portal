import { gql } from '@staff-portal/data-layer-service'
import { WEB_RESOURCE_FRAGMENT } from '@staff-portal/facilities'

export const RELATED_JOB_APPLICATION_FRAGMENT = gql`
  fragment RelatedJobApplicationFragment on JobApplication {
    id
    applicationComment
    createdAt
    talent {
      id
      ...WebResourceFragment
    }
    performer {
      __typename
      ... on Node {
        id
      }
      ... on WebResource {
        ...WebResourceFragment
      }
    }
  }
  ${WEB_RESOURCE_FRAGMENT}
`
