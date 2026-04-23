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
export type DownloadCommissionsMutationVariables = Types.Exact<{
  input: Types.DownloadCommissionsInput
}>

export type DownloadCommissionsMutation = {
  downloadCommissions?: Types.Maybe<{
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

export const DownloadCommissionsDocument = gql`
  mutation DownloadCommissions($input: DownloadCommissionsInput!) {
    downloadCommissions(input: $input) {
      success
      downloadUrl
      errors {
        ...UserErrorFragment
      }
    }
  }
  ${UserErrorFragmentDoc}
`
export type DownloadCommissionsMutationFn = Apollo.MutationFunction<
  DownloadCommissionsMutation,
  DownloadCommissionsMutationVariables
>

/**
 * __useDownloadCommissionsMutation__
 *
 * To run a mutation, you first call `useDownloadCommissionsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDownloadCommissionsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [downloadCommissionsMutation, { data, loading, error }] = useDownloadCommissionsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDownloadCommissionsMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    DownloadCommissionsMutation,
    DownloadCommissionsMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useMutation<
    DownloadCommissionsMutation,
    DownloadCommissionsMutationVariables
  >(DownloadCommissionsDocument, options)
}
export type DownloadCommissionsMutationHookResult = ReturnType<
  typeof useDownloadCommissionsMutation
>
export type DownloadCommissionsMutationResult =
  Apollo.MutationResult<DownloadCommissionsMutation>
export type DownloadCommissionsMutationOptions = Apollo.BaseMutationOptions<
  DownloadCommissionsMutation,
  DownloadCommissionsMutationVariables
>
