import { gql } from '@apollo/client'

export default gql`
  query GetCountries {
    countries {
      nodes {
        id
        name
      }
    }
  }
`
