import { gql } from '@apollo/client'

import transferItem from '../../__fragments__/transferFragment.graphql'

export default gql`
  query GetTransfer($transferNodeId: ID!) {
    node(id: $transferNodeId) {
      ... on Transfer {
        ...TransferFragment
      }
    }
  }

  ${transferItem}
`
