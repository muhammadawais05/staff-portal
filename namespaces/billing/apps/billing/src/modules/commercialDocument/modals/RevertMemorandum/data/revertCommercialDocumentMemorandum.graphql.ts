import { gql } from '@apollo/client'
import { operationItemFragment } from '@staff-portal/billing/src/__fragments__/operationItemFragment.graphql'

export default gql`
  mutation RevertCommercialDocumentMemorandum(
    $input: RevertCommercialDocumentMemorandumInput!
  ) {
    revertCommercialDocumentMemorandum(input: $input) {
      revertingMemorandum {
        id
        balance
        amount
        operations {
          revertCommercialDocumentMemorandum {
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
