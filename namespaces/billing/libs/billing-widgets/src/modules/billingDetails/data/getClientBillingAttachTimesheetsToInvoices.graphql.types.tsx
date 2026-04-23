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
export type GetClientBillingAttachTimesheetsToInvoicesQueryVariables = Types.Exact<{
  clientId: Types.Scalars['ID'];
}>;


export type GetClientBillingAttachTimesheetsToInvoicesQuery = { node?: Types.Maybe<{ id: string, attachTimesheetsToInvoices?: Types.Maybe<boolean> }> };


export const GetClientBillingAttachTimesheetsToInvoicesDocument = gql`
    query GetClientBillingAttachTimesheetsToInvoices($clientId: ID!) {
  node(id: $clientId) {
    ... on Client {
      id
      attachTimesheetsToInvoices
    }
  }
}
    `;

/**
 * __useGetClientBillingAttachTimesheetsToInvoicesQuery__
 *
 * To run a query within a React component, call `useGetClientBillingAttachTimesheetsToInvoicesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetClientBillingAttachTimesheetsToInvoicesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetClientBillingAttachTimesheetsToInvoicesQuery({
 *   variables: {
 *      clientId: // value for 'clientId'
 *   },
 * });
 */
export function useGetClientBillingAttachTimesheetsToInvoicesQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetClientBillingAttachTimesheetsToInvoicesQuery, GetClientBillingAttachTimesheetsToInvoicesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetClientBillingAttachTimesheetsToInvoicesQuery, GetClientBillingAttachTimesheetsToInvoicesQueryVariables>(GetClientBillingAttachTimesheetsToInvoicesDocument, options);
      }
export function useGetClientBillingAttachTimesheetsToInvoicesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetClientBillingAttachTimesheetsToInvoicesQuery, GetClientBillingAttachTimesheetsToInvoicesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetClientBillingAttachTimesheetsToInvoicesQuery, GetClientBillingAttachTimesheetsToInvoicesQueryVariables>(GetClientBillingAttachTimesheetsToInvoicesDocument, options);
        }
export type GetClientBillingAttachTimesheetsToInvoicesQueryHookResult = ReturnType<typeof useGetClientBillingAttachTimesheetsToInvoicesQuery>;
export type GetClientBillingAttachTimesheetsToInvoicesLazyQueryHookResult = ReturnType<typeof useGetClientBillingAttachTimesheetsToInvoicesLazyQuery>;
export type GetClientBillingAttachTimesheetsToInvoicesQueryResult = Apollo.QueryResult<GetClientBillingAttachTimesheetsToInvoicesQuery, GetClientBillingAttachTimesheetsToInvoicesQueryVariables>;