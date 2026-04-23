/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag';
disableFragmentWarnings();

import * as Types from '@staff-portal/graphql/staff';

import { OperationItemFragment } from './operationItemFragment.graphql.types';
import { gql } from '@apollo/client';
import { OperationItemFragmentDoc } from './operationItemFragment.graphql.types';
export type MemorandumOperationsFragment = { operations: { revertInvoicePrepayments: OperationItemFragment, revertCommercialDocumentMemorandum: OperationItemFragment, revertRoleMemorandum: OperationItemFragment } };

export const MemorandumOperationsFragmentDoc = gql`
    fragment MemorandumOperationsFragment on Memorandum {
  operations {
    revertInvoicePrepayments {
      ...OperationItem
    }
    revertCommercialDocumentMemorandum {
      ...OperationItem
    }
    revertRoleMemorandum {
      ...OperationItem
    }
  }
}
    ${OperationItemFragmentDoc}`;