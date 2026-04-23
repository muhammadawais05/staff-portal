import { gql } from '@apollo/client'

export default gql`
  query GetInvoiceListReconciliationOperation(
    $filter: InvoicesFilter!
    $pagination: OffsetPagination!
  ) {
    invoicesNullable(filter: $filter, pagination: $pagination) {
      operations {
        reconcileInvoices {
          callable
          messages
        }
      }
    }
  }
`
