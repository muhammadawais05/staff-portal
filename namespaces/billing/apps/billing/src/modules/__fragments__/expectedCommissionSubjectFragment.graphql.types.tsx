/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag'
disableFragmentWarnings()

import * as Types from '@staff-portal/graphql/staff'

import { gql } from '@apollo/client'
export type ExpectedCommissionSubjectFragment_Client_ = {
  webResource: { text: string; url?: Types.Maybe<string> }
}

export type ExpectedCommissionSubjectFragment_CompanyRepresentative_ = {
  webResource: { text: string; url?: Types.Maybe<string> }
}

export type ExpectedCommissionSubjectFragment_Leader_ = {
  webResource: { text: string; url?: Types.Maybe<string> }
}

export type ExpectedCommissionSubjectFragment_ReferralPartner_ = {
  webResource: { text: string; url?: Types.Maybe<string> }
}

export type ExpectedCommissionSubjectFragment_Staff_ = {
  webResource: { text: string; url?: Types.Maybe<string> }
}

export type ExpectedCommissionSubjectFragment_Talent_ = {
  webResource: { text: string; url?: Types.Maybe<string> }
}

export type ExpectedCommissionSubjectFragment_TalentPartner_ = {
  webResource: { text: string; url?: Types.Maybe<string> }
}

export type ExpectedCommissionSubjectFragment =
  | ExpectedCommissionSubjectFragment_Client_
  | ExpectedCommissionSubjectFragment_CompanyRepresentative_
  | ExpectedCommissionSubjectFragment_Leader_
  | ExpectedCommissionSubjectFragment_ReferralPartner_
  | ExpectedCommissionSubjectFragment_Staff_
  | ExpectedCommissionSubjectFragment_Talent_
  | ExpectedCommissionSubjectFragment_TalentPartner_

export const ExpectedCommissionSubjectFragmentDoc = gql`
  fragment ExpectedCommissionSubjectFragment on RoleOrClient {
    ... on Client {
      webResource {
        text
        url
      }
    }
    ... on CompanyRepresentative {
      webResource {
        text
        url
      }
    }
    ... on Leader {
      webResource {
        text
        url
      }
    }
    ... on ReferralPartner {
      webResource {
        text
        url
      }
    }
    ... on Staff {
      webResource {
        text
        url
      }
    }
    ... on Talent {
      webResource {
        text
        url
      }
    }
    ... on TalentPartner {
      webResource {
        text
        url
      }
    }
  }
`
