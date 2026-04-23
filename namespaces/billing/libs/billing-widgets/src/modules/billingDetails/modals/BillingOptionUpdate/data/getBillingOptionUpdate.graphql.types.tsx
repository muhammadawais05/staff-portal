/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag';
disableFragmentWarnings();

import * as Types from '@staff-portal/graphql/staff';

import { BillingOptionFragment_AchBillingOption_, BillingOptionFragment_CreditCardBillingOption_, BillingOptionFragment_OtherBillingOption_, BillingOptionFragment_PaypalBillingOption_, BillingOptionFragment_WireBillingOption_ } from '../../../../__fragments__/billingOptionFragment.graphql.types';
import { gql } from '@apollo/client';
import { BillingOptionFragmentDoc } from '../../../../__fragments__/billingOptionFragment.graphql.types';
import * as Apollo from '@apollo/client';
import * as ApolloReactHooks from '@staff-portal/data-layer-service/src/hooks';
const defaultOptions =  {"throwOnError":true}
export type GetBillingOptionUpdateQueryVariables = Types.Exact<{
  nodeId: Types.Scalars['ID'];
}>;


export type GetBillingOptionUpdateQuery = { node?: Types.Maybe<{ id: string, billingOptions: { nodes: Array<BillingOptionFragment_AchBillingOption_ | BillingOptionFragment_CreditCardBillingOption_ | BillingOptionFragment_OtherBillingOption_ | BillingOptionFragment_PaypalBillingOption_ | BillingOptionFragment_WireBillingOption_> } }> };


export const GetBillingOptionUpdateDocument = gql`
    query GetBillingOptionUpdate($nodeId: ID!) {
  node(id: $nodeId) {
    ... on Client {
      id
      billingOptions(filter: {scope: ALL}) {
        nodes {
          ...BillingOptionFragment
        }
      }
    }
  }
}
    ${BillingOptionFragmentDoc}`;

/**
 * __useGetBillingOptionUpdateQuery__
 *
 * To run a query within a React component, call `useGetBillingOptionUpdateQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBillingOptionUpdateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBillingOptionUpdateQuery({
 *   variables: {
 *      nodeId: // value for 'nodeId'
 *   },
 * });
 */
export function useGetBillingOptionUpdateQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetBillingOptionUpdateQuery, GetBillingOptionUpdateQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetBillingOptionUpdateQuery, GetBillingOptionUpdateQueryVariables>(GetBillingOptionUpdateDocument, options);
      }
export function useGetBillingOptionUpdateLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetBillingOptionUpdateQuery, GetBillingOptionUpdateQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetBillingOptionUpdateQuery, GetBillingOptionUpdateQueryVariables>(GetBillingOptionUpdateDocument, options);
        }
export type GetBillingOptionUpdateQueryHookResult = ReturnType<typeof useGetBillingOptionUpdateQuery>;
export type GetBillingOptionUpdateLazyQueryHookResult = ReturnType<typeof useGetBillingOptionUpdateLazyQuery>;
export type GetBillingOptionUpdateQueryResult = Apollo.QueryResult<GetBillingOptionUpdateQuery, GetBillingOptionUpdateQueryVariables>;