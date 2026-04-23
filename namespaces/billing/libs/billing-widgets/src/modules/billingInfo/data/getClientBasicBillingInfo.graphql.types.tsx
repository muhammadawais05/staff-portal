/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag';
disableFragmentWarnings();

import * as Types from '@staff-portal/graphql/staff';

import { OperationItemFragment } from '../../../../../billing/src/__fragments__/operationItemFragment.graphql.types';
import { WebResourceFragment } from '../../../../../billing/src/__fragments__/webResourceFragment.graphql.types';
import { gql } from '@apollo/client';
import { OperationItemFragmentDoc } from '../../../../../billing/src/__fragments__/operationItemFragment.graphql.types';
import { WebResourceFragmentDoc } from '../../../../../billing/src/__fragments__/webResourceFragment.graphql.types';
import * as Apollo from '@apollo/client';
import * as ApolloReactHooks from '@staff-portal/data-layer-service/src/hooks';
const defaultOptions =  {"throwOnError":true}
export type GetClientBasicBillingInfoQueryVariables = Types.Exact<{
  clientId: Types.Scalars['ID'];
}>;


export type GetClientBasicBillingInfoQuery = { node?: Types.Maybe<{ id: string, unappliedCashBalance: string, availablePrepaymentBalanceNullable?: Types.Maybe<string>, operations: { refundClientCreditBalance: OperationItemFragment }, paymentOptions?: Types.Maybe<{ viewLink?: Types.Maybe<(
        WebResourceFragment
        & WebResourceFragment
      )>, manageLink?: Types.Maybe<WebResourceFragment>, nodes: Array<{ paymentMethod: Types.PaymentOptionPaymentMethod, placeholder: boolean, preferred: boolean, accountInfo?: Types.Maybe<Array<{ label: string, value: string }>> }> }>, unallocatedMemorandums: { totalAmount?: Types.Maybe<string>, webResource: WebResourceFragment } }>, viewer: { permits: { canViewPaymentOptions: boolean } } };


export const GetClientBasicBillingInfoDocument = gql`
    query GetClientBasicBillingInfo($clientId: ID!) {
  node(id: $clientId) {
    ... on Client {
      id
      unappliedCashBalance
      availablePrepaymentBalanceNullable
      operations {
        refundClientCreditBalance {
          ...OperationItem
        }
      }
      paymentOptions: paymentOptionsNullable {
        viewLink {
          ...WebResourceFragment
          ...WebResourceFragment
        }
        manageLink {
          ...WebResourceFragment
        }
        viewLink {
          ...WebResourceFragment
        }
        nodes {
          accountInfo {
            label
            value
          }
          paymentMethod
          placeholder
          preferred
        }
      }
      unallocatedMemorandums {
        totalAmount
        webResource {
          ...WebResourceFragment
        }
      }
    }
  }
  viewer {
    permits {
      canViewPaymentOptions
    }
  }
}
    ${OperationItemFragmentDoc}
${WebResourceFragmentDoc}`;

/**
 * __useGetClientBasicBillingInfoQuery__
 *
 * To run a query within a React component, call `useGetClientBasicBillingInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetClientBasicBillingInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetClientBasicBillingInfoQuery({
 *   variables: {
 *      clientId: // value for 'clientId'
 *   },
 * });
 */
export function useGetClientBasicBillingInfoQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetClientBasicBillingInfoQuery, GetClientBasicBillingInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetClientBasicBillingInfoQuery, GetClientBasicBillingInfoQueryVariables>(GetClientBasicBillingInfoDocument, options);
      }
export function useGetClientBasicBillingInfoLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetClientBasicBillingInfoQuery, GetClientBasicBillingInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetClientBasicBillingInfoQuery, GetClientBasicBillingInfoQueryVariables>(GetClientBasicBillingInfoDocument, options);
        }
export type GetClientBasicBillingInfoQueryHookResult = ReturnType<typeof useGetClientBasicBillingInfoQuery>;
export type GetClientBasicBillingInfoLazyQueryHookResult = ReturnType<typeof useGetClientBasicBillingInfoLazyQuery>;
export type GetClientBasicBillingInfoQueryResult = Apollo.QueryResult<GetClientBasicBillingInfoQuery, GetClientBasicBillingInfoQueryVariables>;