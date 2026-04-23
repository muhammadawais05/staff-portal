/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag'
disableFragmentWarnings()

import * as Types from '@staff-portal/graphql/staff'

import {
  PaymentSubjectNameFragment_Client_,
  PaymentSubjectNameFragment_CompanyRepresentative_,
  PaymentSubjectNameFragment_Leader_,
  PaymentSubjectNameFragment_ReferralPartner_,
  PaymentSubjectNameFragment_Staff_,
  PaymentSubjectNameFragment_Talent_,
  PaymentSubjectNameFragment_TalentPartner_
} from '../../../../../libs/billing-widgets/src/modules/__fragments__/paymentSubjectNameFragment.graphql.types'
import { gql } from '@apollo/client'
import { PaymentSubjectNameFragmentDoc } from '../../../../../libs/billing-widgets/src/modules/__fragments__/paymentSubjectNameFragment.graphql.types'
export type BillingCyclesPaymentSubjectNameFragment = {
  subjectObject:
    | PaymentSubjectNameFragment_Client_
    | PaymentSubjectNameFragment_CompanyRepresentative_
    | PaymentSubjectNameFragment_Leader_
    | PaymentSubjectNameFragment_ReferralPartner_
    | PaymentSubjectNameFragment_Staff_
    | PaymentSubjectNameFragment_Talent_
    | PaymentSubjectNameFragment_TalentPartner_
}

export const BillingCyclesPaymentSubjectNameFragmentDoc = gql`
  fragment BillingCyclesPaymentSubjectNameFragment on Payment {
    subjectObject {
      ...PaymentSubjectNameFragment
    }
  }
  ${PaymentSubjectNameFragmentDoc}
`
