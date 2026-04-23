/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag';
disableFragmentWarnings();

import * as Types from '@staff-portal/graphql/staff';

import { gql } from '@apollo/client';
export type RoleItem_CompanyRepresentative_Fragment = { fullName: string, id: string, email: string };

export type RoleItem_Leader_Fragment = { fullName: string, id: string, email: string };

export type RoleItem_ReferralPartner_Fragment = { fullName: string, id: string, email: string };

export type RoleItem_Staff_Fragment = { fullName: string, id: string, email: string };

export type RoleItem_Talent_Fragment = { fullName: string, id: string, email: string };

export type RoleItem_TalentPartner_Fragment = { fullName: string, id: string, email: string };

export type RoleItemFragment = RoleItem_CompanyRepresentative_Fragment | RoleItem_Leader_Fragment | RoleItem_ReferralPartner_Fragment | RoleItem_Staff_Fragment | RoleItem_Talent_Fragment | RoleItem_TalentPartner_Fragment;

export const RoleItemFragmentDoc = gql`
    fragment RoleItem on Role {
  fullName
  id
  email
}
    `;