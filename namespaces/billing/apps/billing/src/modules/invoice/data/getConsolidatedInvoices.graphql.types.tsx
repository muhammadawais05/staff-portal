/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag'
disableFragmentWarnings()

import * as Types from '@staff-portal/graphql/staff'

import { OriginalInvoiceItemFragment } from '../../__fragments__/originalInvoiceItemFragment.graphql.types'
import { gql } from '@apollo/client'
import { OriginalInvoiceItemFragmentDoc } from '../../__fragments__/originalInvoiceItemFragment.graphql.types'
import * as Apollo from '@apollo/client'
import * as ApolloReactHooks from '@staff-portal/data-layer-service/src/hooks'
const defaultOptions = { throwOnError: true }
export type GetConsolidatedInvoicesQueryVariables = Types.Exact<{
  invoiceId: Types.Scalars['ID']
}>

export type GetConsolidatedInvoicesQuery = {
  node?: Types.Maybe<{
    id: string
    unconsolidated: boolean
    originalInvoices?: Types.Maybe<{
      nodes: Array<OriginalInvoiceItemFragment>
    }>
    formerOriginalInvoices?: Types.Maybe<{
      nodes: Array<OriginalInvoiceItemFragment>
    }>
  }>
}

export const GetConsolidatedInvoicesDocument = gql`
  query GetConsolidatedInvoices($invoiceId: ID!) {
    node(id: $invoiceId) {
      ... on Invoice {
        id
        unconsolidated
        originalInvoices {
          nodes {
            ...OriginalInvoiceItemFragment
          }
        }
        formerOriginalInvoices {
          nodes {
            ...OriginalInvoiceItemFragment
          }
        }
      }
    }
  }
  ${OriginalInvoiceItemFragmentDoc}
`

/**
 * __useGetConsolidatedInvoicesQuery__
 *
 * To run a query within a React component, call `useGetConsolidatedInvoicesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetConsolidatedInvoicesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetConsolidatedInvoicesQuery({
 *   variables: {
 *      invoiceId: // value for 'invoiceId'
 *   },
 * });
 */
export function useGetConsolidatedInvoicesQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetConsolidatedInvoicesQuery,
    GetConsolidatedInvoicesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useQuery<
    GetConsolidatedInvoicesQuery,
    GetConsolidatedInvoicesQueryVariables
  >(GetConsolidatedInvoicesDocument, options)
}
export function useGetConsolidatedInvoicesLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetConsolidatedInvoicesQuery,
    GetConsolidatedInvoicesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useLazyQuery<
    GetConsolidatedInvoicesQuery,
    GetConsolidatedInvoicesQueryVariables
  >(GetConsolidatedInvoicesDocument, options)
}
export type GetConsolidatedInvoicesQueryHookResult = ReturnType<
  typeof useGetConsolidatedInvoicesQuery
>
export type GetConsolidatedInvoicesLazyQueryHookResult = ReturnType<
  typeof useGetConsolidatedInvoicesLazyQuery
>
export type GetConsolidatedInvoicesQueryResult = Apollo.QueryResult<
  GetConsolidatedInvoicesQuery,
  GetConsolidatedInvoicesQueryVariables
>
