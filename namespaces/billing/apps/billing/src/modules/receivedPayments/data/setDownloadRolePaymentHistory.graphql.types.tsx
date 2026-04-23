/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag'
disableFragmentWarnings()

import * as Types from '@staff-portal/graphql/staff'

import {
  UserErrorFragment_AssignScreeningSpecialistsError_,
  UserErrorFragment_P2PStandardUserError_,
  UserErrorFragment_SpecialistAssignmentBulkActionError_,
  UserErrorFragment_StandardUserError_,
  UserErrorFragment_TopcallUserError_
} from '../../../../../../libs/billing-widgets/src/modules/__fragments__/userErrorFragment.graphql.types'
import { gql } from '@apollo/client'
import { UserErrorFragmentDoc } from '../../../../../../libs/billing-widgets/src/modules/__fragments__/userErrorFragment.graphql.types'
import * as Apollo from '@apollo/client'
import * as ApolloReactHooks from '@staff-portal/data-layer-service/src/hooks'
const defaultOptions = { throwOnError: true }
export type DownloadRolePaymentHistoryMutationVariables = Types.Exact<{
  input: Types.DownloadRolePaymentHistoryInput
}>

export type DownloadRolePaymentHistoryMutation = {
  downloadRolePaymentHistory?: Types.Maybe<{
    downloadUrl?: Types.Maybe<string>
    notice?: Types.Maybe<string>
    success: boolean
    errors: Array<
      | UserErrorFragment_AssignScreeningSpecialistsError_
      | UserErrorFragment_P2PStandardUserError_
      | UserErrorFragment_SpecialistAssignmentBulkActionError_
      | UserErrorFragment_StandardUserError_
      | UserErrorFragment_TopcallUserError_
    >
  }>
}

export const DownloadRolePaymentHistoryDocument = gql`
  mutation DownloadRolePaymentHistory(
    $input: DownloadRolePaymentHistoryInput!
  ) {
    downloadRolePaymentHistory(input: $input) {
      downloadUrl
      errors {
        ...UserErrorFragment
      }
      notice
      success
    }
  }
  ${UserErrorFragmentDoc}
`
export type DownloadRolePaymentHistoryMutationFn = Apollo.MutationFunction<
  DownloadRolePaymentHistoryMutation,
  DownloadRolePaymentHistoryMutationVariables
>

/**
 * __useDownloadRolePaymentHistoryMutation__
 *
 * To run a mutation, you first call `useDownloadRolePaymentHistoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDownloadRolePaymentHistoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [downloadRolePaymentHistoryMutation, { data, loading, error }] = useDownloadRolePaymentHistoryMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDownloadRolePaymentHistoryMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    DownloadRolePaymentHistoryMutation,
    DownloadRolePaymentHistoryMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useMutation<
    DownloadRolePaymentHistoryMutation,
    DownloadRolePaymentHistoryMutationVariables
  >(DownloadRolePaymentHistoryDocument, options)
}
export type DownloadRolePaymentHistoryMutationHookResult = ReturnType<
  typeof useDownloadRolePaymentHistoryMutation
>
export type DownloadRolePaymentHistoryMutationResult =
  Apollo.MutationResult<DownloadRolePaymentHistoryMutation>
export type DownloadRolePaymentHistoryMutationOptions =
  Apollo.BaseMutationOptions<
    DownloadRolePaymentHistoryMutation,
    DownloadRolePaymentHistoryMutationVariables
  >
