import { gql } from '@staff-portal/data-layer-service'

export default gql`
  query GetQuiz($clientId: ID!) {
    node(id: $clientId) {
      ... on Client {
        id
        cumulativeStatus
        remoteQuizUrl
        quizItems {
          nodes {
            questionLabel
            readableValue
          }
        }
        referralPage {
          text
          url
        }
      }
    }
  }
`
