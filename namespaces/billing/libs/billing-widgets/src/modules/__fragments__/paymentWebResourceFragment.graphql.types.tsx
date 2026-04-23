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
export type PaymentWebResourceFragment_Client_ = { id: string, webResource: WebResourceFragment };

export type PaymentWebResourceFragment_CompanyRepresentative_ = { id: string, webResource: WebResourceFragment };

export type PaymentWebResourceFragment_Leader_ = { id: string, webResource: WebResourceFragment };

export type PaymentWebResourceFragment_ReferralPartner_ = { id: string, webResource: WebResourceFragment };

export type PaymentWebResourceFragment_Staff_ = { id: string, webResource: WebResourceFragment };

export type PaymentWebResourceFragment_Talent_ = { id: string, webResource: WebResourceFragment };

export type PaymentWebResourceFragment_TalentPartner_ = { id: string, webResource: WebResourceFragment };

export type PaymentWebResourceFragment = PaymentWebResourceFragment_Client_ | PaymentWebResourceFragment_CompanyRepresentative_ | PaymentWebResourceFragment_Leader_ | PaymentWebResourceFragment_ReferralPartner_ | PaymentWebResourceFragment_Staff_ | PaymentWebResourceFragment_Talent_ | PaymentWebResourceFragment_TalentPartner_;

export const PaymentWebResourceFragmentDoc = gql`
    fragment PaymentWebResourceFragment on PaymentSubject {
  ... on Client {
    id
    webResource {
      ...WebResourceFragment
    }
  }
  ... on CompanyRepresentative {
    id
    webResource {
      ...WebResourceFragment
    }
  }
  ... on Leader {
    id
    webResource {
      ...WebResourceFragment
    }
  }
  ... on ReferralPartner {
    id
    webResource {
      ...WebResourceFragment
    }
  }
  ... on Staff {
    id
    webResource {
      ...WebResourceFragment
    }
  }
  ... on Talent {
    id
    webResource {
      ...WebResourceFragment
    }
  }
  ... on TalentPartner {
    id
    webResource {
      ...WebResourceFragment
    }
  }
}
    ${WebResourceFragmentDoc}`;