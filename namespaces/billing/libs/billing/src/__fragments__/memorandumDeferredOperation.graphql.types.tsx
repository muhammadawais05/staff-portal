/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag';
disableFragmentWarnings();

import * as Types from '@staff-portal/graphql/staff';

import { MemorandumOperationsFragment } from './memorandumOperationsFragment.graphql.types';
import { gql } from '@apollo/client';
import { MemorandumOperationsFragmentDoc } from './memorandumOperationsFragment.graphql.types';
export type MemorandumDeferredOperationFragment = (
  { id: string, downloadHtmlUrl?: Types.Maybe<string>, downloadPdfUrl?: Types.Maybe<string> }
  & MemorandumOperationsFragment
);

export const MemorandumDeferredOperationFragmentDoc = gql`
    fragment MemorandumDeferredOperationFragment on Memorandum {
  id
  downloadHtmlUrl
  downloadPdfUrl
  ...MemorandumOperationsFragment
}
    ${MemorandumOperationsFragmentDoc}`;