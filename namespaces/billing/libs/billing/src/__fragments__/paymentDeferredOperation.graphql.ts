import { gql } from '@apollo/client'

import { paymentOperationsFragment } from './paymentOperationsFragment.graphql'
import { webResourceFragment } from './webResourceFragment.graphql'

export const paymentDeferredOperation = gql`
  fragment PaymentDeferredOperationFragment on Payment {
    id
    downloadHtmlUrl
    downloadPdfUrl
    documentNumber
    ...PaymentOperationsFragment
    webResource {
      ...WebResourceFragment
    }
  }

  ${paymentOperationsFragment}
  ${webResourceFragment}
`
