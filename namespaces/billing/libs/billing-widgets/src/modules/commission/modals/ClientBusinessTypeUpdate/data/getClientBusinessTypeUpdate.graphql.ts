import gql from 'graphql-tag'

export default gql`
  query GetClientBusinessTypeUpdate($nodeId: ID!) {
    node(id: $nodeId) {
      ... on Client {
        id
        businessType
      }
    }
  }
`
