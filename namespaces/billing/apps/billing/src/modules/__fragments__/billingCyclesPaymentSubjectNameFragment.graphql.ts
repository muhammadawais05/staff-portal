import { gql } from '@apollo/client'

export const billingCyclesPaymentSubjectName = gql`
  fragment BillingCyclesPaymentSubjectNameFragment on Payment {
    subjectObject {
      ...PaymentSubjectNameFragment
    }
  }
`
