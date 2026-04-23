/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag';
disableFragmentWarnings();

import * as Types from '@staff-portal/graphql/staff';

import { gql } from '@apollo/client';
export type OperationItemFragment = { callable: Types.OperationCallableTypes, messages: Array<string> };

export const OperationItemFragmentDoc = gql`
    fragment OperationItem on Operation {
  callable
  messages
}
    `;