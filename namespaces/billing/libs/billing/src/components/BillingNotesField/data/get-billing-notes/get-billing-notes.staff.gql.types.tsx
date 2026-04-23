/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag';
disableFragmentWarnings();

import * as Types from '@staff-portal/graphql/staff';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import gql from 'graphql-tag';
export type GetBillingNotesQueryVariables = Types.Exact<{
  roleOrClientId: Types.Scalars['ID'];
}>;


export type GetBillingNotesQuery = { node?: Types.Maybe<{ id: string, billingNotes?: Types.Maybe<string> } | { id: string, billingNotes?: Types.Maybe<string> }> };


export const GetBillingNotesDocument = gql`
    query GetBillingNotes($roleOrClientId: ID!) {
  node(id: $roleOrClientId) {
    ... on Talent {
      id
      billingNotes
    }
    ... on Client {
      id
      billingNotes
    }
  }
}
    ` as unknown as DocumentNode<GetBillingNotesQuery, GetBillingNotesQueryVariables>;