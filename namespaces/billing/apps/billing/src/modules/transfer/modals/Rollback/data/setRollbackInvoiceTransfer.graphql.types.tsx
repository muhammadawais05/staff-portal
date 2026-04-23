/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag'
disableFragmentWarnings()

import * as Types from '@staff-portal/graphql/staff'

import { TransferFragment } from '../../../../__fragments__/transferFragment.graphql.types'
import {
  UserErrorFragment_AssignScreeningSpecialistsError_,
  UserErrorFragment_P2PStandardUserError_,
  UserErrorFragment_SpecialistAssignmentBulkActionError_,
  UserErrorFragment_StandardUserError_,
  UserErrorFragment_TopcallUserError_
} from '../../../../../../../../libs/billing-widgets/src/modules/__fragments__/userErrorFragment.graphql.types'
import { gql } from '@apollo/client'
import { TransferFragmentDoc } from '../../../../__fragments__/transferFragment.graphql.types'
import { UserErrorFragmentDoc } from '../../../../../../../../libs/billing-widgets/src/modules/__fragments__/userErrorFragment.graphql.types'
import * as Apollo from '@apollo/client'
import * as ApolloReactHooks from '@staff-portal/data-layer-service/src/hooks'
const defaultOptions = { throwOnError: true }
export type SetRollbackTransferMutationVariables = Types.Exact<{
  input: Types.RollbackInvoiceTransferInput
}>

export type SetRollbackTransferMutation = {
  rollbackInvoiceTransfer?: Types.Maybe<{
    notice?: Types.Maybe<string>
    success: boolean
    invoice?: Types.Maybe<{
      id: string
      transfers: { nodes: Array<TransferFragment> }
    }>
    errors: Array<
      | UserErrorFragment_AssignScreeningSpecialistsError_
      | UserErrorFragment_P2PStandardUserError_
      | UserErrorFragment_SpecialistAssignmentBulkActionError_
      | UserErrorFragment_StandardUserError_
      | UserErrorFragment_TopcallUserError_
    >
  }>
}

export const SetRollbackTransferDocument = gql`
  mutation SetRollbackTransfer($input: RollbackInvoiceTransferInput!) {
    rollbackInvoiceTransfer(input: $input) {
      invoice {
        id
        transfers {
          nodes {
            ...TransferFragment
          }
        }
      }
      notice
      success
      errors {
        ...UserErrorFragment
      }
    }
  }
  ${TransferFragmentDoc}
  ${UserErrorFragmentDoc}
`
export type SetRollbackTransferMutationFn = Apollo.MutationFunction<
  SetRollbackTransferMutation,
  SetRollbackTransferMutationVariables
>

/**
 * __useSetRollbackTransferMutation__
 *
 * To run a mutation, you first call `useSetRollbackTransferMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetRollbackTransferMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setRollbackTransferMutation, { data, loading, error }] = useSetRollbackTransferMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSetRollbackTransferMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    SetRollbackTransferMutation,
    SetRollbackTransferMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useMutation<
    SetRollbackTransferMutation,
    SetRollbackTransferMutationVariables
  >(SetRollbackTransferDocument, options)
}
export type SetRollbackTransferMutationHookResult = ReturnType<
  typeof useSetRollbackTransferMutation
>
export type SetRollbackTransferMutationResult =
  Apollo.MutationResult<SetRollbackTransferMutation>
export type SetRollbackTransferMutationOptions = Apollo.BaseMutationOptions<
  SetRollbackTransferMutation,
  SetRollbackTransferMutationVariables
>
