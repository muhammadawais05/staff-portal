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
export type GetInvoiceForPrepaymentQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']
}>

export type GetInvoiceForPrepaymentQuery = {
  node?: Types.Maybe<{
    id: string
    cleanAmountToPay?: Types.Maybe<string>
    documentNumber: number
    invoiceKind: Types.InvoiceKind
    status: Types.DocumentStatus
    subjectObject: { availablePrepaymentBalance: string }
  }>
}

export const GetInvoiceForPrepaymentDocument = gql`
  query GetInvoiceForPrepayment($id: ID!) {
    node(id: $id) {
      ... on Invoice {
        id
        cleanAmountToPay
        documentNumber
        invoiceKind
        status
        subjectObject {
          availablePrepaymentBalance
        }
      }
    }
  }
`

/**
 * __useGetInvoiceForPrepaymentQuery__
 *
 * To run a query within a React component, call `useGetInvoiceForPrepaymentQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInvoiceForPrepaymentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInvoiceForPrepaymentQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetInvoiceForPrepaymentQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetInvoiceForPrepaymentQuery,
    GetInvoiceForPrepaymentQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useQuery<
    GetInvoiceForPrepaymentQuery,
    GetInvoiceForPrepaymentQueryVariables
  >(GetInvoiceForPrepaymentDocument, options)
}
export function useGetInvoiceForPrepaymentLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetInvoiceForPrepaymentQuery,
    GetInvoiceForPrepaymentQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useLazyQuery<
    GetInvoiceForPrepaymentQuery,
    GetInvoiceForPrepaymentQueryVariables
  >(GetInvoiceForPrepaymentDocument, options)
}
export type GetInvoiceForPrepaymentQueryHookResult = ReturnType<
  typeof useGetInvoiceForPrepaymentQuery
>
export type GetInvoiceForPrepaymentLazyQueryHookResult = ReturnType<
  typeof useGetInvoiceForPrepaymentLazyQuery
>
export type GetInvoiceForPrepaymentQueryResult = Apollo.QueryResult<
  GetInvoiceForPrepaymentQuery,
  GetInvoiceForPrepaymentQueryVariables
>
