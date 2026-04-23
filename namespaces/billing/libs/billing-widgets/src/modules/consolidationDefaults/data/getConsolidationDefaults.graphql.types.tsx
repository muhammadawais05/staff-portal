/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag';
disableFragmentWarnings();

import * as Types from '@staff-portal/graphql/staff';

import { WebResourceFragment } from '../../../../../billing/src/__fragments__/webResourceFragment.graphql.types';
import { gql } from '@apollo/client';
import { WebResourceFragmentDoc } from '../../../../../billing/src/__fragments__/webResourceFragment.graphql.types';
import * as Apollo from '@apollo/client';
import * as ApolloReactHooks from '@staff-portal/data-layer-service/src/hooks';
const defaultOptions =  {"throwOnError":true}
export type GetConsolidationDefaultsQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type GetConsolidationDefaultsQuery = { node?: Types.Maybe<{ id: string, consolidationDefaults: { nodes: Array<{ name: string, id: string, deleted: boolean, creationDate: `${`${number}-${number}-${number}`}` | '', engagements: { nodes: Array<{ id: string, isWorking?: Types.Maybe<boolean>, purchaseOrderLine?: Types.Maybe<{ id: string, poLineNumber: string, webResource: WebResourceFragment, purchaseOrder: { id: string, poNumber: string } }>, client?: Types.Maybe<{ id: string, fullName: string, webResource: WebResourceFragment }>, job?: Types.Maybe<{ id: string, title: string, purchaseOrderLine?: Types.Maybe<{ id: string, poLineNumber: string, webResource: WebResourceFragment, purchaseOrder: { id: string, poNumber: string } }>, webResource: WebResourceFragment }>, talent?: Types.Maybe<{ id: string, fullName: string, webResource: WebResourceFragment }> }> } }> } }> };


export const GetConsolidationDefaultsDocument = gql`
    query GetConsolidationDefaults($id: ID!) {
  node(id: $id) {
    ... on Client {
      id
      consolidationDefaults(order: {field: CREATED_AT, direction: DESC}) {
        nodes {
          name
          id
          deleted
          creationDate
          engagements {
            nodes {
              id
              isWorking
              purchaseOrderLine {
                id
                poLineNumber
                webResource {
                  ...WebResourceFragment
                }
                purchaseOrder {
                  id
                  poNumber
                }
              }
              client {
                id
                fullName
                webResource {
                  ...WebResourceFragment
                }
              }
              job {
                id
                title
                purchaseOrderLine {
                  id
                  poLineNumber
                  webResource {
                    ...WebResourceFragment
                  }
                  purchaseOrder {
                    id
                    poNumber
                  }
                }
                webResource {
                  ...WebResourceFragment
                }
              }
              talent {
                id
                fullName
                webResource {
                  ...WebResourceFragment
                }
              }
            }
          }
        }
      }
    }
  }
}
    ${WebResourceFragmentDoc}`;

/**
 * __useGetConsolidationDefaultsQuery__
 *
 * To run a query within a React component, call `useGetConsolidationDefaultsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetConsolidationDefaultsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetConsolidationDefaultsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetConsolidationDefaultsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetConsolidationDefaultsQuery, GetConsolidationDefaultsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetConsolidationDefaultsQuery, GetConsolidationDefaultsQueryVariables>(GetConsolidationDefaultsDocument, options);
      }
export function useGetConsolidationDefaultsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetConsolidationDefaultsQuery, GetConsolidationDefaultsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetConsolidationDefaultsQuery, GetConsolidationDefaultsQueryVariables>(GetConsolidationDefaultsDocument, options);
        }
export type GetConsolidationDefaultsQueryHookResult = ReturnType<typeof useGetConsolidationDefaultsQuery>;
export type GetConsolidationDefaultsLazyQueryHookResult = ReturnType<typeof useGetConsolidationDefaultsLazyQuery>;
export type GetConsolidationDefaultsQueryResult = Apollo.QueryResult<GetConsolidationDefaultsQuery, GetConsolidationDefaultsQueryVariables>;