import { gql } from '@apollo/client'
import { invoiceListItemFragment } from '@staff-portal/billing-widgets/src/modules/__fragments__/invoiceListItemFragment.graphql'

export default gql`
  query GetInvoicesList(
    $pagination: OffsetPagination!
    $filter: InvoicesFilter!
  ) {
    # Temporary rename
    # https://github.com/toptal/platform/pull/45426/files
    invoices: invoicesNullable(pagination: $pagination, filter: $filter) {
      totalCount
      groups {
        month
        year
        invoices {
          ...InvoiceListItemFragment
        }
      }
    }
  }

  ${invoiceListItemFragment}
`
