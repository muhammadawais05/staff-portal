/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag';
disableFragmentWarnings();

import * as Types from '@staff-portal/graphql/staff';

import { MemorandumBaseItemFragment } from './memorandumBaseFragment.graphql.types';
import { gql } from '@apollo/client';
import { MemorandumBaseItemFragmentDoc } from './memorandumBaseFragment.graphql.types';
export type MemorandumItemFragment = (
  { portions: Array<MemorandumBaseItemFragment> }
  & MemorandumBaseItemFragment
);

export const MemorandumItemFragmentDoc = gql`
    fragment MemorandumItem on Memorandum {
  ...MemorandumBaseItem
  portions {
    ...MemorandumBaseItem
  }
}
    ${MemorandumBaseItemFragmentDoc}`;