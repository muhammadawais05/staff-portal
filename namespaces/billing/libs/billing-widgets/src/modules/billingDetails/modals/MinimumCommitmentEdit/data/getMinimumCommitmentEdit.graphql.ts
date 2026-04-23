import gql from 'graphql-tag'

export default gql`
  query GetMinimumCommitmentEdit($nodeId: ID!) {
    node(id: $nodeId) {
      ... on Client {
        id
        fullName
        commitmentSettings {
          minimumHours
        }
      }
    }
  }
`
