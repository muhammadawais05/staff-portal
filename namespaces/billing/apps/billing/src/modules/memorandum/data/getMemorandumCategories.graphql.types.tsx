/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag'
disableFragmentWarnings()

import * as Types from '@staff-portal/graphql/staff'

import { MemorandumCategoryCommonFragment } from '../../../../../../libs/billing-widgets/src/modules/__fragments__/memorandumCategoryCommon.graphql.types'
import { gql } from '@apollo/client'
import { MemorandumCategoryCommonFragmentDoc } from '../../../../../../libs/billing-widgets/src/modules/__fragments__/memorandumCategoryCommon.graphql.types'
import * as Apollo from '@apollo/client'
import * as ApolloReactHooks from '@staff-portal/data-layer-service/src/hooks'
const defaultOptions = { throwOnError: true }
export type GetMemorandumCategoriesQueryVariables = Types.Exact<{
  documentType: Types.MemorandumCategoryDocumentType
}>

export type GetMemorandumCategoriesQuery = {
  memorandumCategories?: Types.Maybe<{
    nodes: Array<MemorandumCategoryCommonFragment>
  }>
}

export const GetMemorandumCategoriesDocument = gql`
  query GetMemorandumCategories(
    $documentType: MemorandumCategoryDocumentType!
  ) {
    memorandumCategories: memorandumCategoriesNullable(
      documentType: $documentType
    ) {
      nodes {
        ...MemorandumCategoryCommon
      }
    }
  }
  ${MemorandumCategoryCommonFragmentDoc}
`

/**
 * __useGetMemorandumCategoriesQuery__
 *
 * To run a query within a React component, call `useGetMemorandumCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMemorandumCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMemorandumCategoriesQuery({
 *   variables: {
 *      documentType: // value for 'documentType'
 *   },
 * });
 */
export function useGetMemorandumCategoriesQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetMemorandumCategoriesQuery,
    GetMemorandumCategoriesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useQuery<
    GetMemorandumCategoriesQuery,
    GetMemorandumCategoriesQueryVariables
  >(GetMemorandumCategoriesDocument, options)
}
export function useGetMemorandumCategoriesLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetMemorandumCategoriesQuery,
    GetMemorandumCategoriesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useLazyQuery<
    GetMemorandumCategoriesQuery,
    GetMemorandumCategoriesQueryVariables
  >(GetMemorandumCategoriesDocument, options)
}
export type GetMemorandumCategoriesQueryHookResult = ReturnType<
  typeof useGetMemorandumCategoriesQuery
>
export type GetMemorandumCategoriesLazyQueryHookResult = ReturnType<
  typeof useGetMemorandumCategoriesLazyQuery
>
export type GetMemorandumCategoriesQueryResult = Apollo.QueryResult<
  GetMemorandumCategoriesQuery,
  GetMemorandumCategoriesQueryVariables
>
