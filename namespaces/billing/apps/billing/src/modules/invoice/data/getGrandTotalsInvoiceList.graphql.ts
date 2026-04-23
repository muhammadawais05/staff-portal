import { gql } from '@apollo/client'
import { invoicesTotalsFragment } from '@staff-portal/billing-widgets/src/modules/__fragments__/invoicesTotalsFragment.graphql'

export default gql`
  query GetInvoicesGrandTotals(
    $pagination: OffsetPagination!
    $filter: InvoicesFilter!
  ) {
    invoices(pagination: $pagination, filter: $filter) {
      totalCount
      totals {
        ...InvoicesTotalsFragment
      }
    }
  }

  ${invoicesTotalsFragment}
`
