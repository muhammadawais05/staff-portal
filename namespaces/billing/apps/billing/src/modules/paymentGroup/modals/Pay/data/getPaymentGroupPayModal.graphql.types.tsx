/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag'
disableFragmentWarnings()

import * as Types from '@staff-portal/graphql/staff'

import {
  PaymentPaySubject_Client_Fragment,
  PaymentPaySubject_CompanyRepresentative_Fragment,
  PaymentPaySubject_Leader_Fragment,
  PaymentPaySubject_ReferralPartner_Fragment,
  PaymentPaySubject_Staff_Fragment,
  PaymentPaySubject_Talent_Fragment,
  PaymentPaySubject_TalentPartner_Fragment
} from '../../../../../../../../libs/billing-widgets/src/modules/__fragments__/paymentPaySubject.graphql.types'
import { PaymentGroupOperationsFragment } from '../../../../__fragments__/paymentGroupOperationsFragment.graphql.types'
import { gql } from '@apollo/client'
import { PaymentPaySubjectFragmentDoc } from '../../../../../../../../libs/billing-widgets/src/modules/__fragments__/paymentPaySubject.graphql.types'
import { PaymentGroupOperationsFragmentDoc } from '../../../../__fragments__/paymentGroupOperationsFragment.graphql.types'
import * as Apollo from '@apollo/client'
import * as ApolloReactHooks from '@staff-portal/data-layer-service/src/hooks'
const defaultOptions = { throwOnError: true }
export type GetPaymentGroupPayModalQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']
}>

export type GetPaymentGroupPayModalQuery = {
  node?: Types.Maybe<
    {
      id: string
      eligibleForPay: boolean
      number: number
      amount: string
      status: Types.PaymentGroupStatus
      subject:
        | PaymentPaySubject_Client_Fragment
        | PaymentPaySubject_CompanyRepresentative_Fragment
        | PaymentPaySubject_Leader_Fragment
        | PaymentPaySubject_ReferralPartner_Fragment
        | PaymentPaySubject_Staff_Fragment
        | PaymentPaySubject_Talent_Fragment
        | PaymentPaySubject_TalentPartner_Fragment
      payments: {
        groups?: Types.Maybe<
          Array<{
            payments: Array<{ id: string; status: Types.DocumentStatus }>
          }>
        >
      }
    } & PaymentGroupOperationsFragment
  >
}

export const GetPaymentGroupPayModalDocument = gql`
  query GetPaymentGroupPayModal($id: ID!) {
    node(id: $id) {
      ... on PaymentGroup {
        id
        eligibleForPay
        number
        amount
        status
        subject {
          ...PaymentPaySubject
        }
        ...PaymentGroupOperationsFragment
        payments {
          groups {
            payments {
              id
              status
            }
          }
        }
      }
    }
  }
  ${PaymentPaySubjectFragmentDoc}
  ${PaymentGroupOperationsFragmentDoc}
`

/**
 * __useGetPaymentGroupPayModalQuery__
 *
 * To run a query within a React component, call `useGetPaymentGroupPayModalQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPaymentGroupPayModalQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPaymentGroupPayModalQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetPaymentGroupPayModalQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetPaymentGroupPayModalQuery,
    GetPaymentGroupPayModalQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useQuery<
    GetPaymentGroupPayModalQuery,
    GetPaymentGroupPayModalQueryVariables
  >(GetPaymentGroupPayModalDocument, options)
}
export function useGetPaymentGroupPayModalLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetPaymentGroupPayModalQuery,
    GetPaymentGroupPayModalQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useLazyQuery<
    GetPaymentGroupPayModalQuery,
    GetPaymentGroupPayModalQueryVariables
  >(GetPaymentGroupPayModalDocument, options)
}
export type GetPaymentGroupPayModalQueryHookResult = ReturnType<
  typeof useGetPaymentGroupPayModalQuery
>
export type GetPaymentGroupPayModalLazyQueryHookResult = ReturnType<
  typeof useGetPaymentGroupPayModalLazyQuery
>
export type GetPaymentGroupPayModalQueryResult = Apollo.QueryResult<
  GetPaymentGroupPayModalQuery,
  GetPaymentGroupPayModalQueryVariables
>
