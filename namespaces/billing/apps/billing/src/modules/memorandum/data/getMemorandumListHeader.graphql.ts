import { gql } from '@apollo/client'
import { operationItemFragment } from '@staff-portal/billing/src/__fragments__/operationItemFragment.graphql'

export default gql`
  query GetMemorandumListHeader {
    operations {
      addRoleMemorandum {
        ...OperationItem
      }
    }
  }

  ${operationItemFragment}
`
