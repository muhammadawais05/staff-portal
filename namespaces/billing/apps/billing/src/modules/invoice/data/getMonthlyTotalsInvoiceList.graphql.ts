import { gql } from '@apollo/client'
import { invoicesTotalsFragment } from '@staff-portal/billing-widgets/src/modules/__fragments__/invoicesTotalsFragment.graphql'

export default gql`
  query GetInvoicesMonthlyTotals(
    $pagination: OffsetPagination!
    $filter: InvoicesFilter!
  ) {
    invoices(pagination: $pagination, filter: $filter) {
      groups {
        month
        year
        totals {
          ...InvoicesTotalsFragment
        }
      }
    }
  }

  ${invoicesTotalsFragment}
`
