/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag'
disableFragmentWarnings()

import * as Types from '@staff-portal/graphql/staff'

import { OperationItemFragment } from '../../../../../../libs/billing/src/__fragments__/operationItemFragment.graphql.types'
import { gql } from '@apollo/client'
import { OperationItemFragmentDoc } from '../../../../../../libs/billing/src/__fragments__/operationItemFragment.graphql.types'
import * as Apollo from '@apollo/client'
import * as ApolloReactHooks from '@staff-portal/data-layer-service/src/hooks'
const defaultOptions = { throwOnError: true }
export type GetMemorandumListHeaderQueryVariables = Types.Exact<{
  [key: string]: never
}>

export type GetMemorandumListHeaderQuery = {
  operations: { addRoleMemorandum: OperationItemFragment }
}

export const GetMemorandumListHeaderDocument = gql`
  query GetMemorandumListHeader {
    operations {
      addRoleMemorandum {
        ...OperationItem
      }
    }
  }
  ${OperationItemFragmentDoc}
`

/**
 * __useGetMemorandumListHeaderQuery__
 *
 * To run a query within a React component, call `useGetMemorandumListHeaderQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMemorandumListHeaderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMemorandumListHeaderQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMemorandumListHeaderQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetMemorandumListHeaderQuery,
    GetMemorandumListHeaderQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useQuery<
    GetMemorandumListHeaderQuery,
    GetMemorandumListHeaderQueryVariables
  >(GetMemorandumListHeaderDocument, options)
}
export function useGetMemorandumListHeaderLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetMemorandumListHeaderQuery,
    GetMemorandumListHeaderQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useLazyQuery<
    GetMemorandumListHeaderQuery,
    GetMemorandumListHeaderQueryVariables
  >(GetMemorandumListHeaderDocument, options)
}
export type GetMemorandumListHeaderQueryHookResult = ReturnType<
  typeof useGetMemorandumListHeaderQuery
>
export type GetMemorandumListHeaderLazyQueryHookResult = ReturnType<
  typeof useGetMemorandumListHeaderLazyQuery
>
export type GetMemorandumListHeaderQueryResult = Apollo.QueryResult<
  GetMemorandumListHeaderQuery,
  GetMemorandumListHeaderQueryVariables
>
