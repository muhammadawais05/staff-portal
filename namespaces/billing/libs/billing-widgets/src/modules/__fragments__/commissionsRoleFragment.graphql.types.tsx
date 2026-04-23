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
export type CommissionsRole_Client_Fragment = { id: string, fullName: string, webResource: WebResourceFragment };

export type CommissionsRole_CompanyRepresentative_Fragment = { id: string, fullName: string, webResource: WebResourceFragment };

export type CommissionsRole_Leader_Fragment = { id: string, fullName: string, webResource: WebResourceFragment };

export type CommissionsRole_ReferralPartner_Fragment = { id: string, fullName: string, webResource: WebResourceFragment };

export type CommissionsRole_Staff_Fragment = { id: string, fullName: string, webResource: WebResourceFragment };

export type CommissionsRole_Talent_Fragment = { id: string, fullName: string, webResource: WebResourceFragment };

export type CommissionsRole_TalentPartner_Fragment = { id: string, fullName: string, webResource: WebResourceFragment };

export type CommissionsRoleFragment = CommissionsRole_Client_Fragment | CommissionsRole_CompanyRepresentative_Fragment | CommissionsRole_Leader_Fragment | CommissionsRole_ReferralPartner_Fragment | CommissionsRole_Staff_Fragment | CommissionsRole_Talent_Fragment | CommissionsRole_TalentPartner_Fragment;

export const CommissionsRoleFragmentDoc = gql`
    fragment CommissionsRole on RoleOrClient {
  ... on Client {
    id
    fullName
    ... on WebResource {
      webResource {
        ...WebResourceFragment
      }
    }
  }
  ... on CompanyRepresentative {
    id
    fullName
    ... on WebResource {
      webResource {
        ...WebResourceFragment
      }
    }
  }
  ... on Leader {
    id
    fullName
    ... on WebResource {
      webResource {
        ...WebResourceFragment
      }
    }
  }
  ... on ReferralPartner {
    id
    fullName
    ... on WebResource {
      webResource {
        ...WebResourceFragment
      }
    }
  }
  ... on Staff {
    id
    fullName
    ... on WebResource {
      webResource {
        ...WebResourceFragment
      }
    }
  }
  ... on Talent {
    id
    fullName
    ... on WebResource {
      webResource {
        ...WebResourceFragment
      }
    }
  }
  ... on TalentPartner {
    id
    fullName
    ... on WebResource {
      webResource {
        ...WebResourceFragment
      }
    }
  }
}
    ${WebResourceFragmentDoc}`;