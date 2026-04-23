import { gql } from '@staff-portal/data-layer-service'

export const TASK_INVOICE_SUBJECT_FRAGMENT = gql`
  fragment TaskInvoiceSubject on Invoice {
    id
    __typename
    consolidatedInvoice {
      id
    }
  }
`
