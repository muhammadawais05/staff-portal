import { gql } from '@apollo/client'

export default gql`
  query GetClientDefaultNoteAnswers($clientId: ID!) {
    node(id: $clientId) {
      ... on Client {
        id
        defaultNoteAnswers(filter: { noteType: BILLING_INFORMATION }) {
          nodes {
            id
            comment
            displayText
            label
            value
            option {
              id
            }
            questionEdge {
              renderedLabel
              node {
                kind
                hint
                commentType
                additionalCommentsHint
                required
                activeOptions {
                  nodes {
                    id
                    label
                    value
                  }
                }
                id
                label
                group {
                  label
                }
              }
            }
          }
        }
      }
    }
  }
`
