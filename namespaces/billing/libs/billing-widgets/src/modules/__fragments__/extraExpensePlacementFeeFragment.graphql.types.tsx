/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag';
disableFragmentWarnings();

import * as Types from '@staff-portal/graphql/staff';

import { WebResourceFragment } from '../../../../billing/src/__fragments__/webResourceFragment.graphql.types';
import { PaymentSubjectNameFragment_Client_, PaymentSubjectNameFragment_CompanyRepresentative_, PaymentSubjectNameFragment_Leader_, PaymentSubjectNameFragment_ReferralPartner_, PaymentSubjectNameFragment_Staff_, PaymentSubjectNameFragment_Talent_, PaymentSubjectNameFragment_TalentPartner_ } from './paymentSubjectNameFragment.graphql.types';
import { gql } from '@apollo/client';
import { WebResourceFragmentDoc } from '../../../../billing/src/__fragments__/webResourceFragment.graphql.types';
import { PaymentSubjectNameFragmentDoc } from './paymentSubjectNameFragment.graphql.types';
export type ExtraExpensePlacementFeeItemInvoiceFragment = { amount: string, creditedAmount: string, debitedAmount: string, description?: Types.Maybe<string>, documentNumber: number, dueDate?: Types.Maybe<`${`${number}-${number}-${number}`}` | ''>, id: string, billingCycleGid?: Types.Maybe<string>, gid: string, paidAmount: string, status: Types.DocumentStatus, url?: Types.Maybe<string>, subjectObject: { id: string, fullName: string }, webResource: WebResourceFragment };

export type ExtraExpensePlacementFeeItemCommissionFragment_Invoice_ = ExtraExpensePlacementFeeItemInvoiceFragment;

export type ExtraExpensePlacementFeeItemCommissionFragment_Payment_ = ExtraExpensePlacementFeeItemPaymentFragment;

export type ExtraExpensePlacementFeeItemCommissionFragment = ExtraExpensePlacementFeeItemCommissionFragment_Invoice_ | ExtraExpensePlacementFeeItemCommissionFragment_Payment_;

export type ExtraExpensePlacementFeeItemPaymentFragment = { amount: string, creditedAmount: string, debitedAmount: string, description?: Types.Maybe<string>, documentNumber: number, dueDate?: Types.Maybe<`${`${number}-${number}-${number}`}` | ''>, id: string, billingCycleGid?: Types.Maybe<string>, gid: string, paidAmount: string, status: Types.DocumentStatus, url?: Types.Maybe<string>, subjectObject: (
    { id: string }
    & PaymentSubjectNameFragment_Client_
  ) | (
    { id: string }
    & PaymentSubjectNameFragment_CompanyRepresentative_
  ) | (
    { id: string }
    & PaymentSubjectNameFragment_Leader_
  ) | (
    { id: string }
    & PaymentSubjectNameFragment_ReferralPartner_
  ) | (
    { id: string }
    & PaymentSubjectNameFragment_Staff_
  ) | (
    { id: string }
    & PaymentSubjectNameFragment_Talent_
  ) | (
    { id: string }
    & PaymentSubjectNameFragment_TalentPartner_
  ), webResource: WebResourceFragment };

export const ExtraExpensePlacementFeeItemInvoiceFragmentDoc = gql`
    fragment ExtraExpensePlacementFeeItemInvoiceFragment on Invoice {
  ... on Invoice {
    amount
    creditedAmount
    debitedAmount
    description
    documentNumber
    dueDate
    id
    billingCycleGid
    gid
    paidAmount
    status
    url
    subjectObject {
      id
      fullName
    }
    ... on WebResource {
      webResource {
        ...WebResourceFragment
      }
    }
  }
}
    ${WebResourceFragmentDoc}`;
export const ExtraExpensePlacementFeeItemPaymentFragmentDoc = gql`
    fragment ExtraExpensePlacementFeeItemPaymentFragment on Payment {
  ... on Payment {
    amount
    creditedAmount
    debitedAmount
    description
    documentNumber
    dueDate
    id
    billingCycleGid
    gid
    paidAmount
    status
    url
    subjectObject {
      ... on Role {
        id
      }
      ... on Client {
        id
      }
      ... on CompanyRepresentative {
        id
      }
      ... on Leader {
        id
      }
      ...PaymentSubjectNameFragment
    }
    ... on WebResource {
      webResource {
        ...WebResourceFragment
      }
    }
  }
}
    ${PaymentSubjectNameFragmentDoc}
${WebResourceFragmentDoc}`;
export const ExtraExpensePlacementFeeItemCommissionFragmentDoc = gql`
    fragment ExtraExpensePlacementFeeItemCommissionFragment on CommercialDocument {
  ... on Invoice {
    ...ExtraExpensePlacementFeeItemInvoiceFragment
  }
  ... on Payment {
    ...ExtraExpensePlacementFeeItemPaymentFragment
  }
}
    ${ExtraExpensePlacementFeeItemInvoiceFragmentDoc}
${ExtraExpensePlacementFeeItemPaymentFragmentDoc}`;