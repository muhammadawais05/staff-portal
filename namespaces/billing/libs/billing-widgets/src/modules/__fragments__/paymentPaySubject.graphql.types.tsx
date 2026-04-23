/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag';
disableFragmentWarnings();

import * as Types from '@staff-portal/graphql/staff';

import { WebResourceFragment } from '../../../../billing/src/__fragments__/webResourceFragment.graphql.types';
import { gql } from '@apollo/client';
import { WebResourceFragmentDoc } from '../../../../billing/src/__fragments__/webResourceFragment.graphql.types';
export type PaymentPaySubject_Client_Fragment = { billingNotes?: Types.Maybe<string>, id: string, paymentOptions?: Types.Maybe<PaymentOptionsConnectionFragment>, webResource: WebResourceFragment };

export type PaymentPaySubject_CompanyRepresentative_Fragment = { billingNotes?: Types.Maybe<string>, id: string, paymentOptions?: Types.Maybe<PaymentOptionsConnectionFragment>, webResource: WebResourceFragment };

export type PaymentPaySubject_Leader_Fragment = { billingNotes?: Types.Maybe<string>, id: string, paymentOptions?: Types.Maybe<PaymentOptionsConnectionFragment>, webResource: WebResourceFragment };

export type PaymentPaySubject_ReferralPartner_Fragment = { billingNotes?: Types.Maybe<string>, id: string, paymentOptions?: Types.Maybe<PaymentOptionsConnectionFragment>, webResource: WebResourceFragment };

export type PaymentPaySubject_Staff_Fragment = { billingNotes?: Types.Maybe<string>, id: string, paymentOptions?: Types.Maybe<PaymentOptionsConnectionFragment>, webResource: WebResourceFragment };

export type PaymentPaySubject_Talent_Fragment = { billingNotes?: Types.Maybe<string>, id: string, paymentOptions?: Types.Maybe<PaymentOptionsConnectionFragment>, webResource: WebResourceFragment };

export type PaymentPaySubject_TalentPartner_Fragment = { billingNotes?: Types.Maybe<string>, id: string, paymentOptions?: Types.Maybe<PaymentOptionsConnectionFragment>, webResource: WebResourceFragment };

export type PaymentPaySubjectFragment = PaymentPaySubject_Client_Fragment | PaymentPaySubject_CompanyRepresentative_Fragment | PaymentPaySubject_Leader_Fragment | PaymentPaySubject_ReferralPartner_Fragment | PaymentPaySubject_Staff_Fragment | PaymentPaySubject_Talent_Fragment | PaymentPaySubject_TalentPartner_Fragment;

export type PaymentOptionFragment = { paymentMethod: Types.PaymentOptionPaymentMethod, placeholder: boolean, preferred: boolean, accountInfo?: Types.Maybe<Array<{ label: string, value: string }>> };

export type PaymentOptionsConnectionFragment = { nodes: Array<PaymentOptionFragment> };

export const PaymentOptionFragmentDoc = gql`
    fragment PaymentOptionFragment on PaymentOption {
  accountInfo {
    label
    value
  }
  paymentMethod
  placeholder
  preferred
}
    `;
export const PaymentOptionsConnectionFragmentDoc = gql`
    fragment PaymentOptionsConnectionFragment on PaymentOptionsConnection {
  nodes {
    ...PaymentOptionFragment
  }
}
    ${PaymentOptionFragmentDoc}`;
export const PaymentPaySubjectFragmentDoc = gql`
    fragment PaymentPaySubject on PaymentSubject {
  ... on Client {
    billingNotes
    paymentOptions: paymentOptionsNullable {
      ...PaymentOptionsConnectionFragment
    }
    id
    webResource {
      ...WebResourceFragment
    }
  }
  ... on CompanyRepresentative {
    billingNotes
    paymentOptions: paymentOptionsNullable {
      ...PaymentOptionsConnectionFragment
    }
    id
    webResource {
      ...WebResourceFragment
    }
  }
  ... on Leader {
    billingNotes
    paymentOptions: paymentOptionsNullable {
      ...PaymentOptionsConnectionFragment
    }
    id
    webResource {
      ...WebResourceFragment
    }
  }
  ... on ReferralPartner {
    billingNotes
    paymentOptions: paymentOptionsNullable {
      ...PaymentOptionsConnectionFragment
    }
    id
    webResource {
      ...WebResourceFragment
    }
  }
  ... on Talent {
    billingNotes
    paymentOptions: paymentOptionsNullable {
      ...PaymentOptionsConnectionFragment
    }
    id
    webResource {
      ...WebResourceFragment
    }
  }
  ... on TalentPartner {
    billingNotes
    paymentOptions: paymentOptionsNullable {
      ...PaymentOptionsConnectionFragment
    }
    id
    webResource {
      ...WebResourceFragment
    }
  }
  ... on Staff {
    billingNotes
    paymentOptions: paymentOptionsNullable {
      ...PaymentOptionsConnectionFragment
    }
    id
    webResource {
      ...WebResourceFragment
    }
  }
}
    ${PaymentOptionsConnectionFragmentDoc}
${WebResourceFragmentDoc}`;