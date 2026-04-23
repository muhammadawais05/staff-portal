/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag';
disableFragmentWarnings();

import * as Types from '@staff-portal/graphql/staff';

import { gql } from '@apollo/client';
export type InvoicesTotalsFragment = { credited: string, disputed: string, paid: string, outstanding: string, overdue: string, pendingReceipt: string, inCollections: string, writtenOff: string, draft: string };

export const InvoicesTotalsFragmentDoc = gql`
    fragment InvoicesTotalsFragment on InvoicesTotals {
  credited
  disputed
  paid
  outstanding
  overdue
  pendingReceipt
  inCollections
  writtenOff
  draft
}
    `;