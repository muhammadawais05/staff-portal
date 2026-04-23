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
export type GetDisputeResolveQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']
}>

export type GetDisputeResolveQuery = {
  node?: Types.Maybe<
    GetDisputeResolveInvoiceFragment | GetDisputeResolvePaymentFragment
  >
}

export type GetDisputeResolveInvoiceFragment = {
  id: string
  documentNumber: number
}

export type GetDisputeResolvePaymentFragment = {
  id: string
  documentNumber: number
}

export const GetDisputeResolveInvoiceFragmentDoc = gql`
  fragment GetDisputeResolveInvoice on Invoice {
    id
    documentNumber
  }
`
export const GetDisputeResolvePaymentFragmentDoc = gql`
  fragment GetDisputeResolvePayment on Payment {
    id
    documentNumber
  }
`
export const GetDisputeResolveDocument = gql`
  query GetDisputeResolve($id: ID!) {
    node(id: $id) {
      ... on Invoice {
        ...GetDisputeResolveInvoice
      }
      ... on Payment {
        ...GetDisputeResolvePayment
      }
    }
  }
  ${GetDisputeResolveInvoiceFragmentDoc}
  ${GetDisputeResolvePaymentFragmentDoc}
`

/**
 * __useGetDisputeResolveQuery__
 *
 * To run a query within a React component, call `useGetDisputeResolveQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDisputeResolveQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDisputeResolveQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetDisputeResolveQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetDisputeResolveQuery,
    GetDisputeResolveQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useQuery<
    GetDisputeResolveQuery,
    GetDisputeResolveQueryVariables
  >(GetDisputeResolveDocument, options)
}
export function useGetDisputeResolveLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetDisputeResolveQuery,
    GetDisputeResolveQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useLazyQuery<
    GetDisputeResolveQuery,
    GetDisputeResolveQueryVariables
  >(GetDisputeResolveDocument, options)
}
export type GetDisputeResolveQueryHookResult = ReturnType<
  typeof useGetDisputeResolveQuery
>
export type GetDisputeResolveLazyQueryHookResult = ReturnType<
  typeof useGetDisputeResolveLazyQuery
>
export type GetDisputeResolveQueryResult = Apollo.QueryResult<
  GetDisputeResolveQuery,
  GetDisputeResolveQueryVariables
>
