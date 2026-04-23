/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag';
disableFragmentWarnings();

import * as Types from '@staff-portal/graphql/staff';

import { WebResourceFragment } from '../../../../../../../billing/src/__fragments__/webResourceFragment.graphql.types';
import { gql } from '@apollo/client';
import { WebResourceFragmentDoc } from '../../../../../../../billing/src/__fragments__/webResourceFragment.graphql.types';
import * as Apollo from '@apollo/client';
import * as ApolloReactHooks from '@staff-portal/data-layer-service/src/hooks';
const defaultOptions =  {"throwOnError":true}
export type GetDataForConsolidationDefaultModalQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
  scope?: Types.Maybe<Types.ClientHierarchyEngagementScope>;
}>;


export type GetDataForConsolidationDefaultModalQuery = { node?: Types.Maybe<{ id: string, fullName: string, hierarchy?: Types.Maybe<{ engagements: { nodes: Array<ConsolidationDefaultEngagementFragment> } }> }> };

export type ConsolidationDefaultEngagementFragment = { isWorking?: Types.Maybe<boolean>, id: string, startDate?: Types.Maybe<`${`${number}-${number}-${number}`}` | ''>, purchaseOrderLine?: Types.Maybe<{ id: string, poLineNumber: string, webResource: WebResourceFragment, purchaseOrder: { id: string, poNumber: string } }>, client?: Types.Maybe<{ id: string, fullName: string, _companyId?: Types.Maybe<number>, webResource: WebResourceFragment }>, job?: Types.Maybe<{ id: string, title: string, purchaseOrderLine?: Types.Maybe<{ id: string, poLineNumber: string, webResource: WebResourceFragment, purchaseOrder: { id: string, poNumber: string } }>, webResource: WebResourceFragment }>, talent?: Types.Maybe<{ id: string, fullName: string, webResource: WebResourceFragment }>, consolidationDefault?: Types.Maybe<{ id: string, name: string, deleted: boolean, client: { id: string, webResource: WebResourceFragment } }> };

export const ConsolidationDefaultEngagementFragmentDoc = gql`
    fragment ConsolidationDefaultEngagementFragment on Engagement {
  isWorking
  id
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
    _companyId
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
  consolidationDefault {
    id
    name
    deleted
    client {
      id
      webResource {
        ...WebResourceFragment
      }
    }
  }
  startDate
}
    ${WebResourceFragmentDoc}`;
export const GetDataForConsolidationDefaultModalDocument = gql`
    query GetDataForConsolidationDefaultModal($id: ID!, $scope: ClientHierarchyEngagementScope) {
  node(id: $id) {
    ... on Client {
      id
      fullName
      hierarchy {
        engagements(filter: {scope: $scope}) {
          nodes {
            ...ConsolidationDefaultEngagementFragment
          }
        }
      }
    }
  }
}
    ${ConsolidationDefaultEngagementFragmentDoc}`;

/**
 * __useGetDataForConsolidationDefaultModalQuery__
 *
 * To run a query within a React component, call `useGetDataForConsolidationDefaultModalQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDataForConsolidationDefaultModalQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDataForConsolidationDefaultModalQuery({
 *   variables: {
 *      id: // value for 'id'
 *      scope: // value for 'scope'
 *   },
 * });
 */
export function useGetDataForConsolidationDefaultModalQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetDataForConsolidationDefaultModalQuery, GetDataForConsolidationDefaultModalQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetDataForConsolidationDefaultModalQuery, GetDataForConsolidationDefaultModalQueryVariables>(GetDataForConsolidationDefaultModalDocument, options);
      }
export function useGetDataForConsolidationDefaultModalLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetDataForConsolidationDefaultModalQuery, GetDataForConsolidationDefaultModalQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetDataForConsolidationDefaultModalQuery, GetDataForConsolidationDefaultModalQueryVariables>(GetDataForConsolidationDefaultModalDocument, options);
        }
export type GetDataForConsolidationDefaultModalQueryHookResult = ReturnType<typeof useGetDataForConsolidationDefaultModalQuery>;
export type GetDataForConsolidationDefaultModalLazyQueryHookResult = ReturnType<typeof useGetDataForConsolidationDefaultModalLazyQuery>;
export type GetDataForConsolidationDefaultModalQueryResult = Apollo.QueryResult<GetDataForConsolidationDefaultModalQuery, GetDataForConsolidationDefaultModalQueryVariables>;