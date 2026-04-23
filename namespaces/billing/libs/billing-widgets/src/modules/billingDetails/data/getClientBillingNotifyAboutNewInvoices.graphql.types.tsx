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
export type GetClientBillingNotifyAboutNewInvoicesQueryVariables = Types.Exact<{
  clientId: Types.Scalars['ID'];
}>;


export type GetClientBillingNotifyAboutNewInvoicesQuery = { node?: Types.Maybe<{ id: string, notifyAboutNewInvoices?: Types.Maybe<boolean> }> };


export const GetClientBillingNotifyAboutNewInvoicesDocument = gql`
    query GetClientBillingNotifyAboutNewInvoices($clientId: ID!) {
  node(id: $clientId) {
    ... on Client {
      id
      notifyAboutNewInvoices
    }
  }
}
    `;

/**
 * __useGetClientBillingNotifyAboutNewInvoicesQuery__
 *
 * To run a query within a React component, call `useGetClientBillingNotifyAboutNewInvoicesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetClientBillingNotifyAboutNewInvoicesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetClientBillingNotifyAboutNewInvoicesQuery({
 *   variables: {
 *      clientId: // value for 'clientId'
 *   },
 * });
 */
export function useGetClientBillingNotifyAboutNewInvoicesQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetClientBillingNotifyAboutNewInvoicesQuery, GetClientBillingNotifyAboutNewInvoicesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetClientBillingNotifyAboutNewInvoicesQuery, GetClientBillingNotifyAboutNewInvoicesQueryVariables>(GetClientBillingNotifyAboutNewInvoicesDocument, options);
      }
export function useGetClientBillingNotifyAboutNewInvoicesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetClientBillingNotifyAboutNewInvoicesQuery, GetClientBillingNotifyAboutNewInvoicesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetClientBillingNotifyAboutNewInvoicesQuery, GetClientBillingNotifyAboutNewInvoicesQueryVariables>(GetClientBillingNotifyAboutNewInvoicesDocument, options);
        }
export type GetClientBillingNotifyAboutNewInvoicesQueryHookResult = ReturnType<typeof useGetClientBillingNotifyAboutNewInvoicesQuery>;
export type GetClientBillingNotifyAboutNewInvoicesLazyQueryHookResult = ReturnType<typeof useGetClientBillingNotifyAboutNewInvoicesLazyQuery>;
export type GetClientBillingNotifyAboutNewInvoicesQueryResult = Apollo.QueryResult<GetClientBillingNotifyAboutNewInvoicesQuery, GetClientBillingNotifyAboutNewInvoicesQueryVariables>;