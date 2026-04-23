/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag';
disableFragmentWarnings();

import * as Types from '@staff-portal/graphql/staff';

import { WebResourceFragment } from '../../../../billing/src/__fragments__/webResourceFragment.graphql.types';
import { RoleType_CompanyRepresentative_Fragment, RoleType_Leader_Fragment, RoleType_ReferralPartner_Fragment, RoleType_Staff_Fragment, RoleType_Talent_Fragment, RoleType_TalentPartner_Fragment } from '../../../../billing/src/__fragments__/roleTypeFragment.graphql.types';
import { RoleOrClientInfo_Client_Fragment, RoleOrClientInfo_CompanyRepresentative_Fragment, RoleOrClientInfo_Leader_Fragment, RoleOrClientInfo_ReferralPartner_Fragment, RoleOrClientInfo_Staff_Fragment, RoleOrClientInfo_Talent_Fragment, RoleOrClientInfo_TalentPartner_Fragment } from './roleOrClientInfoFragment.graphql.types';
import { gql } from '@apollo/client';
import { WebResourceFragmentDoc } from '../../../../billing/src/__fragments__/webResourceFragment.graphql.types';
import { RoleTypeFragmentDoc } from '../../../../billing/src/__fragments__/roleTypeFragment.graphql.types';
import { RoleOrClientInfoFragmentDoc } from './roleOrClientInfoFragment.graphql.types';
export type ReasonTalentFragment = { id: string, fullName: string, webResource: WebResourceFragment, referrer?: Types.Maybe<RoleOrClientInfo_Client_Fragment | (
    RoleType_CompanyRepresentative_Fragment
    & RoleOrClientInfo_CompanyRepresentative_Fragment
  ) | (
    RoleType_Leader_Fragment
    & RoleOrClientInfo_Leader_Fragment
  ) | (
    RoleType_ReferralPartner_Fragment
    & RoleOrClientInfo_ReferralPartner_Fragment
  ) | (
    RoleType_Staff_Fragment
    & RoleOrClientInfo_Staff_Fragment
  ) | (
    RoleType_Talent_Fragment
    & RoleOrClientInfo_Talent_Fragment
  ) | (
    RoleType_TalentPartner_Fragment
    & RoleOrClientInfo_TalentPartner_Fragment
  )> };

export type ReasonTalentPartnerFragment = { id: string, fullName: string, webResource: WebResourceFragment, referrer?: Types.Maybe<RoleOrClientInfo_Client_Fragment | (
    RoleType_CompanyRepresentative_Fragment
    & RoleOrClientInfo_CompanyRepresentative_Fragment
  ) | (
    RoleType_Leader_Fragment
    & RoleOrClientInfo_Leader_Fragment
  ) | (
    RoleType_ReferralPartner_Fragment
    & RoleOrClientInfo_ReferralPartner_Fragment
  ) | (
    RoleType_Staff_Fragment
    & RoleOrClientInfo_Staff_Fragment
  ) | (
    RoleType_Talent_Fragment
    & RoleOrClientInfo_Talent_Fragment
  ) | (
    RoleType_TalentPartner_Fragment
    & RoleOrClientInfo_TalentPartner_Fragment
  )> };

export type ReasonRoleStepFragment = { id: string, step: { title: string, short: string }, roleStepTalent: { id: string, fullName: string, webResource: WebResourceFragment } };

export type ReasonClientFragment = { id: string, fullName: string, webResource: WebResourceFragment };

export type ReasonEngagementFragment = { id: string, talent?: Types.Maybe<{ id: string, fullName: string, webResource: WebResourceFragment }>, webResource: WebResourceFragment };

export const ReasonTalentFragmentDoc = gql`
    fragment ReasonTalent on Talent {
  id
  fullName
  webResource {
    ...WebResourceFragment
  }
  referrer {
    ...RoleType
    ...RoleOrClientInfo
  }
}
    ${WebResourceFragmentDoc}
${RoleTypeFragmentDoc}
${RoleOrClientInfoFragmentDoc}`;
export const ReasonTalentPartnerFragmentDoc = gql`
    fragment ReasonTalentPartner on TalentPartner {
  id
  fullName
  webResource {
    ...WebResourceFragment
  }
  referrer {
    ...RoleType
    ...RoleOrClientInfo
  }
}
    ${WebResourceFragmentDoc}
${RoleTypeFragmentDoc}
${RoleOrClientInfoFragmentDoc}`;
export const ReasonRoleStepFragmentDoc = gql`
    fragment ReasonRoleStep on RoleStep {
  id
  step {
    title
    short
  }
  roleStepTalent: talent {
    id
    fullName
    webResource {
      ...WebResourceFragment
    }
  }
}
    ${WebResourceFragmentDoc}`;
export const ReasonClientFragmentDoc = gql`
    fragment ReasonClient on Client {
  id
  fullName
  webResource {
    ...WebResourceFragment
  }
}
    ${WebResourceFragmentDoc}`;
export const ReasonEngagementFragmentDoc = gql`
    fragment ReasonEngagement on Engagement {
  id
  talent {
    id
    fullName
    webResource {
      ...WebResourceFragment
    }
  }
  webResource {
    ...WebResourceFragment
  }
}
    ${WebResourceFragmentDoc}`;