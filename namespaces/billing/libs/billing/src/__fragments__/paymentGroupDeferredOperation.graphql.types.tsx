/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag';
disableFragmentWarnings();

import * as Types from '@staff-portal/graphql/staff';

import { OperationItemFragment } from './operationItemFragment.graphql.types';
import { WebResourceFragment } from './webResourceFragment.graphql.types';
import { gql } from '@apollo/client';
import { OperationItemFragmentDoc } from './operationItemFragment.graphql.types';
import { WebResourceFragmentDoc } from './webResourceFragment.graphql.types';
export type PaymentGroupDeferredOperationFragment = { id: string, operations: { cancelPaymentGroup: OperationItemFragment }, webResource: WebResourceFragment };

export const PaymentGroupDeferredOperationFragmentDoc = gql`
    fragment PaymentGroupDeferredOperationFragment on PaymentGroup {
  id
  operations {
    cancelPaymentGroup {
      ...OperationItem
    }
  }
  webResource {
    ...WebResourceFragment
  }
}
    ${OperationItemFragmentDoc}
${WebResourceFragmentDoc}`;