/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag'
disableFragmentWarnings()

import * as Types from '@staff-portal/graphql/staff'

import { InvoiceToConsolidateListItemFragment } from '../../../../__fragments__/invoiceToConsolidateListItemFragment.graphql.types'
import { gql } from '@apollo/client'
import { InvoiceToConsolidateListItemFragmentDoc } from '../../../../__fragments__/invoiceToConsolidateListItemFragment.graphql.types'
import * as Apollo from '@apollo/client'
import * as ApolloReactHooks from '@staff-portal/data-layer-service/src/hooks'
const defaultOptions = { throwOnError: true }
export type GetInvoicesToConsolidateQueryVariables = Types.Exact<{
  clientId: Types.Scalars['ID']
  filter: Types.InvoicesFilter
}>

export type GetInvoicesToConsolidateQuery = {
  invoices: {
    downloadXlsxUrl?: Types.Maybe<string>
    groups: Array<{
      invoices: Array<
        { consolidatable: boolean } & ConsolidatableInvoiceItemFragment
      >
    }>
  }
  availableBillingTerms?: Types.Maybe<{
    id: string
    netTerms: number
    availableNetTerms?: Types.Maybe<Array<number>>
  }>
}

export type ConsolidatableInvoiceItemFragment = {
  relatedTasks?: Types.Maybe<{ nodes: Array<{ status: string }> }>
} & InvoiceToConsolidateListItemFragment

export const ConsolidatableInvoiceItemFragmentDoc = gql`
  fragment ConsolidatableInvoiceItem on Invoice {
    relatedTasks(
      filter: { playbook: "issue_memo_for_invoice" }
      pagination: { offset: 0, limit: 10 }
    ) {
      nodes {
        status
      }
    }
    ...InvoiceToConsolidateListItemFragment
  }
  ${InvoiceToConsolidateListItemFragmentDoc}
`
export const GetInvoicesToConsolidateDocument = gql`
  query GetInvoicesToConsolidate($clientId: ID!, $filter: InvoicesFilter!) {
    invoices(pagination: { limit: 1000, offset: 0 }, filter: $filter) {
      downloadXlsxUrl
      groups {
        invoices {
          ...ConsolidatableInvoiceItem
          consolidatable
        }
      }
    }
    availableBillingTerms: node(id: $clientId) {
      ... on Client {
        id
        netTerms
        availableNetTerms
      }
    }
  }
  ${ConsolidatableInvoiceItemFragmentDoc}
`

/**
 * __useGetInvoicesToConsolidateQuery__
 *
 * To run a query within a React component, call `useGetInvoicesToConsolidateQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInvoicesToConsolidateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInvoicesToConsolidateQuery({
 *   variables: {
 *      clientId: // value for 'clientId'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetInvoicesToConsolidateQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetInvoicesToConsolidateQuery,
    GetInvoicesToConsolidateQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useQuery<
    GetInvoicesToConsolidateQuery,
    GetInvoicesToConsolidateQueryVariables
  >(GetInvoicesToConsolidateDocument, options)
}
export function useGetInvoicesToConsolidateLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetInvoicesToConsolidateQuery,
    GetInvoicesToConsolidateQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useLazyQuery<
    GetInvoicesToConsolidateQuery,
    GetInvoicesToConsolidateQueryVariables
  >(GetInvoicesToConsolidateDocument, options)
}
export type GetInvoicesToConsolidateQueryHookResult = ReturnType<
  typeof useGetInvoicesToConsolidateQuery
>
export type GetInvoicesToConsolidateLazyQueryHookResult = ReturnType<
  typeof useGetInvoicesToConsolidateLazyQuery
>
export type GetInvoicesToConsolidateQueryResult = Apollo.QueryResult<
  GetInvoicesToConsolidateQuery,
  GetInvoicesToConsolidateQueryVariables
>
