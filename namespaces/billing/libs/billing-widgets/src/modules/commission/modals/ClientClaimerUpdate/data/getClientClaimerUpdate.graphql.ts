import gql from 'graphql-tag'

export default gql`
  query GetClientClaimerUpdate {
    roles(filter: { scope: COMPANY_CLAIMERS }) {
      ... on StaffConnection {
        nodes {
          id
          fullName
          type
        }
      }
    }
  }
`
