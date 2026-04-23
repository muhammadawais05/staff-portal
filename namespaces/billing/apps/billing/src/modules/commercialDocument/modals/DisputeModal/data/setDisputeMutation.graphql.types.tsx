/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag'
disableFragmentWarnings()

import * as Types from '@staff-portal/graphql/staff'

import { InvoiceMutationFragment } from '../../../../__fragments__/invoiceMutationFragment.graphql.types'
import { PaymentMutationFragment } from '../../../../../../../../libs/billing-widgets/src/modules/__fragments__/paymentMutationFragment.graphql.types'
import { gql } from '@apollo/client'
import { InvoiceMutationFragmentDoc } from '../../../../__fragments__/invoiceMutationFragment.graphql.types'
import { PaymentMutationFragmentDoc } from '../../../../../../../../libs/billing-widgets/src/modules/__fragments__/paymentMutationFragment.graphql.types'
import * as Apollo from '@apollo/client'
import * as ApolloReactHooks from '@staff-portal/data-layer-service/src/hooks'
const defaultOptions = { throwOnError: true }
export type SetDisputeMutationVariables = Types.Exact<{
  input: Types.DisputeCommercialDocumentInput
}>

export type SetDisputeMutation = {
  disputeCommercialDocument?: Types.Maybe<{
    notice?: Types.Maybe<string>
    success: boolean
    commercialDocument?: Types.Maybe<
      | ({ id: string } & InvoiceMutationFragment)
      | ({ id: string } & PaymentMutationFragment)
    >
    errors: Array<
      | { code: string; key: string; message: string }
      | { code: string; key: string; message: string }
      | { code: string; key: string; message: string }
      | { code: string; key: string; message: string }
      | { code: string; key: string; message: string }
    >
  }>
}

export const SetDisputeDocument = gql`
  mutation SetDispute($input: DisputeCommercialDocumentInput!) {
    disputeCommercialDocument(input: $input) {
      commercialDocument {
        id
        ... on Invoice {
          ...InvoiceMutationFragment
        }
        ... on Payment {
          ...PaymentMutationFragment
        }
      }
      notice
      success
      errors {
        code
        key
        message
      }
    }
  }
  ${InvoiceMutationFragmentDoc}
  ${PaymentMutationFragmentDoc}
`
export type SetDisputeMutationFn = Apollo.MutationFunction<
  SetDisputeMutation,
  SetDisputeMutationVariables
>

/**
 * __useSetDisputeMutation__
 *
 * To run a mutation, you first call `useSetDisputeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetDisputeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setDisputeMutation, { data, loading, error }] = useSetDisputeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSetDisputeMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    SetDisputeMutation,
    SetDisputeMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useMutation<
    SetDisputeMutation,
    SetDisputeMutationVariables
  >(SetDisputeDocument, options)
}
export type SetDisputeMutationHookResult = ReturnType<
  typeof useSetDisputeMutation
>
export type SetDisputeMutationResult = Apollo.MutationResult<SetDisputeMutation>
export type SetDisputeMutationOptions = Apollo.BaseMutationOptions<
  SetDisputeMutation,
  SetDisputeMutationVariables
>
