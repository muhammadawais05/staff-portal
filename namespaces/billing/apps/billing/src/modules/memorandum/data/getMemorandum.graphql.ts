import { gql } from '@apollo/client'
import { memorandumItem } from '@staff-portal/billing-widgets/src/modules/__fragments__/memorandumFragment.graphql'

export default gql`
  query GetMemorandum($memorandumId: ID!) {
    node(id: $memorandumId) {
      ... on Memorandum {
        ...MemorandumItem
      }
    }
  }

  ${memorandumItem}
`
