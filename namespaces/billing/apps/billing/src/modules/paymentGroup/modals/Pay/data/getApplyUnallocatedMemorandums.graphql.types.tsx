/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag'
disableFragmentWarnings()

import * as Types from '@staff-portal/graphql/staff'

import { UnallocatedMemorandumNodesFragment } from '../../../../__fragments__/unallocatedMemorandumFragment.graphql.types'
import { gql } from '@apollo/client'
import { UnallocatedMemorandumNodesFragmentDoc } from '../../../../__fragments__/unallocatedMemorandumFragment.graphql.types'
import * as Apollo from '@apollo/client'
import * as ApolloReactHooks from '@staff-portal/data-layer-service/src/hooks'
const defaultOptions = { throwOnError: true }
export type GetApplyUnallocatedMemorandumsToPaymentGroupQueryVariables =
  Types.Exact<{
    id: Types.Scalars['ID']
  }>

export type GetApplyUnallocatedMemorandumsToPaymentGroupQuery = {
  node?: Types.Maybe<{
    id: string
    number: number
    subject:
      | {
          id: string
          unallocatedMemorandums: UnallocatedMemorandumNodesFragment
        }
      | {
          id: string
          unallocatedMemorandums: UnallocatedMemorandumNodesFragment
        }
      | {
          id: string
          unallocatedMemorandums: UnallocatedMemorandumNodesFragment
        }
      | {
          id: string
          unallocatedMemorandums: UnallocatedMemorandumNodesFragment
        }
      | {
          id: string
          unallocatedMemorandums: UnallocatedMemorandumNodesFragment
        }
      | {
          id: string
          unallocatedMemorandums: UnallocatedMemorandumNodesFragment
        }
      | {
          id: string
          unallocatedMemorandums: UnallocatedMemorandumNodesFragment
        }
  }>
}

export const GetApplyUnallocatedMemorandumsToPaymentGroupDocument = gql`
  query GetApplyUnallocatedMemorandumsToPaymentGroup($id: ID!) {
    node(id: $id) {
      ... on PaymentGroup {
        id
        number
        subject {
          ... on Talent {
            id
            unallocatedMemorandums {
              ...UnallocatedMemorandumNodesFragment
            }
          }
          ... on TalentPartner {
            id
            unallocatedMemorandums {
              ...UnallocatedMemorandumNodesFragment
            }
          }
          ... on Staff {
            id
            unallocatedMemorandums {
              ...UnallocatedMemorandumNodesFragment
            }
          }
          ... on ReferralPartner {
            id
            unallocatedMemorandums {
              ...UnallocatedMemorandumNodesFragment
            }
          }
          ... on Leader {
            id
            unallocatedMemorandums {
              ...UnallocatedMemorandumNodesFragment
            }
          }
          ... on CompanyRepresentative {
            id
            unallocatedMemorandums {
              ...UnallocatedMemorandumNodesFragment
            }
          }
          ... on Client {
            id
            unallocatedMemorandums {
              ...UnallocatedMemorandumNodesFragment
            }
          }
        }
      }
    }
  }
  ${UnallocatedMemorandumNodesFragmentDoc}
`

/**
 * __useGetApplyUnallocatedMemorandumsToPaymentGroupQuery__
 *
 * To run a query within a React component, call `useGetApplyUnallocatedMemorandumsToPaymentGroupQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetApplyUnallocatedMemorandumsToPaymentGroupQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetApplyUnallocatedMemorandumsToPaymentGroupQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetApplyUnallocatedMemorandumsToPaymentGroupQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetApplyUnallocatedMemorandumsToPaymentGroupQuery,
    GetApplyUnallocatedMemorandumsToPaymentGroupQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useQuery<
    GetApplyUnallocatedMemorandumsToPaymentGroupQuery,
    GetApplyUnallocatedMemorandumsToPaymentGroupQueryVariables
  >(GetApplyUnallocatedMemorandumsToPaymentGroupDocument, options)
}
export function useGetApplyUnallocatedMemorandumsToPaymentGroupLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetApplyUnallocatedMemorandumsToPaymentGroupQuery,
    GetApplyUnallocatedMemorandumsToPaymentGroupQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useLazyQuery<
    GetApplyUnallocatedMemorandumsToPaymentGroupQuery,
    GetApplyUnallocatedMemorandumsToPaymentGroupQueryVariables
  >(GetApplyUnallocatedMemorandumsToPaymentGroupDocument, options)
}
export type GetApplyUnallocatedMemorandumsToPaymentGroupQueryHookResult =
  ReturnType<typeof useGetApplyUnallocatedMemorandumsToPaymentGroupQuery>
export type GetApplyUnallocatedMemorandumsToPaymentGroupLazyQueryHookResult =
  ReturnType<typeof useGetApplyUnallocatedMemorandumsToPaymentGroupLazyQuery>
export type GetApplyUnallocatedMemorandumsToPaymentGroupQueryResult =
  Apollo.QueryResult<
    GetApplyUnallocatedMemorandumsToPaymentGroupQuery,
    GetApplyUnallocatedMemorandumsToPaymentGroupQueryVariables
  >
