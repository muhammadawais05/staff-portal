/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag'
disableFragmentWarnings()

import * as Types from '@staff-portal/graphql/staff'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
import * as ApolloReactHooks from '@staff-portal/data-layer-service/src/hooks'
const defaultOptions = { throwOnError: true }
export type GetDisputeCommercialDocumentQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']
}>

export type GetDisputeCommercialDocumentQuery = {
  node?: Types.Maybe<
    | { documentNumber: number; id: string; pendingTalentPayments: boolean }
    | { documentNumber: number; id: string }
  >
}

export const GetDisputeCommercialDocumentDocument = gql`
  query GetDisputeCommercialDocument($id: ID!) {
    node(id: $id) {
      ... on Invoice {
        documentNumber
        id
        pendingTalentPayments
      }
      ... on Payment {
        documentNumber
        id
      }
    }
  }
`

/**
 * __useGetDisputeCommercialDocumentQuery__
 *
 * To run a query within a React component, call `useGetDisputeCommercialDocumentQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDisputeCommercialDocumentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDisputeCommercialDocumentQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetDisputeCommercialDocumentQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetDisputeCommercialDocumentQuery,
    GetDisputeCommercialDocumentQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useQuery<
    GetDisputeCommercialDocumentQuery,
    GetDisputeCommercialDocumentQueryVariables
  >(GetDisputeCommercialDocumentDocument, options)
}
export function useGetDisputeCommercialDocumentLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetDisputeCommercialDocumentQuery,
    GetDisputeCommercialDocumentQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useLazyQuery<
    GetDisputeCommercialDocumentQuery,
    GetDisputeCommercialDocumentQueryVariables
  >(GetDisputeCommercialDocumentDocument, options)
}
export type GetDisputeCommercialDocumentQueryHookResult = ReturnType<
  typeof useGetDisputeCommercialDocumentQuery
>
export type GetDisputeCommercialDocumentLazyQueryHookResult = ReturnType<
  typeof useGetDisputeCommercialDocumentLazyQuery
>
export type GetDisputeCommercialDocumentQueryResult = Apollo.QueryResult<
  GetDisputeCommercialDocumentQuery,
  GetDisputeCommercialDocumentQueryVariables
>
