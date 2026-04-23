import { gql } from '@staff-portal/data-layer-service'

export const CLIENT_WILL_HIRE_AGAIN_FRAGMENT = gql`
  fragment ClientWillHireAgainFragment on Talent {
    id
    feedbackStatistics(filter: { roleTitle: CLIENT }) {
      nodes {
        answers {
          nodes {
            label
            score
          }
          totalCount
        }
      }
    }
  }
`
