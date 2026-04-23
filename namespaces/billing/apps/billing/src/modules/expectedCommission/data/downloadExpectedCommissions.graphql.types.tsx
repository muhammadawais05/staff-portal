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
export type DownloadExpectedCommissionsMutationVariables = Types.Exact<{
  input: Types.DownloadExpectedCommissionsInput
}>

export type DownloadExpectedCommissionsMutation = {
  downloadExpectedCommissions?: Types.Maybe<{
    success: boolean
    downloadUrl?: Types.Maybe<string>
    errors: Array<
      | UserErrorFragment_AssignScreeningSpecialistsError_
      | UserErrorFragment_P2PStandardUserError_
      | UserErrorFragment_SpecialistAssignmentBulkActionError_
      | UserErrorFragment_StandardUserError_
      | UserErrorFragment_TopcallUserError_
    >
  }>
}

export const DownloadExpectedCommissionsDocument = gql`
  mutation DownloadExpectedCommissions(
    $input: DownloadExpectedCommissionsInput!
  ) {
    downloadExpectedCommissions(input: $input) {
      success
      downloadUrl
      errors {
        ...UserErrorFragment
      }
    }
  }
  ${UserErrorFragmentDoc}
`
export type DownloadExpectedCommissionsMutationFn = Apollo.MutationFunction<
  DownloadExpectedCommissionsMutation,
  DownloadExpectedCommissionsMutationVariables
>

/**
 * __useDownloadExpectedCommissionsMutation__
 *
 * To run a mutation, you first call `useDownloadExpectedCommissionsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDownloadExpectedCommissionsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [downloadExpectedCommissionsMutation, { data, loading, error }] = useDownloadExpectedCommissionsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDownloadExpectedCommissionsMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    DownloadExpectedCommissionsMutation,
    DownloadExpectedCommissionsMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useMutation<
    DownloadExpectedCommissionsMutation,
    DownloadExpectedCommissionsMutationVariables
  >(DownloadExpectedCommissionsDocument, options)
}
export type DownloadExpectedCommissionsMutationHookResult = ReturnType<
  typeof useDownloadExpectedCommissionsMutation
>
export type DownloadExpectedCommissionsMutationResult =
  Apollo.MutationResult<DownloadExpectedCommissionsMutation>
export type DownloadExpectedCommissionsMutationOptions =
  Apollo.BaseMutationOptions<
    DownloadExpectedCommissionsMutation,
    DownloadExpectedCommissionsMutationVariables
  >
