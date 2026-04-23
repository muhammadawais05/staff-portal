/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag'
disableFragmentWarnings()

import * as Types from '@staff-portal/graphql/staff'

import {
  PaymentSubjectNameFragment_Client_,
  PaymentSubjectNameFragment_CompanyRepresentative_,
  PaymentSubjectNameFragment_Leader_,
  PaymentSubjectNameFragment_ReferralPartner_,
  PaymentSubjectNameFragment_Staff_,
  PaymentSubjectNameFragment_Talent_,
  PaymentSubjectNameFragment_TalentPartner_
} from '../../../../../../libs/billing-widgets/src/modules/__fragments__/paymentSubjectNameFragment.graphql.types'
import {
  PaymentWebResourceFragment_Client_,
  PaymentWebResourceFragment_CompanyRepresentative_,
  PaymentWebResourceFragment_Leader_,
  PaymentWebResourceFragment_ReferralPartner_,
  PaymentWebResourceFragment_Staff_,
  PaymentWebResourceFragment_Talent_,
  PaymentWebResourceFragment_TalentPartner_
} from '../../../../../../libs/billing-widgets/src/modules/__fragments__/paymentWebResourceFragment.graphql.types'
import { gql } from '@apollo/client'
import { PaymentSubjectNameFragmentDoc } from '../../../../../../libs/billing-widgets/src/modules/__fragments__/paymentSubjectNameFragment.graphql.types'
import { PaymentWebResourceFragmentDoc } from '../../../../../../libs/billing-widgets/src/modules/__fragments__/paymentWebResourceFragment.graphql.types'
import * as Apollo from '@apollo/client'
import * as ApolloReactHooks from '@staff-portal/data-layer-service/src/hooks'
const defaultOptions = { throwOnError: true }
export type GetPaymentGroupDetailsSubjectQueryVariables = Types.Exact<{
  nodeId: Types.Scalars['ID']
}>

export type GetPaymentGroupDetailsSubjectQuery = {
  node?: Types.Maybe<{
    id: string
    subject:
      | (PaymentSubjectNameFragment_Client_ &
          PaymentWebResourceFragment_Client_)
      | (PaymentSubjectNameFragment_CompanyRepresentative_ &
          PaymentWebResourceFragment_CompanyRepresentative_)
      | (PaymentSubjectNameFragment_Leader_ &
          PaymentWebResourceFragment_Leader_)
      | (PaymentSubjectNameFragment_ReferralPartner_ &
          PaymentWebResourceFragment_ReferralPartner_)
      | (PaymentSubjectNameFragment_Staff_ & PaymentWebResourceFragment_Staff_)
      | (PaymentSubjectNameFragment_Talent_ &
          PaymentWebResourceFragment_Talent_)
      | (PaymentSubjectNameFragment_TalentPartner_ &
          PaymentWebResourceFragment_TalentPartner_)
  }>
}

export const GetPaymentGroupDetailsSubjectDocument = gql`
  query GetPaymentGroupDetailsSubject($nodeId: ID!) {
    node(id: $nodeId) {
      ... on PaymentGroup {
        id
        subject {
          ...PaymentSubjectNameFragment
          ...PaymentWebResourceFragment
        }
      }
    }
  }
  ${PaymentSubjectNameFragmentDoc}
  ${PaymentWebResourceFragmentDoc}
`

/**
 * __useGetPaymentGroupDetailsSubjectQuery__
 *
 * To run a query within a React component, call `useGetPaymentGroupDetailsSubjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPaymentGroupDetailsSubjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPaymentGroupDetailsSubjectQuery({
 *   variables: {
 *      nodeId: // value for 'nodeId'
 *   },
 * });
 */
export function useGetPaymentGroupDetailsSubjectQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetPaymentGroupDetailsSubjectQuery,
    GetPaymentGroupDetailsSubjectQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useQuery<
    GetPaymentGroupDetailsSubjectQuery,
    GetPaymentGroupDetailsSubjectQueryVariables
  >(GetPaymentGroupDetailsSubjectDocument, options)
}
export function useGetPaymentGroupDetailsSubjectLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetPaymentGroupDetailsSubjectQuery,
    GetPaymentGroupDetailsSubjectQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useLazyQuery<
    GetPaymentGroupDetailsSubjectQuery,
    GetPaymentGroupDetailsSubjectQueryVariables
  >(GetPaymentGroupDetailsSubjectDocument, options)
}
export type GetPaymentGroupDetailsSubjectQueryHookResult = ReturnType<
  typeof useGetPaymentGroupDetailsSubjectQuery
>
export type GetPaymentGroupDetailsSubjectLazyQueryHookResult = ReturnType<
  typeof useGetPaymentGroupDetailsSubjectLazyQuery
>
export type GetPaymentGroupDetailsSubjectQueryResult = Apollo.QueryResult<
  GetPaymentGroupDetailsSubjectQuery,
  GetPaymentGroupDetailsSubjectQueryVariables
>
