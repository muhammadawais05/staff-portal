/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag';
disableFragmentWarnings();

import * as Types from '@staff-portal/graphql/staff';

import { PaymentOperationsFragment } from '../../../../billing/src/__fragments__/paymentOperationsFragment.graphql.types';
import { gql } from '@apollo/client';
import { PaymentOperationsFragmentDoc } from '../../../../billing/src/__fragments__/paymentOperationsFragment.graphql.types';
export type PaymentMutationFragment = (
  { createdOn: `${`${number}-${number}-${number}`}` | '', creditedAmount: string, dueDate?: Types.Maybe<`${`${number}-${number}-${number}`}` | ''>, id: string, paidAt?: Types.Maybe<`${`${number}-${number}-${number}T${number}:${number}:${number}${string}`}` | ''>, status: Types.DocumentStatus }
  & PaymentOperationsFragment
);

export const PaymentMutationFragmentDoc = gql`
    fragment PaymentMutationFragment on Payment {
  createdOn
  creditedAmount
  dueDate
  id
  paidAt
  status
  ...PaymentOperationsFragment
}
    ${PaymentOperationsFragmentDoc}`;