import { gql } from '@staff-portal/data-layer-service'

export default gql`
  query GetClientInterviewRating($interviewId: ID!) {
    node(id: $interviewId) {
      ... on Interview {
        id
        status
        rating
        ratingComment
      }
    }
  }
`
