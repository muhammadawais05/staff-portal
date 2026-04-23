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
export type GetClientBillingNetTermsQueryVariables = Types.Exact<{
  clientId: Types.Scalars['ID'];
}>;


export type GetClientBillingNetTermsQuery = { node?: Types.Maybe<{ id: string, netTerms: number }> };


export const GetClientBillingNetTermsDocument = gql`
    query GetClientBillingNetTerms($clientId: ID!) {
  node(id: $clientId) {
    ... on Client {
      id
      netTerms
    }
  }
}
    `;

/**
 * __useGetClientBillingNetTermsQuery__
 *
 * To run a query within a React component, call `useGetClientBillingNetTermsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetClientBillingNetTermsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetClientBillingNetTermsQuery({
 *   variables: {
 *      clientId: // value for 'clientId'
 *   },
 * });
 */
export function useGetClientBillingNetTermsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetClientBillingNetTermsQuery, GetClientBillingNetTermsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetClientBillingNetTermsQuery, GetClientBillingNetTermsQueryVariables>(GetClientBillingNetTermsDocument, options);
      }
export function useGetClientBillingNetTermsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetClientBillingNetTermsQuery, GetClientBillingNetTermsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetClientBillingNetTermsQuery, GetClientBillingNetTermsQueryVariables>(GetClientBillingNetTermsDocument, options);
        }
export type GetClientBillingNetTermsQueryHookResult = ReturnType<typeof useGetClientBillingNetTermsQuery>;
export type GetClientBillingNetTermsLazyQueryHookResult = ReturnType<typeof useGetClientBillingNetTermsLazyQuery>;
export type GetClientBillingNetTermsQueryResult = Apollo.QueryResult<GetClientBillingNetTermsQuery, GetClientBillingNetTermsQueryVariables>;