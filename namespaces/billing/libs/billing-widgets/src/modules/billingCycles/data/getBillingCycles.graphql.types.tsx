/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag';
disableFragmentWarnings();

import * as Types from '@staff-portal/graphql/staff';

import { BillingCyclesItemFragment } from '../../__fragments__/billingCyclesFragment.graphql.types';
import { ExtraExpensePlacementFeeItemInvoiceFragment, ExtraExpensePlacementFeeItemPaymentFragment, ExtraExpensePlacementFeeItemCommissionFragment_Invoice_, ExtraExpensePlacementFeeItemCommissionFragment_Payment_ } from '../../__fragments__/extraExpensePlacementFeeFragment.graphql.types';
import { gql } from '@apollo/client';
import { BillingCyclesItemFragmentDoc } from '../../__fragments__/billingCyclesFragment.graphql.types';
import { ExtraExpensePlacementFeeItemInvoiceFragmentDoc, ExtraExpensePlacementFeeItemPaymentFragmentDoc, ExtraExpensePlacementFeeItemCommissionFragmentDoc } from '../../__fragments__/extraExpensePlacementFeeFragment.graphql.types';
import * as Apollo from '@apollo/client';
import * as ApolloReactHooks from '@staff-portal/data-layer-service/src/hooks';
const defaultOptions =  {"throwOnError":true}
export type GetBillingCyclesQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
  engagementGid: Types.Scalars['GID'];
}>;


export type GetBillingCyclesQuery = { node?: Types.Maybe<{ id: string, billingCycles: { nodes: Array<BillingCyclesItemFragment> } }>, engagementDocuments: EngagementDocumentsFragment };

export type EngagementDocumentsFragment = { invoices: Array<(
    { kind: Types.InvoiceKind, consolidatedDocument?: Types.Maybe<ExtraExpensePlacementFeeItemInvoiceFragment> }
    & ExtraExpensePlacementFeeItemInvoiceFragment
  )>, payments: Array<(
    { extraHours: boolean }
    & ExtraExpensePlacementFeeItemPaymentFragment
  )>, commissions: Array<(
    { extraHours: boolean }
    & ExtraExpensePlacementFeeItemCommissionFragment_Payment_
  )> };

export const EngagementDocumentsFragmentDoc = gql`
    fragment EngagementDocuments on BillingEngagementDocuments {
  invoices {
    kind
    ...ExtraExpensePlacementFeeItemInvoiceFragment
    consolidatedDocument {
      ...ExtraExpensePlacementFeeItemInvoiceFragment
    }
  }
  payments {
    extraHours
    ...ExtraExpensePlacementFeeItemPaymentFragment
  }
  commissions {
    extraHours
    ...ExtraExpensePlacementFeeItemCommissionFragment
  }
}
    ${ExtraExpensePlacementFeeItemInvoiceFragmentDoc}
${ExtraExpensePlacementFeeItemPaymentFragmentDoc}
${ExtraExpensePlacementFeeItemCommissionFragmentDoc}`;
export const GetBillingCyclesDocument = gql`
    query GetBillingCycles($id: ID!, $engagementGid: GID!) {
  node(id: $id) {
    ... on Engagement {
      id
      billingCycles(sort: {order: DESC, target: START_DATE}) {
        nodes {
          ...BillingCyclesItemFragment
        }
      }
    }
  }
  engagementDocuments(engagementGid: $engagementGid) {
    ...EngagementDocuments
  }
}
    ${BillingCyclesItemFragmentDoc}
${EngagementDocumentsFragmentDoc}`;

/**
 * __useGetBillingCyclesQuery__
 *
 * To run a query within a React component, call `useGetBillingCyclesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBillingCyclesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBillingCyclesQuery({
 *   variables: {
 *      id: // value for 'id'
 *      engagementGid: // value for 'engagementGid'
 *   },
 * });
 */
export function useGetBillingCyclesQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetBillingCyclesQuery, GetBillingCyclesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetBillingCyclesQuery, GetBillingCyclesQueryVariables>(GetBillingCyclesDocument, options);
      }
export function useGetBillingCyclesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetBillingCyclesQuery, GetBillingCyclesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetBillingCyclesQuery, GetBillingCyclesQueryVariables>(GetBillingCyclesDocument, options);
        }
export type GetBillingCyclesQueryHookResult = ReturnType<typeof useGetBillingCyclesQuery>;
export type GetBillingCyclesLazyQueryHookResult = ReturnType<typeof useGetBillingCyclesLazyQuery>;
export type GetBillingCyclesQueryResult = Apollo.QueryResult<GetBillingCyclesQuery, GetBillingCyclesQueryVariables>;