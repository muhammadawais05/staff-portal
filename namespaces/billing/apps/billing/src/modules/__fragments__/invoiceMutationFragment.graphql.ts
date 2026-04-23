import { gql } from '@apollo/client'
import { invoiceOperationsFragment } from '@staff-portal/billing/src/__fragments__/invoiceOperationsFragment.graphql'

export const invoiceMutationFragment = gql`
  fragment InvoiceMutationFragment on Invoice {
    actionDueOn
    cleanOutstandingAmount
    dueDate
    issueDate
    duePeriod
    id
    invoiceKind
    paidAt
    processingDate
    status
    ...InvoiceOperationsFragment
  }

  ${invoiceOperationsFragment}
`
