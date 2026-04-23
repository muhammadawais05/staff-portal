/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag';
disableFragmentWarnings();

import * as Types from '@staff-portal/graphql/staff';

import { OperationItemFragment } from '../../../../../billing/src/__fragments__/operationItemFragment.graphql.types';
import { NoteCommonFragment } from '../../__fragments__/noteCommonFragment.graphql.types';
import { gql } from '@apollo/client';
import { OperationItemFragmentDoc } from '../../../../../billing/src/__fragments__/operationItemFragment.graphql.types';
import { NoteCommonFragmentDoc } from '../../__fragments__/noteCommonFragment.graphql.types';
import * as Apollo from '@apollo/client';
import * as ApolloReactHooks from '@staff-portal/data-layer-service/src/hooks';
const defaultOptions =  {"throwOnError":true}
export type GetClientBillingInformationNotesQueryVariables = Types.Exact<{
  clientId: Types.Scalars['ID'];
}>;


export type GetClientBillingInformationNotesQuery = { node?: Types.Maybe<{ id: string, cumulativeStatus?: Types.Maybe<Types.ClientCumulativeStatus>, fullName: string, operations: { logClientBillingInformation: OperationItemFragment }, billingInformationNotes?: Types.Maybe<{ nodes: Array<(
        { __typename: 'Note', status: Types.NoteStatus, attachment?: Types.Maybe<{ url: string, webResource: { text: string, url?: Types.Maybe<string> } }>, answers: { nodes: Array<{ id: string, comment?: Types.Maybe<string>, label?: Types.Maybe<string>, value?: Types.Maybe<Array<string>>, displayText?: Types.Maybe<string>, questionEdge: { node: { id: string, label: string, group: { label: string } } } }> }, softSkillRatings: { nodes: Array<{ id: string, comment: string, value: Types.SoftSkillRatingValue, softSkill: { id: string, name: string } }> } }
        & NoteCommonFragment
      )> }> }> };


export const GetClientBillingInformationNotesDocument = gql`
    query GetClientBillingInformationNotes($clientId: ID!) {
  node(id: $clientId) {
    ... on Client {
      id
      cumulativeStatus
      fullName
      operations {
        logClientBillingInformation {
          ...OperationItem
        }
      }
      billingInformationNotes {
        nodes {
          ...NoteCommon
          __typename
          status
          attachment {
            url
            webResource {
              text
              url
            }
          }
          answers {
            nodes {
              id
              comment
              label
              value
              displayText
              questionEdge {
                node {
                  id
                  label
                  group {
                    label
                  }
                }
              }
            }
          }
          softSkillRatings {
            nodes {
              id
              comment
              value
              softSkill {
                id
                name
              }
            }
          }
        }
      }
    }
  }
}
    ${OperationItemFragmentDoc}
${NoteCommonFragmentDoc}`;

/**
 * __useGetClientBillingInformationNotesQuery__
 *
 * To run a query within a React component, call `useGetClientBillingInformationNotesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetClientBillingInformationNotesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetClientBillingInformationNotesQuery({
 *   variables: {
 *      clientId: // value for 'clientId'
 *   },
 * });
 */
export function useGetClientBillingInformationNotesQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetClientBillingInformationNotesQuery, GetClientBillingInformationNotesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetClientBillingInformationNotesQuery, GetClientBillingInformationNotesQueryVariables>(GetClientBillingInformationNotesDocument, options);
      }
export function useGetClientBillingInformationNotesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetClientBillingInformationNotesQuery, GetClientBillingInformationNotesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetClientBillingInformationNotesQuery, GetClientBillingInformationNotesQueryVariables>(GetClientBillingInformationNotesDocument, options);
        }
export type GetClientBillingInformationNotesQueryHookResult = ReturnType<typeof useGetClientBillingInformationNotesQuery>;
export type GetClientBillingInformationNotesLazyQueryHookResult = ReturnType<typeof useGetClientBillingInformationNotesLazyQuery>;
export type GetClientBillingInformationNotesQueryResult = Apollo.QueryResult<GetClientBillingInformationNotesQuery, GetClientBillingInformationNotesQueryVariables>;