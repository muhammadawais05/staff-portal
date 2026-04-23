/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag';
disableFragmentWarnings();

import * as Types from '@staff-portal/graphql/staff';

import { gql } from '@apollo/client';
export type PaymentsTotalsFragment = { debited: string, disputed: string, due: string, onHold: string, outstanding: string, overdue: string, paid: string };

export const PaymentsTotalsFragmentDoc = gql`
    fragment PaymentsTotalsFragment on PaymentsTotals {
  debited
  disputed
  due
  onHold
  outstanding
  overdue
  paid
}
    `;