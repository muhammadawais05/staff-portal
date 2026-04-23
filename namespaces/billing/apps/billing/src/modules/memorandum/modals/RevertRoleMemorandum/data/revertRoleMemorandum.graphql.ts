import { gql } from '@apollo/client'
import { operationItemFragment } from '@staff-portal/billing/src/__fragments__/operationItemFragment.graphql'

export default gql`
  mutation RevertRoleMemorandum($input: RevertRoleMemorandumInput!) {
    revertRoleMemorandum(input: $input) {
      revertingMemorandum {
        id
        balance
        amount
        operations {
          revertRoleMemorandum {
            ...OperationItem
          }
        }
      }
      notice
      success
      errors {
        code
        key
        message
      }
    }
  }

  ${operationItemFragment}
`
