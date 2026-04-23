/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag';
disableFragmentWarnings();

import * as Types from '@staff-portal/graphql/staff';

import { OperationItemFragment } from '../../../../../../../billing/src/__fragments__/operationItemFragment.graphql.types';
import { gql } from '@apollo/client';
import { OperationItemFragmentDoc } from '../../../../../../../billing/src/__fragments__/operationItemFragment.graphql.types';
import * as Apollo from '@apollo/client';
import * as ApolloReactHooks from '@staff-portal/data-layer-service/src/hooks';
const defaultOptions =  {"throwOnError":true}
export type GetRefundClientCreditBalanceQueryVariables = Types.Exact<{
  clientId: Types.Scalars['ID'];
}>;


export type GetRefundClientCreditBalanceQuery = { node?: Types.Maybe<{ id: string, availablePrepaymentBalanceNullable?: Types.Maybe<string>, fullName: string, operations: { refundClientCreditBalance: OperationItemFragment } }> };


export const GetRefundClientCreditBalanceDocument = gql`
    query GetRefundClientCreditBalance($clientId: ID!) {
  node(id: $clientId) {
    ... on Client {
      id
      availablePrepaymentBalanceNullable
      fullName
      operations {
        refundClientCreditBalance {
          ...OperationItem
        }
      }
    }
  }
}
    ${OperationItemFragmentDoc}`;

/**
 * __useGetRefundClientCreditBalanceQuery__
 *
 * To run a query within a React component, call `useGetRefundClientCreditBalanceQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRefundClientCreditBalanceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRefundClientCreditBalanceQuery({
 *   variables: {
 *      clientId: // value for 'clientId'
 *   },
 * });
 */
export function useGetRefundClientCreditBalanceQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetRefundClientCreditBalanceQuery, GetRefundClientCreditBalanceQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetRefundClientCreditBalanceQuery, GetRefundClientCreditBalanceQueryVariables>(GetRefundClientCreditBalanceDocument, options);
      }
export function useGetRefundClientCreditBalanceLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetRefundClientCreditBalanceQuery, GetRefundClientCreditBalanceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetRefundClientCreditBalanceQuery, GetRefundClientCreditBalanceQueryVariables>(GetRefundClientCreditBalanceDocument, options);
        }
export type GetRefundClientCreditBalanceQueryHookResult = ReturnType<typeof useGetRefundClientCreditBalanceQuery>;
export type GetRefundClientCreditBalanceLazyQueryHookResult = ReturnType<typeof useGetRefundClientCreditBalanceLazyQuery>;
export type GetRefundClientCreditBalanceQueryResult = Apollo.QueryResult<GetRefundClientCreditBalanceQuery, GetRefundClientCreditBalanceQueryVariables>;