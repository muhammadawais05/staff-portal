import { gql } from '@apollo/client'

import { noteCommonFragment } from '../../__fragments__/noteCommonFragment.graphql'

export default gql`
  query GetClientBillingInformationNotes($clientId: ID!) {
    node(id: $clientId) {
      ... on Client {
        id
        cumulativeStatus
        fullName
        operations {
          logClientBillingInformation {
            ...OperationItem
          }
        }
        billingInformationNotes {
          nodes {
            ...NoteCommon
            __typename
            status
            attachment {
              url
              webResource {
                text
                url
              }
            }
            answers {
              nodes {
                id
                comment
                label
                value
                displayText
                questionEdge {
                  node {
                    id
                    label
                    group {
                      label
                    }
                  }
                }
              }
            }
            softSkillRatings {
              nodes {
                id
                comment
                value
                softSkill {
                  id
                  name
                }
              }
            }
          }
        }
      }
    }
  }

  ${noteCommonFragment}
`
