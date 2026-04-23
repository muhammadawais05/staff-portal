/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag';
disableFragmentWarnings();

import * as Types from '@staff-portal/graphql/staff';

import { gql } from '@apollo/client';
export type RoleType_CompanyRepresentative_Fragment = { roleType: string };

export type RoleType_Leader_Fragment = { roleType: string };

export type RoleType_ReferralPartner_Fragment = { roleType: string };

export type RoleType_Staff_Fragment = { roleType: string };

export type RoleType_Talent_Fragment = { roleType: string };

export type RoleType_TalentPartner_Fragment = { roleType: string };

export type RoleTypeFragment = RoleType_CompanyRepresentative_Fragment | RoleType_Leader_Fragment | RoleType_ReferralPartner_Fragment | RoleType_Staff_Fragment | RoleType_Talent_Fragment | RoleType_TalentPartner_Fragment;

export const RoleTypeFragmentDoc = gql`
    fragment RoleType on Role {
  roleType: type
}
    `;