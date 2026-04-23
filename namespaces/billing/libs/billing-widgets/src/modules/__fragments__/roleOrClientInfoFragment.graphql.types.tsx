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
export type RoleOrClientInfo_Client_Fragment = { __typename: 'Client', id: string, fullName: string, webResource: WebResourceFragment };

export type RoleOrClientInfo_CompanyRepresentative_Fragment = { __typename: 'CompanyRepresentative', id: string, fullName: string, webResource: WebResourceFragment };

export type RoleOrClientInfo_Leader_Fragment = { __typename: 'Leader', id: string, fullName: string, webResource: WebResourceFragment };

export type RoleOrClientInfo_ReferralPartner_Fragment = { __typename: 'ReferralPartner', id: string, fullName: string, webResource: WebResourceFragment };

export type RoleOrClientInfo_Staff_Fragment = { __typename: 'Staff', id: string, fullName: string, webResource: WebResourceFragment };

export type RoleOrClientInfo_Talent_Fragment = { __typename: 'Talent', id: string, fullName: string, webResource: WebResourceFragment };

export type RoleOrClientInfo_TalentPartner_Fragment = { __typename: 'TalentPartner', id: string, fullName: string, webResource: WebResourceFragment };

export type RoleOrClientInfoFragment = RoleOrClientInfo_Client_Fragment | RoleOrClientInfo_CompanyRepresentative_Fragment | RoleOrClientInfo_Leader_Fragment | RoleOrClientInfo_ReferralPartner_Fragment | RoleOrClientInfo_Staff_Fragment | RoleOrClientInfo_Talent_Fragment | RoleOrClientInfo_TalentPartner_Fragment;

export const RoleOrClientInfoFragmentDoc = gql`
    fragment RoleOrClientInfo on RoleOrClient {
  __typename
  ... on Client {
    id
    fullName
    webResource {
      ...WebResourceFragment
    }
  }
  ... on CompanyRepresentative {
    id
    fullName
    webResource {
      ...WebResourceFragment
    }
  }
  ... on Leader {
    id
    fullName
    webResource {
      ...WebResourceFragment
    }
  }
  ... on ReferralPartner {
    id
    fullName
    webResource {
      ...WebResourceFragment
    }
  }
  ... on Staff {
    id
    fullName
    webResource {
      ...WebResourceFragment
    }
  }
  ... on Talent {
    id
    fullName
    webResource {
      ...WebResourceFragment
    }
  }
  ... on TalentPartner {
    id
    fullName
    webResource {
      ...WebResourceFragment
    }
  }
}
    ${WebResourceFragmentDoc}`;