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
export type PurchaseOrderLineFragment = { budgetLeft?: Types.Maybe<string>, budgetSpent: boolean, draftedAmount: string, expiryDate?: Types.Maybe<`${`${number}-${number}-${number}`}` | ''>, archived: boolean, id: string, invoicedAmount: string, poLineNumber: string, threshold?: Types.Maybe<string>, totalAmount?: Types.Maybe<string>, webResource: WebResourceFragment };

export const PurchaseOrderLineFragmentDoc = gql`
    fragment PurchaseOrderLineFragment on PurchaseOrderLine {
  budgetLeft
  budgetSpent
  draftedAmount
  expiryDate
  archived
  id
  invoicedAmount
  poLineNumber
  threshold
  totalAmount
  webResource {
    ...WebResourceFragment
  }
}
    ${WebResourceFragmentDoc}`;