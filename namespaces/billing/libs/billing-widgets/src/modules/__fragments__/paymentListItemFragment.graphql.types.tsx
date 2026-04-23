/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag';
disableFragmentWarnings();

import * as Types from '@staff-portal/graphql/staff';

import { ReasonClientFragment, ReasonEngagementFragment, ReasonRoleStepFragment, ReasonTalentFragment, ReasonTalentPartnerFragment } from './reasonFragments.graphql.types';
import { WebResourceFragment } from '../../../../billing/src/__fragments__/webResourceFragment.graphql.types';
import { RoleType_CompanyRepresentative_Fragment, RoleType_Leader_Fragment, RoleType_ReferralPartner_Fragment, RoleType_Staff_Fragment, RoleType_Talent_Fragment, RoleType_TalentPartner_Fragment } from '../../../../billing/src/__fragments__/roleTypeFragment.graphql.types';
import { PaymentSubjectNameFragment_Client_, PaymentSubjectNameFragment_CompanyRepresentative_, PaymentSubjectNameFragment_Leader_, PaymentSubjectNameFragment_ReferralPartner_, PaymentSubjectNameFragment_Staff_, PaymentSubjectNameFragment_Talent_, PaymentSubjectNameFragment_TalentPartner_ } from './paymentSubjectNameFragment.graphql.types';
import { PaymentWebResourceFragment_Client_, PaymentWebResourceFragment_CompanyRepresentative_, PaymentWebResourceFragment_Leader_, PaymentWebResourceFragment_ReferralPartner_, PaymentWebResourceFragment_Staff_, PaymentWebResourceFragment_Talent_, PaymentWebResourceFragment_TalentPartner_ } from './paymentWebResourceFragment.graphql.types';
import { BillingOptionFragment_AchBillingOption_, BillingOptionFragment_CreditCardBillingOption_, BillingOptionFragment_OtherBillingOption_, BillingOptionFragment_PaypalBillingOption_, BillingOptionFragment_WireBillingOption_ } from './billingOptionFragment.graphql.types';
import { OperationItemFragment } from '../../../../billing/src/__fragments__/operationItemFragment.graphql.types';
import { gql } from '@apollo/client';
import { ReasonClientFragmentDoc, ReasonEngagementFragmentDoc, ReasonRoleStepFragmentDoc, ReasonTalentFragmentDoc, ReasonTalentPartnerFragmentDoc } from './reasonFragments.graphql.types';
import { WebResourceFragmentDoc } from '../../../../billing/src/__fragments__/webResourceFragment.graphql.types';
import { RoleTypeFragmentDoc } from '../../../../billing/src/__fragments__/roleTypeFragment.graphql.types';
import { PaymentSubjectNameFragmentDoc } from './paymentSubjectNameFragment.graphql.types';
import { PaymentWebResourceFragmentDoc } from './paymentWebResourceFragment.graphql.types';
import { BillingOptionFragmentDoc } from './billingOptionFragment.graphql.types';
import { OperationItemFragmentDoc } from '../../../../billing/src/__fragments__/operationItemFragment.graphql.types';
export type PaymentListItemFragment = { amount: string, amountWithCorrections: string, debitedAmount: string, createdOn: `${`${number}-${number}-${number}`}` | '', description?: Types.Maybe<string>, statusComment?: Types.Maybe<string>, documentNumber: number, downloadHtmlUrl?: Types.Maybe<string>, downloadPdfUrl?: Types.Maybe<string>, id: string, paymentKind: Types.PaymentKind, extraExpenses: boolean, dueDate?: Types.Maybe<`${`${number}-${number}-${number}`}` | ''>, creditedAmount: string, status: Types.DocumentStatus, paidAt?: Types.Maybe<`${`${number}-${number}-${number}T${number}:${number}:${number}${string}`}` | ''>, billingCycle?: Types.Maybe<{ startDate: `${`${number}-${number}-${number}`}` | '', endDate: `${`${number}-${number}-${number}`}` | '' }>, client?: Types.Maybe<ReasonClientFragment>, reason?: Types.Maybe<(
    { __typename: 'Client' }
    & ReasonClientFragment
  ) | (
    { __typename: 'Engagement' }
    & ReasonEngagementFragment
  ) | (
    { __typename: 'RoleStep' }
    & ReasonRoleStepFragment
  ) | (
    { __typename: 'Talent', roleType: string }
    & ReasonTalentFragment
  ) | (
    { __typename: 'TalentPartner', roleType: string }
    & ReasonTalentPartnerFragment
  )>, paymentGroup?: Types.Maybe<{ id: string, webResource: WebResourceFragment }>, webResource: WebResourceFragment, subjectObject: (
    { preferredBillingOption?: Types.Maybe<BillingOptionFragment_AchBillingOption_ | BillingOptionFragment_CreditCardBillingOption_ | BillingOptionFragment_OtherBillingOption_ | BillingOptionFragment_PaypalBillingOption_ | BillingOptionFragment_WireBillingOption_> }
    & PaymentSubjectNameFragment_Client_
    & PaymentWebResourceFragment_Client_
  ) | (
    RoleType_CompanyRepresentative_Fragment
    & PaymentSubjectNameFragment_CompanyRepresentative_
    & PaymentWebResourceFragment_CompanyRepresentative_
  ) | (
    RoleType_Leader_Fragment
    & PaymentSubjectNameFragment_Leader_
    & PaymentWebResourceFragment_Leader_
  ) | (
    RoleType_ReferralPartner_Fragment
    & PaymentSubjectNameFragment_ReferralPartner_
    & PaymentWebResourceFragment_ReferralPartner_
  ) | (
    RoleType_Staff_Fragment
    & PaymentSubjectNameFragment_Staff_
    & PaymentWebResourceFragment_Staff_
  ) | (
    { paymentsHoldDescription?: Types.Maybe<string>, operations: { createPaymentHold: OperationItemFragment } }
    & RoleType_Talent_Fragment
    & PaymentSubjectNameFragment_Talent_
    & PaymentWebResourceFragment_Talent_
  ) | (
    RoleType_TalentPartner_Fragment
    & PaymentSubjectNameFragment_TalentPartner_
    & PaymentWebResourceFragment_TalentPartner_
  ), operations: { payPayment: OperationItemFragment, removePaymentFromPaymentGroup: OperationItemFragment }, job?: Types.Maybe<{ id: string, webResource: WebResourceFragment }> };

export const PaymentListItemFragmentDoc = gql`
    fragment PaymentListItemFragment on Payment {
  amount
  amountWithCorrections
  debitedAmount
  billingCycle {
    startDate
    endDate
  }
  client {
    ...ReasonClient
  }
  createdOn
  description
  statusComment
  documentNumber
  downloadHtmlUrl
  downloadPdfUrl
  id
  paymentKind
  extraExpenses
  reason {
    __typename
    ... on Talent {
      ...ReasonTalent
      roleType: type
    }
    ... on TalentPartner {
      ...ReasonTalentPartner
      roleType: type
    }
    ... on RoleStep {
      ...ReasonRoleStep
    }
    ... on Client {
      ...ReasonClient
    }
    ... on Engagement {
      ...ReasonEngagement
    }
  }
  dueDate
  creditedAmount
  paymentGroup {
    id
    webResource {
      ...WebResourceFragment
    }
  }
  status
  paidAt
  webResource {
    ...WebResourceFragment
  }
  subjectObject {
    ...RoleType
    ...PaymentSubjectNameFragment
    ...PaymentWebResourceFragment
    ... on Client {
      preferredBillingOption {
        ...BillingOptionFragment
      }
    }
    ... on Talent {
      paymentsHoldDescription
      operations {
        createPaymentHold {
          ...OperationItem
        }
      }
    }
  }
  operations {
    payPayment {
      ...OperationItem
    }
    removePaymentFromPaymentGroup {
      ...OperationItem
    }
  }
  job {
    id
    webResource {
      ...WebResourceFragment
    }
  }
}
    ${ReasonClientFragmentDoc}
${ReasonTalentFragmentDoc}
${ReasonTalentPartnerFragmentDoc}
${ReasonRoleStepFragmentDoc}
${ReasonEngagementFragmentDoc}
${WebResourceFragmentDoc}
${RoleTypeFragmentDoc}
${PaymentSubjectNameFragmentDoc}
${PaymentWebResourceFragmentDoc}
${BillingOptionFragmentDoc}
${OperationItemFragmentDoc}`;