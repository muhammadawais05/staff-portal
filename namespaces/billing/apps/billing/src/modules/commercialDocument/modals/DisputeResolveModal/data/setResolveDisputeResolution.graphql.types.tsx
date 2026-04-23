/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag'
disableFragmentWarnings()

import * as Types from '@staff-portal/graphql/staff'

import {
  CommercialDocumentMutationFragment_Invoice_,
  CommercialDocumentMutationFragment_Payment_
} from '../../../../__fragments__/commercialDocumentMutationFragment.graphql.types'
import { gql } from '@apollo/client'
import { CommercialDocumentMutationFragmentDoc } from '../../../../__fragments__/commercialDocumentMutationFragment.graphql.types'
import * as Apollo from '@apollo/client'
import * as ApolloReactHooks from '@staff-portal/data-layer-service/src/hooks'
const defaultOptions = { throwOnError: true }
export type SetResolveDisputeResolutionMutationVariables = Types.Exact<{
  input: Types.ResolveDisputeOfCommercialDocumentInput
}>

export type SetResolveDisputeResolutionMutation = {
  resolveDisputeOfCommercialDocument?: Types.Maybe<{
    notice?: Types.Maybe<string>
    success: boolean
    commercialDocument?: Types.Maybe<
      | CommercialDocumentMutationFragment_Invoice_
      | CommercialDocumentMutationFragment_Payment_
    >
    errors: Array<
      | { key: string; message: string; code: string }
      | { key: string; message: string; code: string }
      | { key: string; message: string; code: string }
      | { key: string; message: string; code: string }
      | { key: string; message: string; code: string }
    >
  }>
}

export const SetResolveDisputeResolutionDocument = gql`
  mutation SetResolveDisputeResolution(
    $input: ResolveDisputeOfCommercialDocumentInput!
  ) {
    resolveDisputeOfCommercialDocument(input: $input) {
      commercialDocument {
        ...CommercialDocumentMutationFragment
      }
      notice
      success
      errors {
        key
        message
        code
      }
    }
  }
  ${CommercialDocumentMutationFragmentDoc}
`
export type SetResolveDisputeResolutionMutationFn = Apollo.MutationFunction<
  SetResolveDisputeResolutionMutation,
  SetResolveDisputeResolutionMutationVariables
>

/**
 * __useSetResolveDisputeResolutionMutation__
 *
 * To run a mutation, you first call `useSetResolveDisputeResolutionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetResolveDisputeResolutionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setResolveDisputeResolutionMutation, { data, loading, error }] = useSetResolveDisputeResolutionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSetResolveDisputeResolutionMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    SetResolveDisputeResolutionMutation,
    SetResolveDisputeResolutionMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useMutation<
    SetResolveDisputeResolutionMutation,
    SetResolveDisputeResolutionMutationVariables
  >(SetResolveDisputeResolutionDocument, options)
}
export type SetResolveDisputeResolutionMutationHookResult = ReturnType<
  typeof useSetResolveDisputeResolutionMutation
>
export type SetResolveDisputeResolutionMutationResult =
  Apollo.MutationResult<SetResolveDisputeResolutionMutation>
export type SetResolveDisputeResolutionMutationOptions =
  Apollo.BaseMutationOptions<
    SetResolveDisputeResolutionMutation,
    SetResolveDisputeResolutionMutationVariables
  >
