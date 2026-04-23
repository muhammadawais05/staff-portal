/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag';
disableFragmentWarnings();

import * as Types from '@staff-portal/graphql/staff';

import { JobTemplateFragment } from '../../../../__fragments__/jobTemplateFragment.graphql.types';
import { WebResourceFragment } from '../../../../../../../billing/src/__fragments__/webResourceFragment.graphql.types';
import { gql } from '@apollo/client';
import { JobTemplateFragmentDoc } from '../../../../__fragments__/jobTemplateFragment.graphql.types';
import { WebResourceFragmentDoc } from '../../../../../../../billing/src/__fragments__/webResourceFragment.graphql.types';
import * as Apollo from '@apollo/client';
import * as ApolloReactHooks from '@staff-portal/data-layer-service/src/hooks';
const defaultOptions =  {"throwOnError":true}
export type GetClientJobTemplateQueryVariables = Types.Exact<{
  clientId: Types.Scalars['ID'];
}>;


export type GetClientJobTemplateQuery = { node?: Types.Maybe<{ id: string, jobTemplate?: Types.Maybe<JobTemplateFragment>, parent?: Types.Maybe<{ id: string, fullName: string, webResource: WebResourceFragment, jobTemplate?: Types.Maybe<{ id: string }> }>, jobTemplateChangeInfo?: Types.Maybe<{ affectedChildren: { totalCount: number }, excludedChildren: { totalCount: number, nodes: Array<{ id: string, webResource: WebResourceFragment }> } }> }> };


export const GetClientJobTemplateDocument = gql`
    query GetClientJobTemplate($clientId: ID!) {
  node(id: $clientId) {
    ... on Client {
      id
      jobTemplate {
        ...JobTemplateFragment
      }
      parent {
        id
        fullName
        webResource {
          ...WebResourceFragment
        }
        jobTemplate {
          id
        }
      }
      jobTemplateChangeInfo {
        affectedChildren {
          totalCount
        }
        excludedChildren {
          nodes {
            id
            webResource {
              ...WebResourceFragment
            }
          }
          totalCount
        }
      }
    }
  }
}
    ${JobTemplateFragmentDoc}
${WebResourceFragmentDoc}`;

/**
 * __useGetClientJobTemplateQuery__
 *
 * To run a query within a React component, call `useGetClientJobTemplateQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetClientJobTemplateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetClientJobTemplateQuery({
 *   variables: {
 *      clientId: // value for 'clientId'
 *   },
 * });
 */
export function useGetClientJobTemplateQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetClientJobTemplateQuery, GetClientJobTemplateQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetClientJobTemplateQuery, GetClientJobTemplateQueryVariables>(GetClientJobTemplateDocument, options);
      }
export function useGetClientJobTemplateLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetClientJobTemplateQuery, GetClientJobTemplateQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetClientJobTemplateQuery, GetClientJobTemplateQueryVariables>(GetClientJobTemplateDocument, options);
        }
export type GetClientJobTemplateQueryHookResult = ReturnType<typeof useGetClientJobTemplateQuery>;
export type GetClientJobTemplateLazyQueryHookResult = ReturnType<typeof useGetClientJobTemplateLazyQuery>;
export type GetClientJobTemplateQueryResult = Apollo.QueryResult<GetClientJobTemplateQuery, GetClientJobTemplateQueryVariables>;