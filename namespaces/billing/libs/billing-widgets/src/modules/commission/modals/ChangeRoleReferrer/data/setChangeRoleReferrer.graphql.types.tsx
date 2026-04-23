/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag';
disableFragmentWarnings();

import * as Types from '@staff-portal/graphql/staff';

import { WebResourceFragment } from '../../../../../../../billing/src/__fragments__/webResourceFragment.graphql.types';
import { gql } from '@apollo/client';
import { WebResourceFragmentDoc } from '../../../../../../../billing/src/__fragments__/webResourceFragment.graphql.types';
import * as Apollo from '@apollo/client';
import * as ApolloReactHooks from '@staff-portal/data-layer-service/src/hooks';
const defaultOptions =  {"throwOnError":true}
export type ChangeRoleReferrerMutationVariables = Types.Exact<{
  input: Types.ChangeRoleReferrerInput;
}>;


export type ChangeRoleReferrerMutation = { changeRoleReferrer?: Types.Maybe<{ notice?: Types.Maybe<string>, success: boolean, roleOrClient?: Types.Maybe<{ id: string, fullName: string, webResource: WebResourceFragment } | { id: string, fullName: string, referrer?: Types.Maybe<{ id: string } | { id: string } | { id: string } | { id: string } | { id: string } | { id: string }>, webResource: WebResourceFragment } | { id: string, fullName: string, referrer?: Types.Maybe<{ id: string } | { id: string } | { id: string } | { id: string } | { id: string } | { id: string }>, webResource: WebResourceFragment }>, errors: Array<{ key: string, message: string, code: string } | { key: string, message: string, code: string } | { key: string, message: string, code: string } | { key: string, message: string, code: string } | { key: string, message: string, code: string }> }> };


export const ChangeRoleReferrerDocument = gql`
    mutation ChangeRoleReferrer($input: ChangeRoleReferrerInput!) {
  changeRoleReferrer(input: $input) {
    roleOrClient {
      ... on Talent {
        id
        fullName
        referrer {
          ... on Role {
            id
          }
        }
        ... on WebResource {
          webResource {
            ...WebResourceFragment
          }
        }
      }
      ... on TalentPartner {
        id
        fullName
        referrer {
          ... on Role {
            id
          }
        }
        ... on WebResource {
          webResource {
            ...WebResourceFragment
          }
        }
      }
      ... on Client {
        id
        fullName
        ... on WebResource {
          webResource {
            ...WebResourceFragment
          }
        }
      }
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
    ${WebResourceFragmentDoc}`;
export type ChangeRoleReferrerMutationFn = Apollo.MutationFunction<ChangeRoleReferrerMutation, ChangeRoleReferrerMutationVariables>;

/**
 * __useChangeRoleReferrerMutation__
 *
 * To run a mutation, you first call `useChangeRoleReferrerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeRoleReferrerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeRoleReferrerMutation, { data, loading, error }] = useChangeRoleReferrerMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useChangeRoleReferrerMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ChangeRoleReferrerMutation, ChangeRoleReferrerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<ChangeRoleReferrerMutation, ChangeRoleReferrerMutationVariables>(ChangeRoleReferrerDocument, options);
      }
export type ChangeRoleReferrerMutationHookResult = ReturnType<typeof useChangeRoleReferrerMutation>;
export type ChangeRoleReferrerMutationResult = Apollo.MutationResult<ChangeRoleReferrerMutation>;
export type ChangeRoleReferrerMutationOptions = Apollo.BaseMutationOptions<ChangeRoleReferrerMutation, ChangeRoleReferrerMutationVariables>;