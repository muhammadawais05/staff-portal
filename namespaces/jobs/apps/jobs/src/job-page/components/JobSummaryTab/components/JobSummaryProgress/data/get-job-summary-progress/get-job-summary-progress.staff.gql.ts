import { gql } from '@staff-portal/data-layer-service'

export const GET_JOB_SUMMARY_PROGRESS = gql`
  query GetJobSummaryProgress($jobId: ID!) {
    node(id: $jobId) {
      ... on Job {
        id
        createdThrough
        summaryProgress {
          total
          completeFields
          emptyFields
          percentage
        }
        createdBy {
          ... on Node {
            id
          }
          ... on WebResource {
            webResource {
              text
              url
            }
          }
        }
      }
    }
  }
`
