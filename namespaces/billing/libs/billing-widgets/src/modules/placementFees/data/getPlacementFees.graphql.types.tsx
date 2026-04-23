/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag';
disableFragmentWarnings();

import * as Types from '@staff-portal/graphql/staff';

import { OperationItemFragment } from '../../../../../billing/src/__fragments__/operationItemFragment.graphql.types';
import { TotalsFragment } from '../../__fragments__/totalsFragment.graphql.types';
import { ExtraExpensePlacementFeeItemInvoiceFragment, ExtraExpensePlacementFeeItemPaymentFragment, ExtraExpensePlacementFeeItemCommissionFragment_Invoice_, ExtraExpensePlacementFeeItemCommissionFragment_Payment_ } from '../../__fragments__/extraExpensePlacementFeeFragment.graphql.types';
import { gql } from '@apollo/client';
import { OperationItemFragmentDoc } from '../../../../../billing/src/__fragments__/operationItemFragment.graphql.types';
import { TotalsFragmentDoc } from '../../__fragments__/totalsFragment.graphql.types';
import { ExtraExpensePlacementFeeItemInvoiceFragmentDoc, ExtraExpensePlacementFeeItemPaymentFragmentDoc, ExtraExpensePlacementFeeItemCommissionFragmentDoc } from '../../__fragments__/extraExpensePlacementFeeFragment.graphql.types';
import * as Apollo from '@apollo/client';
import * as ApolloReactHooks from '@staff-portal/data-layer-service/src/hooks';
const defaultOptions =  {"throwOnError":true}
export type GetPlacementFeesQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type GetPlacementFeesQuery = { node?: Types.Maybe<{ id: string, placementFees?: Types.Maybe<PlacementFeeConnectionFragment> }> };

export type PlacementFeeConnectionFragment = { operations?: Types.Maybe<{ createAndConfirmPlacementFee: OperationItemFragment }>, nodes: Array<PlacementFeeItemFragment>, placementFeeTotals: TotalsFragment };

export type PlacementFeeItemFragment = { invoice: ExtraExpensePlacementFeeItemInvoiceFragment, commissions: { nodes: Array<ExtraExpensePlacementFeeItemCommissionFragment_Invoice_ | ExtraExpensePlacementFeeItemCommissionFragment_Payment_> } };

export const PlacementFeeItemFragmentDoc = gql`
    fragment PlacementFeeItem on PlacementFee {
  invoice {
    ...ExtraExpensePlacementFeeItemInvoiceFragment
  }
  commissions {
    nodes {
      ...ExtraExpensePlacementFeeItemCommissionFragment
    }
  }
}
    ${ExtraExpensePlacementFeeItemInvoiceFragmentDoc}
${ExtraExpensePlacementFeeItemCommissionFragmentDoc}`;
export const PlacementFeeConnectionFragmentDoc = gql`
    fragment PlacementFeeConnection on PlacementFeeConnection {
  operations {
    createAndConfirmPlacementFee {
      ...OperationItem
    }
  }
  nodes {
    ...PlacementFeeItem
  }
  placementFeeTotals {
    ...TotalsFragment
  }
}
    ${OperationItemFragmentDoc}
${PlacementFeeItemFragmentDoc}
${TotalsFragmentDoc}`;
export const GetPlacementFeesDocument = gql`
    query GetPlacementFees($id: ID!) {
  node(id: $id) {
    ... on Engagement {
      id
      placementFees: placementFeesNullable {
        ...PlacementFeeConnection
      }
    }
  }
}
    ${PlacementFeeConnectionFragmentDoc}`;

/**
 * __useGetPlacementFeesQuery__
 *
 * To run a query within a React component, call `useGetPlacementFeesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPlacementFeesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPlacementFeesQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetPlacementFeesQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetPlacementFeesQuery, GetPlacementFeesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetPlacementFeesQuery, GetPlacementFeesQueryVariables>(GetPlacementFeesDocument, options);
      }
export function useGetPlacementFeesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetPlacementFeesQuery, GetPlacementFeesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetPlacementFeesQuery, GetPlacementFeesQueryVariables>(GetPlacementFeesDocument, options);
        }
export type GetPlacementFeesQueryHookResult = ReturnType<typeof useGetPlacementFeesQuery>;
export type GetPlacementFeesLazyQueryHookResult = ReturnType<typeof useGetPlacementFeesLazyQuery>;
export type GetPlacementFeesQueryResult = Apollo.QueryResult<GetPlacementFeesQuery, GetPlacementFeesQueryVariables>;