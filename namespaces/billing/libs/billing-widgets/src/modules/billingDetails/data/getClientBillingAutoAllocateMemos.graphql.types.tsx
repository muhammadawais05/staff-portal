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
export type GetClientBillingAutoAllocateMemosQueryVariables = Types.Exact<{
  clientId: Types.Scalars['ID'];
}>;


export type GetClientBillingAutoAllocateMemosQuery = { node?: Types.Maybe<{ id: string, autoAllocateMemos?: Types.Maybe<boolean> }> };


export const GetClientBillingAutoAllocateMemosDocument = gql`
    query GetClientBillingAutoAllocateMemos($clientId: ID!) {
  node(id: $clientId) {
    ... on Client {
      id
      autoAllocateMemos
    }
  }
}
    `;

/**
 * __useGetClientBillingAutoAllocateMemosQuery__
 *
 * To run a query within a React component, call `useGetClientBillingAutoAllocateMemosQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetClientBillingAutoAllocateMemosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetClientBillingAutoAllocateMemosQuery({
 *   variables: {
 *      clientId: // value for 'clientId'
 *   },
 * });
 */
export function useGetClientBillingAutoAllocateMemosQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetClientBillingAutoAllocateMemosQuery, GetClientBillingAutoAllocateMemosQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetClientBillingAutoAllocateMemosQuery, GetClientBillingAutoAllocateMemosQueryVariables>(GetClientBillingAutoAllocateMemosDocument, options);
      }
export function useGetClientBillingAutoAllocateMemosLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetClientBillingAutoAllocateMemosQuery, GetClientBillingAutoAllocateMemosQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetClientBillingAutoAllocateMemosQuery, GetClientBillingAutoAllocateMemosQueryVariables>(GetClientBillingAutoAllocateMemosDocument, options);
        }
export type GetClientBillingAutoAllocateMemosQueryHookResult = ReturnType<typeof useGetClientBillingAutoAllocateMemosQuery>;
export type GetClientBillingAutoAllocateMemosLazyQueryHookResult = ReturnType<typeof useGetClientBillingAutoAllocateMemosLazyQuery>;
export type GetClientBillingAutoAllocateMemosQueryResult = Apollo.QueryResult<GetClientBillingAutoAllocateMemosQuery, GetClientBillingAutoAllocateMemosQueryVariables>;