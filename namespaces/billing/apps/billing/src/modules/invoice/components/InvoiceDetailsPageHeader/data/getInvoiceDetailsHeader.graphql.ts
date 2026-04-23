import { gql } from '@apollo/client'
import { webResourceFragment } from '@staff-portal/billing/src/__fragments__/webResourceFragment.graphql'
import { invoiceOperationsFragment } from '@staff-portal/billing/src/__fragments__/invoiceOperationsFragment.graphql'

export default gql`
  query GetInvoiceDetailsHeader($invoiceId: ID!) {
    node(id: $invoiceId) {
      ... on Invoice {
        cleanAmountToPay
        consolidatedInvoice {
          id
        }
        downloadHtmlUrl
        downloadPdfUrl
        documentNumber
        id
        historyLink {
          url
        }
        gid
        ...InvoiceOperationsFragment
        status
        webResource {
          ...WebResourceFragment
        }
      }
    }
  }

  ${invoiceOperationsFragment}
  ${webResourceFragment}
`
