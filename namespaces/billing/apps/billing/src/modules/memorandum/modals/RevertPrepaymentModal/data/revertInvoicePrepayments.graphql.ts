import { gql } from '@apollo/client'
import { invoiceListItemFragment } from '@staff-portal/billing-widgets/src/modules/__fragments__/invoiceListItemFragment.graphql'
import { memorandumItem } from '@staff-portal/billing-widgets/src/modules/__fragments__/memorandumFragment.graphql'

export default gql`
  mutation RevertInvoicePrepayments($input: RevertPrepaymentsInput!) {
    revertInvoicePrepayments(input: $input) {
      invoice {
        id
        memorandums {
          nodes {
            ... on Memorandum {
              ...MemorandumItem
            }
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

  ${memorandumItem}
  ${invoiceListItemFragment}
`
