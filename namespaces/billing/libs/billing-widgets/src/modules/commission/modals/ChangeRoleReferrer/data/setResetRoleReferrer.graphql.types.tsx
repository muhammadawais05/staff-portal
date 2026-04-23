/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag';
disableFragmentWarnings();

import * as Types from '@staff-portal/graphql/staff';

import { CommissionsRole_Client_Fragment, CommissionsRole_CompanyRepresentative_Fragment, CommissionsRole_Leader_Fragment, CommissionsRole_ReferralPartner_Fragment, CommissionsRole_Staff_Fragment, CommissionsRole_Talent_Fragment, CommissionsRole_TalentPartner_Fragment } from '../../../../__fragments__/commissionsRoleFragment.graphql.types';
import { WebResourceFragment } from '../../../../../../../billing/src/__fragments__/webResourceFragment.graphql.types';
import { gql } from '@apollo/client';
import { CommissionsRoleFragmentDoc } from '../../../../__fragments__/commissionsRoleFragment.graphql.types';
import { WebResourceFragmentDoc } from '../../../../../../../billing/src/__fragments__/webResourceFragment.graphql.types';
import * as Apollo from '@apollo/client';
import * as ApolloReactHooks from '@staff-portal/data-layer-service/src/hooks';
const defaultOptions =  {"throwOnError":true}
export type ResetRoleReferrerMutationVariables = Types.Exact<{
  input: Types.ResetRoleReferrerInput;
}>;


export type ResetRoleReferrerMutation = { resetRoleReferrer?: Types.Maybe<{ notice?: Types.Maybe<string>, success: boolean, role?: Types.Maybe<{ id: string, fullName: string, referrer?: Types.Maybe<CommissionsRole_Client_Fragment | CommissionsRole_CompanyRepresentative_Fragment | CommissionsRole_Leader_Fragment | CommissionsRole_ReferralPartner_Fragment | CommissionsRole_Staff_Fragment | CommissionsRole_Talent_Fragment | CommissionsRole_TalentPartner_Fragment>, webResource: WebResourceFragment } | { id: string, fullName: string, referrer?: Types.Maybe<CommissionsRole_Client_Fragment | CommissionsRole_CompanyRepresentative_Fragment | CommissionsRole_Leader_Fragment | CommissionsRole_ReferralPartner_Fragment | CommissionsRole_Staff_Fragment | CommissionsRole_Talent_Fragment | CommissionsRole_TalentPartner_Fragment>, webResource: WebResourceFragment }>, errors: Array<{ key: string, message: string, code: string } | { key: string, message: string, code: string } | { key: string, message: string, code: string } | { key: string, message: string, code: string } | { key: string, message: string, code: string }> }> };


export const ResetRoleReferrerDocument = gql`
    mutation ResetRoleReferrer($input: ResetRoleReferrerInput!) {
  resetRoleReferrer(input: $input) {
    role {
      ... on Talent {
        id
        fullName
        referrer {
          ...CommissionsRole
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
          ...CommissionsRole
        }
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
    ${CommissionsRoleFragmentDoc}
${WebResourceFragmentDoc}`;
export type ResetRoleReferrerMutationFn = Apollo.MutationFunction<ResetRoleReferrerMutation, ResetRoleReferrerMutationVariables>;

/**
 * __useResetRoleReferrerMutation__
 *
 * To run a mutation, you first call `useResetRoleReferrerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetRoleReferrerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetRoleReferrerMutation, { data, loading, error }] = useResetRoleReferrerMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useResetRoleReferrerMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ResetRoleReferrerMutation, ResetRoleReferrerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<ResetRoleReferrerMutation, ResetRoleReferrerMutationVariables>(ResetRoleReferrerDocument, options);
      }
export type ResetRoleReferrerMutationHookResult = ReturnType<typeof useResetRoleReferrerMutation>;
export type ResetRoleReferrerMutationResult = Apollo.MutationResult<ResetRoleReferrerMutation>;
export type ResetRoleReferrerMutationOptions = Apollo.BaseMutationOptions<ResetRoleReferrerMutation, ResetRoleReferrerMutationVariables>;