/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag';
disableFragmentWarnings();

import * as Types from '@staff-portal/graphql/staff';

import { WebResourceFragment } from '../../../../../billing/src/__fragments__/webResourceFragment.graphql.types';
import { PurchaseOrderLineOptionFragment } from '../../__fragments__/billingSettingsJobFragment.graphql.types';
import { gql } from '@apollo/client';
import { WebResourceFragmentDoc } from '../../../../../billing/src/__fragments__/webResourceFragment.graphql.types';
import { PurchaseOrderLineOptionFragmentDoc } from '../../__fragments__/billingSettingsJobFragment.graphql.types';
import * as Apollo from '@apollo/client';
import * as ApolloReactHooks from '@staff-portal/data-layer-service/src/hooks';
const defaultOptions =  {"throwOnError":true}
export type GetPurchaseOrdersOptionsQueryVariables = Types.Exact<{
  jobId: Types.Scalars['ID'];
  include?: Types.Maybe<Array<Types.Scalars['ID']> | Types.Scalars['ID']>;
  exclude?: Types.Maybe<Array<Types.Scalars['ID']> | Types.Scalars['ID']>;
}>;


export type GetPurchaseOrdersOptionsQuery = { node?: Types.Maybe<{ id: string, client: { purchaseOrdersNullable?: Types.Maybe<{ nodes: Array<{ id: string, client: { fullName: string }, webResource: WebResourceFragment, purchaseOrderLines: { nodes: Array<PurchaseOrderLineOptionFragment> } }> }> } }> };


export const GetPurchaseOrdersOptionsDocument = gql`
    query GetPurchaseOrdersOptions($jobId: ID!, $include: [ID!], $exclude: [ID!]) {
  node(id: $jobId) {
    ... on Job {
      id
      client {
        purchaseOrdersNullable(filter: {assignable: true}) {
          nodes {
            id
            client {
              fullName
            }
            webResource {
              ...WebResourceFragment
            }
            purchaseOrderLines(filter: {assignable: true, with: $include, except: $exclude}) {
              nodes {
                ...PurchaseOrderLineOption
              }
            }
          }
        }
      }
    }
  }
}
    ${WebResourceFragmentDoc}
${PurchaseOrderLineOptionFragmentDoc}`;

/**
 * __useGetPurchaseOrdersOptionsQuery__
 *
 * To run a query within a React component, call `useGetPurchaseOrdersOptionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPurchaseOrdersOptionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPurchaseOrdersOptionsQuery({
 *   variables: {
 *      jobId: // value for 'jobId'
 *      include: // value for 'include'
 *      exclude: // value for 'exclude'
 *   },
 * });
 */
export function useGetPurchaseOrdersOptionsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetPurchaseOrdersOptionsQuery, GetPurchaseOrdersOptionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetPurchaseOrdersOptionsQuery, GetPurchaseOrdersOptionsQueryVariables>(GetPurchaseOrdersOptionsDocument, options);
      }
export function useGetPurchaseOrdersOptionsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetPurchaseOrdersOptionsQuery, GetPurchaseOrdersOptionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetPurchaseOrdersOptionsQuery, GetPurchaseOrdersOptionsQueryVariables>(GetPurchaseOrdersOptionsDocument, options);
        }
export type GetPurchaseOrdersOptionsQueryHookResult = ReturnType<typeof useGetPurchaseOrdersOptionsQuery>;
export type GetPurchaseOrdersOptionsLazyQueryHookResult = ReturnType<typeof useGetPurchaseOrdersOptionsLazyQuery>;
export type GetPurchaseOrdersOptionsQueryResult = Apollo.QueryResult<GetPurchaseOrdersOptionsQuery, GetPurchaseOrdersOptionsQueryVariables>;