import { gql } from '@apollo/client'

import { invoiceDeferredOperation } from '../../../__fragments__/invoiceDeferredOperation.graphql'
import { paymentDeferredOperation } from '../../../__fragments__/paymentDeferredOperation.graphql'
import { memorandumDeferredOperation } from '../../../__fragments__/memorandumDeferredOperation.graphql'
import { paymentGroupDeferredOperation } from '../../../__fragments__/paymentGroupDeferredOperation.graphql'

export default gql`
  query GetOperations($nodeId: ID!) {
    node(id: $nodeId) {
      ... on Invoice {
        ...InvoiceDeferredOperationFragment
      }
      ... on Payment {
          ...PaymentDeferredOperationFragment
      }
      ... on Memorandum {
          ...MemorandumDeferredOperationFragment
      }
      ... on PaymentGroup {
          ...PaymentGroupDeferredOperationFragment
      }
    }

    ${invoiceDeferredOperation}
    ${paymentDeferredOperation}
    ${memorandumDeferredOperation}
    ${paymentGroupDeferredOperation}
  }
`
