/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag';
disableFragmentWarnings();

import * as Types from '@staff-portal/graphql/staff';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import * as ApolloReactHooks from '@staff-portal/data-layer-service/src/hooks';
const defaultOptions =  {"throwOnError":true}
export type GetClientDefaultNoteAnswersQueryVariables = Types.Exact<{
  clientId: Types.Scalars['ID'];
}>;


export type GetClientDefaultNoteAnswersQuery = { node?: Types.Maybe<{ id: string, defaultNoteAnswers?: Types.Maybe<{ nodes: Array<{ id: string, comment?: Types.Maybe<string>, displayText?: Types.Maybe<string>, label?: Types.Maybe<string>, value?: Types.Maybe<Array<string>>, option?: Types.Maybe<{ id: string }>, questionEdge: { renderedLabel?: Types.Maybe<string>, node: { kind: Types.NoteQuestionKind, hint?: Types.Maybe<string>, commentType?: Types.Maybe<Types.NoteQuestionCommentType>, additionalCommentsHint?: Types.Maybe<string>, required: boolean, id: string, label: string, activeOptions: { nodes: Array<{ id: string, label: string, value: string }> }, group: { label: string } } } }> }> }> };


export const GetClientDefaultNoteAnswersDocument = gql`
    query GetClientDefaultNoteAnswers($clientId: ID!) {
  node(id: $clientId) {
    ... on Client {
      id
      defaultNoteAnswers(filter: {noteType: BILLING_INFORMATION}) {
        nodes {
          id
          comment
          displayText
          label
          value
          option {
            id
          }
          questionEdge {
            renderedLabel
            node {
              kind
              hint
              commentType
              additionalCommentsHint
              required
              activeOptions {
                nodes {
                  id
                  label
                  value
                }
              }
              id
              label
              group {
                label
              }
            }
          }
        }
      }
    }
  }
}
    `;

/**
 * __useGetClientDefaultNoteAnswersQuery__
 *
 * To run a query within a React component, call `useGetClientDefaultNoteAnswersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetClientDefaultNoteAnswersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetClientDefaultNoteAnswersQuery({
 *   variables: {
 *      clientId: // value for 'clientId'
 *   },
 * });
 */
export function useGetClientDefaultNoteAnswersQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetClientDefaultNoteAnswersQuery, GetClientDefaultNoteAnswersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetClientDefaultNoteAnswersQuery, GetClientDefaultNoteAnswersQueryVariables>(GetClientDefaultNoteAnswersDocument, options);
      }
export function useGetClientDefaultNoteAnswersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetClientDefaultNoteAnswersQuery, GetClientDefaultNoteAnswersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetClientDefaultNoteAnswersQuery, GetClientDefaultNoteAnswersQueryVariables>(GetClientDefaultNoteAnswersDocument, options);
        }
export type GetClientDefaultNoteAnswersQueryHookResult = ReturnType<typeof useGetClientDefaultNoteAnswersQuery>;
export type GetClientDefaultNoteAnswersLazyQueryHookResult = ReturnType<typeof useGetClientDefaultNoteAnswersLazyQuery>;
export type GetClientDefaultNoteAnswersQueryResult = Apollo.QueryResult<GetClientDefaultNoteAnswersQuery, GetClientDefaultNoteAnswersQueryVariables>;