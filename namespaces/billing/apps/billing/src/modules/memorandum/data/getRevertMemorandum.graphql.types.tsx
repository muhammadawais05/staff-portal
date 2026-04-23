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
export type GetRevertMemorandumQueryVariables = Types.Exact<{
  nodeId: Types.Scalars['ID']
}>

export type GetRevertMemorandumQuery = {
  node?: Types.Maybe<{
    id: string
    balance: Types.MemorandumBalance
    amount: string
    number: number
    document?: Types.Maybe<
      | { id: string; documentNumber: number }
      | { id: string; documentNumber: number }
    >
    receiver:
      | { id: string; fullName: string }
      | { id: string; fullName: string }
      | { id: string; fullName: string }
      | { id: string; fullName: string }
      | { id: string; fullName: string }
      | { id: string; fullName: string }
      | { id: string; fullName: string }
  }>
}

export const GetRevertMemorandumDocument = gql`
  query GetRevertMemorandum($nodeId: ID!) {
    node(id: $nodeId) {
      ... on Memorandum {
        id
        balance
        amount
        number
        document {
          id
          documentNumber
        }
        receiver {
          ... on Client {
            id
            fullName
          }
          ... on Talent {
            id
            fullName
          }
          ... on TalentPartner {
            id
            fullName
          }
          ... on Staff {
            id
            fullName
          }
          ... on ReferralPartner {
            id
            fullName
          }
          ... on Leader {
            id
            fullName
          }
          ... on CompanyRepresentative {
            id
            fullName
          }
        }
      }
    }
  }
`

/**
 * __useGetRevertMemorandumQuery__
 *
 * To run a query within a React component, call `useGetRevertMemorandumQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRevertMemorandumQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRevertMemorandumQuery({
 *   variables: {
 *      nodeId: // value for 'nodeId'
 *   },
 * });
 */
export function useGetRevertMemorandumQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetRevertMemorandumQuery,
    GetRevertMemorandumQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useQuery<
    GetRevertMemorandumQuery,
    GetRevertMemorandumQueryVariables
  >(GetRevertMemorandumDocument, options)
}
export function useGetRevertMemorandumLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetRevertMemorandumQuery,
    GetRevertMemorandumQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useLazyQuery<
    GetRevertMemorandumQuery,
    GetRevertMemorandumQueryVariables
  >(GetRevertMemorandumDocument, options)
}
export type GetRevertMemorandumQueryHookResult = ReturnType<
  typeof useGetRevertMemorandumQuery
>
export type GetRevertMemorandumLazyQueryHookResult = ReturnType<
  typeof useGetRevertMemorandumLazyQuery
>
export type GetRevertMemorandumQueryResult = Apollo.QueryResult<
  GetRevertMemorandumQuery,
  GetRevertMemorandumQueryVariables
>
