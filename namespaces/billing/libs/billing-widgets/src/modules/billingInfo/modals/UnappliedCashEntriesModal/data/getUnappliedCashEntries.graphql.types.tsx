/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag';
disableFragmentWarnings();

import * as Types from '@staff-portal/graphql/staff';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import * as ApolloReactHooks from '@staff-portal/data-layer-service/src/hooks';
const defaultOptions =  {"throwOnError":true}
export type GetUnappliedCashEntriesQueryVariables = Types.Exact<{
  clientId: Types.Scalars['ID'];
}>;


export type GetUnappliedCashEntriesQuery = { node?: Types.Maybe<{ id: string, fullName: string, unappliedCashEntries?: Types.Maybe<{ nodes: Array<UnappliedCashEntryFragment> }> }> };

export type UnappliedCashEntryFragment = { id: string, amount: string, availableAmount: string, effectiveDate: `${`${number}-${number}-${number}`}` | '' };

export const UnappliedCashEntryFragmentDoc = gql`
    fragment UnappliedCashEntry on UnappliedCash {
  id
  amount
  availableAmount
  effectiveDate
}
    `;
export const GetUnappliedCashEntriesDocument = gql`
    query GetUnappliedCashEntries($clientId: ID!) {
  node(id: $clientId) {
    ... on Client {
      id
      fullName
      unappliedCashEntries {
        nodes {
          ...UnappliedCashEntry
        }
      }
    }
  }
}
    ${UnappliedCashEntryFragmentDoc}`;

/**
 * __useGetUnappliedCashEntriesQuery__
 *
 * To run a query within a React component, call `useGetUnappliedCashEntriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUnappliedCashEntriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUnappliedCashEntriesQuery({
 *   variables: {
 *      clientId: // value for 'clientId'
 *   },
 * });
 */
export function useGetUnappliedCashEntriesQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetUnappliedCashEntriesQuery, GetUnappliedCashEntriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetUnappliedCashEntriesQuery, GetUnappliedCashEntriesQueryVariables>(GetUnappliedCashEntriesDocument, options);
      }
export function useGetUnappliedCashEntriesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUnappliedCashEntriesQuery, GetUnappliedCashEntriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetUnappliedCashEntriesQuery, GetUnappliedCashEntriesQueryVariables>(GetUnappliedCashEntriesDocument, options);
        }
export type GetUnappliedCashEntriesQueryHookResult = ReturnType<typeof useGetUnappliedCashEntriesQuery>;
export type GetUnappliedCashEntriesLazyQueryHookResult = ReturnType<typeof useGetUnappliedCashEntriesLazyQuery>;
export type GetUnappliedCashEntriesQueryResult = Apollo.QueryResult<GetUnappliedCashEntriesQuery, GetUnappliedCashEntriesQueryVariables>;