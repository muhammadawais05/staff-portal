import { gql } from '@apollo/client'

export default gql`
  query GetJobTitleByEngagement($id: ID!) {
    node(id: $id) {
      ... on Engagement {
        __typename
        id
        job {
          __typename
          id
          title
        }
      }
    }
  }
`
