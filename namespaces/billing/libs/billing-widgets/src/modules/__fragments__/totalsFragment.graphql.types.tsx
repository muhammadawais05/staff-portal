/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag';
disableFragmentWarnings();

import * as Types from '@staff-portal/graphql/staff';

import { gql } from '@apollo/client';
export type TotalsFragment = { creditTalent?: Types.Maybe<string>, creditCompany?: Types.Maybe<string>, creditCommissions?: Types.Maybe<string>, debitTalent?: Types.Maybe<string>, debitCompany?: Types.Maybe<string>, debitCommissions?: Types.Maybe<string>, paidTalent?: Types.Maybe<string>, paidCompany?: Types.Maybe<string>, paidCommissions?: Types.Maybe<string> };

export const TotalsFragmentDoc = gql`
    fragment TotalsFragment on Totals {
  creditTalent
  creditCompany
  creditCommissions
  debitTalent
  debitCompany
  debitCommissions
  paidTalent
  paidCompany
  paidCommissions
}
    `;