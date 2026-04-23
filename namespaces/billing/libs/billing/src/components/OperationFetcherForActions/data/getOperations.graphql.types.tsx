/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag';
disableFragmentWarnings();

import * as Types from '@staff-portal/graphql/staff';

import { InvoiceDeferredOperationFragment } from '../../../__fragments__/invoiceDeferredOperation.graphql.types';
import { PaymentDeferredOperationFragment } from '../../../__fragments__/paymentDeferredOperation.graphql.types';
import { MemorandumDeferredOperationFragment } from '../../../__fragments__/memorandumDeferredOperation.graphql.types';
import { PaymentGroupDeferredOperationFragment } from '../../../__fragments__/paymentGroupDeferredOperation.graphql.types';
import { gql } from '@apollo/client';
import { InvoiceDeferredOperationFragmentDoc } from '../../../__fragments__/invoiceDeferredOperation.graphql.types';
import { PaymentDeferredOperationFragmentDoc } from '../../../__fragments__/paymentDeferredOperation.graphql.types';
import { MemorandumDeferredOperationFragmentDoc } from '../../../__fragments__/memorandumDeferredOperation.graphql.types';
import { PaymentGroupDeferredOperationFragmentDoc } from '../../../__fragments__/paymentGroupDeferredOperation.graphql.types';
import * as Apollo from '@apollo/client';
import * as ApolloReactHooks from '@staff-portal/data-layer-service/src/hooks';
const defaultOptions =  {"throwOnError":true}
export type GetOperationsQueryVariables = Types.Exact<{
  nodeId: Types.Scalars['ID'];
}>;


export type GetOperationsQuery = { node?: Types.Maybe<InvoiceDeferredOperationFragment | MemorandumDeferredOperationFragment | PaymentDeferredOperationFragment | PaymentGroupDeferredOperationFragment> };


export const GetOperationsDocument = gql`
    query GetOperations($nodeId: ID!) {
  node(id: $nodeId) {
    ... on Invoice {
      ...InvoiceDeferredOperationFragment
    }
    ... on Payment {
      ...PaymentDeferredOperationFragment
    }
    ... on Memorandum {
      ...MemorandumDeferredOperationFragment
    }
    ... on PaymentGroup {
      ...PaymentGroupDeferredOperationFragment
    }
  }
}
    ${InvoiceDeferredOperationFragmentDoc}
${PaymentDeferredOperationFragmentDoc}
${MemorandumDeferredOperationFragmentDoc}
${PaymentGroupDeferredOperationFragmentDoc}`;

/**
 * __useGetOperationsQuery__
 *
 * To run a query within a React component, call `useGetOperationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOperationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOperationsQuery({
 *   variables: {
 *      nodeId: // value for 'nodeId'
 *   },
 * });
 */
export function useGetOperationsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetOperationsQuery, GetOperationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetOperationsQuery, GetOperationsQueryVariables>(GetOperationsDocument, options);
      }
export function useGetOperationsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetOperationsQuery, GetOperationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetOperationsQuery, GetOperationsQueryVariables>(GetOperationsDocument, options);
        }
export type GetOperationsQueryHookResult = ReturnType<typeof useGetOperationsQuery>;
export type GetOperationsLazyQueryHookResult = ReturnType<typeof useGetOperationsLazyQuery>;
export type GetOperationsQueryResult = Apollo.QueryResult<GetOperationsQuery, GetOperationsQueryVariables>;