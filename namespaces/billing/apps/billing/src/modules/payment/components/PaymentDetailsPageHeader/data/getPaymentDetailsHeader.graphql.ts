import { gql } from '@apollo/client'
import { paymentOperationsFragment } from '@staff-portal/billing/src/__fragments__/paymentOperationsFragment.graphql'
import { webResourceFragment } from '@staff-portal/billing/src/__fragments__/webResourceFragment.graphql'

export default gql`
  query GetPaymentDetailsHeader($paymentId: ID!) {
    node(id: $paymentId) {
      ... on Payment {
        documentNumber
        downloadHtmlUrl
        downloadPdfUrl
        id
        gid
        ...PaymentOperationsFragment
        paymentGroup {
          id
          number
          webResource {
            ...WebResourceFragment
          }
        }
        historyLink {
          url
        }
        status
        webResource {
          ...WebResourceFragment
        }
      }
    }
  }

  ${paymentOperationsFragment}
  ${webResourceFragment}
`
