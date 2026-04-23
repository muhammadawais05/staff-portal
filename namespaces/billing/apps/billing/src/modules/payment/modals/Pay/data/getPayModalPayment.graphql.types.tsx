/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag'
disableFragmentWarnings()

import * as Types from '@staff-portal/graphql/staff'

import { OperationItemFragment } from '../../../../../../../../libs/billing/src/__fragments__/operationItemFragment.graphql.types'
import {
  PaymentPaySubject_Client_Fragment,
  PaymentPaySubject_CompanyRepresentative_Fragment,
  PaymentPaySubject_Leader_Fragment,
  PaymentPaySubject_ReferralPartner_Fragment,
  PaymentPaySubject_Staff_Fragment,
  PaymentPaySubject_Talent_Fragment,
  PaymentPaySubject_TalentPartner_Fragment
} from '../../../../../../../../libs/billing-widgets/src/modules/__fragments__/paymentPaySubject.graphql.types'
import { gql } from '@apollo/client'
import { OperationItemFragmentDoc } from '../../../../../../../../libs/billing/src/__fragments__/operationItemFragment.graphql.types'
import { PaymentPaySubjectFragmentDoc } from '../../../../../../../../libs/billing-widgets/src/modules/__fragments__/paymentPaySubject.graphql.types'
import * as Apollo from '@apollo/client'
import * as ApolloReactHooks from '@staff-portal/data-layer-service/src/hooks'
const defaultOptions = { throwOnError: true }
export type GetPayModalPaymentQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']
}>

export type GetPayModalPaymentQuery = {
  node?: Types.Maybe<{
    balanceDue: string
    documentNumber: number
    eligibleForPay: boolean
    id: string
    status: Types.DocumentStatus
    operations: {
      applyUnallocatedMemorandumsToCommercialDocument: OperationItemFragment
      payPayment: OperationItemFragment
    }
    subject:
      | PaymentPaySubject_Client_Fragment
      | PaymentPaySubject_CompanyRepresentative_Fragment
      | PaymentPaySubject_Leader_Fragment
      | PaymentPaySubject_ReferralPartner_Fragment
      | PaymentPaySubject_Staff_Fragment
      | PaymentPaySubject_Talent_Fragment
      | PaymentPaySubject_TalentPartner_Fragment
  }>
}

export const GetPayModalPaymentDocument = gql`
  query GetPayModalPayment($id: ID!) {
    node(id: $id) {
      ... on Payment {
        balanceDue
        documentNumber
        eligibleForPay
        id
        operations {
          applyUnallocatedMemorandumsToCommercialDocument {
            ...OperationItem
          }
          payPayment {
            ...OperationItem
          }
        }
        status
        subject {
          ...PaymentPaySubject
        }
      }
    }
  }
  ${OperationItemFragmentDoc}
  ${PaymentPaySubjectFragmentDoc}
`

/**
 * __useGetPayModalPaymentQuery__
 *
 * To run a query within a React component, call `useGetPayModalPaymentQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPayModalPaymentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPayModalPaymentQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetPayModalPaymentQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetPayModalPaymentQuery,
    GetPayModalPaymentQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useQuery<
    GetPayModalPaymentQuery,
    GetPayModalPaymentQueryVariables
  >(GetPayModalPaymentDocument, options)
}
export function useGetPayModalPaymentLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetPayModalPaymentQuery,
    GetPayModalPaymentQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useLazyQuery<
    GetPayModalPaymentQuery,
    GetPayModalPaymentQueryVariables
  >(GetPayModalPaymentDocument, options)
}
export type GetPayModalPaymentQueryHookResult = ReturnType<
  typeof useGetPayModalPaymentQuery
>
export type GetPayModalPaymentLazyQueryHookResult = ReturnType<
  typeof useGetPayModalPaymentLazyQuery
>
export type GetPayModalPaymentQueryResult = Apollo.QueryResult<
  GetPayModalPaymentQuery,
  GetPayModalPaymentQueryVariables
>
