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
export type GetApplyUnallocatedMemorandumsToCommercialDocumentQueryVariables =
  Types.Exact<{
    id: Types.Scalars['ID']
  }>

export type GetApplyUnallocatedMemorandumsToCommercialDocumentQuery = {
  node?: Types.Maybe<
    | {
        documentNumber: number
        id: string
        subjectObject: {
          availablePrepaymentBalanceNullable?: Types.Maybe<string>
          id: string
          unallocatedMemorandums: UnallocatedMemorandumNodesFragment
        }
      }
    | {
        documentNumber: number
        id: string
        subjectObject:
          | {
              id: string
              availablePrepaymentBalanceNullable?: Types.Maybe<string>
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
      }
  >
}

export const GetApplyUnallocatedMemorandumsToCommercialDocumentDocument = gql`
  query GetApplyUnallocatedMemorandumsToCommercialDocument($id: ID!) {
    node(id: $id) {
      ... on Invoice {
        documentNumber
        id
        subjectObject {
          availablePrepaymentBalanceNullable
          id
          unallocatedMemorandums {
            ...UnallocatedMemorandumNodesFragment
          }
        }
      }
      ... on Payment {
        documentNumber
        id
        subjectObject {
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
            availablePrepaymentBalanceNullable
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
 * __useGetApplyUnallocatedMemorandumsToCommercialDocumentQuery__
 *
 * To run a query within a React component, call `useGetApplyUnallocatedMemorandumsToCommercialDocumentQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetApplyUnallocatedMemorandumsToCommercialDocumentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetApplyUnallocatedMemorandumsToCommercialDocumentQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetApplyUnallocatedMemorandumsToCommercialDocumentQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetApplyUnallocatedMemorandumsToCommercialDocumentQuery,
    GetApplyUnallocatedMemorandumsToCommercialDocumentQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useQuery<
    GetApplyUnallocatedMemorandumsToCommercialDocumentQuery,
    GetApplyUnallocatedMemorandumsToCommercialDocumentQueryVariables
  >(GetApplyUnallocatedMemorandumsToCommercialDocumentDocument, options)
}
export function useGetApplyUnallocatedMemorandumsToCommercialDocumentLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetApplyUnallocatedMemorandumsToCommercialDocumentQuery,
    GetApplyUnallocatedMemorandumsToCommercialDocumentQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useLazyQuery<
    GetApplyUnallocatedMemorandumsToCommercialDocumentQuery,
    GetApplyUnallocatedMemorandumsToCommercialDocumentQueryVariables
  >(GetApplyUnallocatedMemorandumsToCommercialDocumentDocument, options)
}
export type GetApplyUnallocatedMemorandumsToCommercialDocumentQueryHookResult =
  ReturnType<typeof useGetApplyUnallocatedMemorandumsToCommercialDocumentQuery>
export type GetApplyUnallocatedMemorandumsToCommercialDocumentLazyQueryHookResult =
  ReturnType<
    typeof useGetApplyUnallocatedMemorandumsToCommercialDocumentLazyQuery
  >
export type GetApplyUnallocatedMemorandumsToCommercialDocumentQueryResult =
  Apollo.QueryResult<
    GetApplyUnallocatedMemorandumsToCommercialDocumentQuery,
    GetApplyUnallocatedMemorandumsToCommercialDocumentQueryVariables
  >
