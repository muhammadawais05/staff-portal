import { gql } from '@apollo/client'

export default gql`
  query GetUsaStates {
    usaStates {
      code
      name
    }
  }
`
