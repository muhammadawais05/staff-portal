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
export type GetUpdateClientBillingAddressQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type GetUpdateClientBillingAddressQuery = { node?: Types.Maybe<{ id: string, billingAdditionalInfo?: Types.Maybe<string>, billingAddress?: Types.Maybe<string>, billingName?: Types.Maybe<string>, billingCity?: Types.Maybe<string>, billingZip?: Types.Maybe<string>, billingState?: Types.Maybe<string>, billingPhone?: Types.Maybe<string>, fullName: string, billingCountry?: Types.Maybe<{ id: string, name: string }> }> };


export const GetUpdateClientBillingAddressDocument = gql`
    query GetUpdateClientBillingAddress($id: ID!) {
  node(id: $id) {
    ... on Client {
      id
      billingAdditionalInfo
      billingAddress
      billingName
      billingCity
      billingZip
      billingState
      billingCountry {
        id
        name
      }
      billingPhone
      fullName
    }
  }
}
    `;

/**
 * __useGetUpdateClientBillingAddressQuery__
 *
 * To run a query within a React component, call `useGetUpdateClientBillingAddressQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUpdateClientBillingAddressQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUpdateClientBillingAddressQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUpdateClientBillingAddressQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetUpdateClientBillingAddressQuery, GetUpdateClientBillingAddressQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetUpdateClientBillingAddressQuery, GetUpdateClientBillingAddressQueryVariables>(GetUpdateClientBillingAddressDocument, options);
      }
export function useGetUpdateClientBillingAddressLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUpdateClientBillingAddressQuery, GetUpdateClientBillingAddressQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetUpdateClientBillingAddressQuery, GetUpdateClientBillingAddressQueryVariables>(GetUpdateClientBillingAddressDocument, options);
        }
export type GetUpdateClientBillingAddressQueryHookResult = ReturnType<typeof useGetUpdateClientBillingAddressQuery>;
export type GetUpdateClientBillingAddressLazyQueryHookResult = ReturnType<typeof useGetUpdateClientBillingAddressLazyQuery>;
export type GetUpdateClientBillingAddressQueryResult = Apollo.QueryResult<GetUpdateClientBillingAddressQuery, GetUpdateClientBillingAddressQueryVariables>;