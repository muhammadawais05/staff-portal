/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag'
disableFragmentWarnings()

import * as Types from '@staff-portal/graphql/staff'

import { OperationItemFragment } from '../../../../../../../../libs/billing/src/__fragments__/operationItemFragment.graphql.types'
import { gql } from '@apollo/client'
import { OperationItemFragmentDoc } from '../../../../../../../../libs/billing/src/__fragments__/operationItemFragment.graphql.types'
import * as Apollo from '@apollo/client'
import * as ApolloReactHooks from '@staff-portal/data-layer-service/src/hooks'
const defaultOptions = { throwOnError: true }
export type GetInvoiceListConsolidationOperationQueryVariables = Types.Exact<{
  pagination: Types.OffsetPagination
  filter: Types.InvoicesFilter
}>

export type GetInvoiceListConsolidationOperationQuery = {
  invoices: { operations: { consolidateInvoices: OperationItemFragment } }
}

export const GetInvoiceListConsolidationOperationDocument = gql`
  query GetInvoiceListConsolidationOperation(
    $pagination: OffsetPagination!
    $filter: InvoicesFilter!
  ) {
    invoices(pagination: $pagination, filter: $filter) {
      operations {
        consolidateInvoices {
          ...OperationItem
        }
      }
    }
  }
  ${OperationItemFragmentDoc}
`

/**
 * __useGetInvoiceListConsolidationOperationQuery__
 *
 * To run a query within a React component, call `useGetInvoiceListConsolidationOperationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInvoiceListConsolidationOperationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInvoiceListConsolidationOperationQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetInvoiceListConsolidationOperationQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetInvoiceListConsolidationOperationQuery,
    GetInvoiceListConsolidationOperationQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useQuery<
    GetInvoiceListConsolidationOperationQuery,
    GetInvoiceListConsolidationOperationQueryVariables
  >(GetInvoiceListConsolidationOperationDocument, options)
}
export function useGetInvoiceListConsolidationOperationLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetInvoiceListConsolidationOperationQuery,
    GetInvoiceListConsolidationOperationQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useLazyQuery<
    GetInvoiceListConsolidationOperationQuery,
    GetInvoiceListConsolidationOperationQueryVariables
  >(GetInvoiceListConsolidationOperationDocument, options)
}
export type GetInvoiceListConsolidationOperationQueryHookResult = ReturnType<
  typeof useGetInvoiceListConsolidationOperationQuery
>
export type GetInvoiceListConsolidationOperationLazyQueryHookResult =
  ReturnType<typeof useGetInvoiceListConsolidationOperationLazyQuery>
export type GetInvoiceListConsolidationOperationQueryResult =
  Apollo.QueryResult<
    GetInvoiceListConsolidationOperationQuery,
    GetInvoiceListConsolidationOperationQueryVariables
  >
