import { gql } from '@apollo/client'

export default gql`
  query GetInvoicesListHeader(
    $pagination: OffsetPagination!
    $filter: InvoicesFilter!
  ) {
    invoices(pagination: $pagination, filter: $filter) {
      downloadXlsxUrl
      totalCount
    }
  }
`
