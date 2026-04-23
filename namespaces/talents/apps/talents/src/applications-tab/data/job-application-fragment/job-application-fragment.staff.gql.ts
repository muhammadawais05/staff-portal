import { gql } from '@staff-portal/data-layer-service'

export const JOB_APPLICATION_FRAGMENT = gql`
  fragment jobApplicationFragment on JobApplication {
    id
    createdAt
    status
    webResource {
      text
      url
    }
    job {
      id
      client {
        id
        webResource {
          text
          url
        }
      }
    }
  }
`
