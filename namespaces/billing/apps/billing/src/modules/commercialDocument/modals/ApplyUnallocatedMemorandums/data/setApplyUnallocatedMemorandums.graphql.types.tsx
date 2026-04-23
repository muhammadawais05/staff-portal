/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag'
disableFragmentWarnings()

import * as Types from '@staff-portal/graphql/staff'

import { TransferFragment } from '../../../../__fragments__/transferFragment.graphql.types'
import { OperationItemFragment } from '../../../../../../../../libs/billing/src/__fragments__/operationItemFragment.graphql.types'
import { gql } from '@apollo/client'
import { TransferFragmentDoc } from '../../../../__fragments__/transferFragment.graphql.types'
import { OperationItemFragmentDoc } from '../../../../../../../../libs/billing/src/__fragments__/operationItemFragment.graphql.types'
import * as Apollo from '@apollo/client'
import * as ApolloReactHooks from '@staff-portal/data-layer-service/src/hooks'
const defaultOptions = { throwOnError: true }
export type SetApplyUnallocatedMemorandumsToCommercialDocumentMutationVariables =
  Types.Exact<{
    input: Types.ApplyUnallocatedMemorandumsToCommercialDocumentInput
  }>

export type SetApplyUnallocatedMemorandumsToCommercialDocumentMutation = {
  applyUnallocatedMemorandumsToCommercialDocument?: Types.Maybe<{
    notice?: Types.Maybe<string>
    success: boolean
    errors: Array<
      | { code: string; key: string; message: string }
      | { code: string; key: string; message: string }
      | { code: string; key: string; message: string }
      | { code: string; key: string; message: string }
      | { code: string; key: string; message: string }
    >
    commercialDocument?: Types.Maybe<
      | {
          cleanAmountToPay?: Types.Maybe<string>
          discountedAmountToPay: string
          amount: string
          balanceDue: string
          creditedAmount: string
          debitedAmount: string
          id: string
          paidAmount: string
          paidAt?: Types.Maybe<
            | `${`${number}-${number}-${number}T${number}:${number}:${number}${string}`}`
            | ''
          >
          status: Types.DocumentStatus
          operations: {
            applyUnallocatedMemorandumsToCommercialDocument: OperationItemFragment
            createTransferInvoice: OperationItemFragment
          }
          memorandums: {
            nodes: Array<{
              allocated: boolean
              allocatedAt?: Types.Maybe<
                | `${`${number}-${number}-${number}T${number}:${number}:${number}${string}`}`
                | ''
              >
              amount: string
              amountDue: string
              balance: Types.MemorandumBalance
              depositCorrection: boolean
              description: string
              downloadHtmlUrl?: Types.Maybe<string>
              downloadPdfUrl?: Types.Maybe<string>
              id: string
              number: number
              category?: Types.Maybe<{ id: string; name: string }>
              portions: Array<{ id: string }>
            }>
          }
          transfers: { nodes: Array<TransferFragment> }
        }
      | {
          paymentMethod?: Types.Maybe<Types.PaymentOptionPaymentMethod>
          amount: string
          balanceDue: string
          creditedAmount: string
          debitedAmount: string
          id: string
          paidAmount: string
          paidAt?: Types.Maybe<
            | `${`${number}-${number}-${number}T${number}:${number}:${number}${string}`}`
            | ''
          >
          status: Types.DocumentStatus
          operations: {
            applyUnallocatedMemorandumsToCommercialDocument: OperationItemFragment
            payPayment: OperationItemFragment
          }
          memorandums: {
            nodes: Array<{
              allocated: boolean
              allocatedAt?: Types.Maybe<
                | `${`${number}-${number}-${number}T${number}:${number}:${number}${string}`}`
                | ''
              >
              amount: string
              amountDue: string
              balance: Types.MemorandumBalance
              depositCorrection: boolean
              description: string
              downloadHtmlUrl?: Types.Maybe<string>
              downloadPdfUrl?: Types.Maybe<string>
              id: string
              number: number
              category?: Types.Maybe<{ id: string; name: string }>
              portions: Array<{ id: string }>
            }>
          }
          transfers: { nodes: Array<TransferFragment> }
        }
    >
  }>
}

export const SetApplyUnallocatedMemorandumsToCommercialDocumentDocument = gql`
  mutation SetApplyUnallocatedMemorandumsToCommercialDocument(
    $input: ApplyUnallocatedMemorandumsToCommercialDocumentInput!
  ) {
    applyUnallocatedMemorandumsToCommercialDocument(input: $input) {
      notice
      success
      errors {
        code
        key
        message
      }
      commercialDocument {
        amount
        balanceDue
        creditedAmount
        debitedAmount
        id
        memorandums {
          nodes {
            allocated
            allocatedAt
            amount
            amountDue
            balance
            category {
              id
              name
            }
            depositCorrection
            description
            downloadHtmlUrl
            downloadPdfUrl
            id
            number
            portions {
              id
            }
          }
        }
        paidAmount
        paidAt
        status
        transfers {
          nodes {
            ...TransferFragment
          }
        }
        ... on Invoice {
          cleanAmountToPay
          discountedAmountToPay
          operations {
            applyUnallocatedMemorandumsToCommercialDocument {
              ...OperationItem
            }
            createTransferInvoice {
              ...OperationItem
            }
          }
        }
        ... on Payment {
          operations {
            applyUnallocatedMemorandumsToCommercialDocument {
              ...OperationItem
            }
            payPayment {
              ...OperationItem
            }
          }
          paymentMethod
        }
      }
    }
  }
  ${TransferFragmentDoc}
  ${OperationItemFragmentDoc}
`
export type SetApplyUnallocatedMemorandumsToCommercialDocumentMutationFn =
  Apollo.MutationFunction<
    SetApplyUnallocatedMemorandumsToCommercialDocumentMutation,
    SetApplyUnallocatedMemorandumsToCommercialDocumentMutationVariables
  >

/**
 * __useSetApplyUnallocatedMemorandumsToCommercialDocumentMutation__
 *
 * To run a mutation, you first call `useSetApplyUnallocatedMemorandumsToCommercialDocumentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetApplyUnallocatedMemorandumsToCommercialDocumentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setApplyUnallocatedMemorandumsToCommercialDocumentMutation, { data, loading, error }] = useSetApplyUnallocatedMemorandumsToCommercialDocumentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSetApplyUnallocatedMemorandumsToCommercialDocumentMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    SetApplyUnallocatedMemorandumsToCommercialDocumentMutation,
    SetApplyUnallocatedMemorandumsToCommercialDocumentMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useMutation<
    SetApplyUnallocatedMemorandumsToCommercialDocumentMutation,
    SetApplyUnallocatedMemorandumsToCommercialDocumentMutationVariables
  >(SetApplyUnallocatedMemorandumsToCommercialDocumentDocument, options)
}
export type SetApplyUnallocatedMemorandumsToCommercialDocumentMutationHookResult =
  ReturnType<
    typeof useSetApplyUnallocatedMemorandumsToCommercialDocumentMutation
  >
export type SetApplyUnallocatedMemorandumsToCommercialDocumentMutationResult =
  Apollo.MutationResult<SetApplyUnallocatedMemorandumsToCommercialDocumentMutation>
export type SetApplyUnallocatedMemorandumsToCommercialDocumentMutationOptions =
  Apollo.BaseMutationOptions<
    SetApplyUnallocatedMemorandumsToCommercialDocumentMutation,
    SetApplyUnallocatedMemorandumsToCommercialDocumentMutationVariables
  >
