import { gql } from '@apollo/client'

import { invoiceOperationsFragment } from './invoiceOperationsFragment.graphql'
import { webResourceFragment } from './webResourceFragment.graphql'

export const invoiceDeferredOperation = gql`
  fragment InvoiceDeferredOperationFragment on Invoice {
    id
    downloadHtmlUrl
    downloadPdfUrl
    documentNumber
    ...InvoiceOperationsFragment
    webResource {
      ...WebResourceFragment
    }
  }

  ${invoiceOperationsFragment}
  ${webResourceFragment}
`
