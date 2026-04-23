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
export type GetInvoicesListHeaderQueryVariables = Types.Exact<{
  pagination: Types.OffsetPagination
  filter: Types.InvoicesFilter
}>

export type GetInvoicesListHeaderQuery = {
  invoices: { downloadXlsxUrl?: Types.Maybe<string>; totalCount: number }
}

export const GetInvoicesListHeaderDocument = gql`
  query GetInvoicesListHeader(
    $pagination: OffsetPagination!
    $filter: InvoicesFilter!
  ) {
    invoices(pagination: $pagination, filter: $filter) {
      downloadXlsxUrl
      totalCount
    }
  }
`

/**
 * __useGetInvoicesListHeaderQuery__
 *
 * To run a query within a React component, call `useGetInvoicesListHeaderQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInvoicesListHeaderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInvoicesListHeaderQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetInvoicesListHeaderQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetInvoicesListHeaderQuery,
    GetInvoicesListHeaderQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useQuery<
    GetInvoicesListHeaderQuery,
    GetInvoicesListHeaderQueryVariables
  >(GetInvoicesListHeaderDocument, options)
}
export function useGetInvoicesListHeaderLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetInvoicesListHeaderQuery,
    GetInvoicesListHeaderQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useLazyQuery<
    GetInvoicesListHeaderQuery,
    GetInvoicesListHeaderQueryVariables
  >(GetInvoicesListHeaderDocument, options)
}
export type GetInvoicesListHeaderQueryHookResult = ReturnType<
  typeof useGetInvoicesListHeaderQuery
>
export type GetInvoicesListHeaderLazyQueryHookResult = ReturnType<
  typeof useGetInvoicesListHeaderLazyQuery
>
export type GetInvoicesListHeaderQueryResult = Apollo.QueryResult<
  GetInvoicesListHeaderQuery,
  GetInvoicesListHeaderQueryVariables
>
