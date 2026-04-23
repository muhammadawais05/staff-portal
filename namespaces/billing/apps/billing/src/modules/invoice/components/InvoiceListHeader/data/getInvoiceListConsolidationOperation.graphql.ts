import { gql } from '@apollo/client'

export default gql`
  query GetInvoiceListConsolidationOperation(
    $pagination: OffsetPagination!
    $filter: InvoicesFilter!
  ) {
    invoices(pagination: $pagination, filter: $filter) {
      operations {
        consolidateInvoices {
          ...OperationItem
        }
      }
    }
  }
`
