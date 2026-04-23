/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag';
disableFragmentWarnings();

import * as Types from '@staff-portal/graphql/staff';

import { gql } from '@apollo/client';
export type MemorandumCategoryCommonFragment = { id: string, credit?: Types.Maybe<string>, debit?: Types.Maybe<string>, name: string };

export const MemorandumCategoryCommonFragmentDoc = gql`
    fragment MemorandumCategoryCommon on MemorandumCategory {
  id
  credit
  debit
  name
}
    `;