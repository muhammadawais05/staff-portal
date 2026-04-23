/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag';
disableFragmentWarnings();

import * as Types from '@staff-portal/graphql/staff';

import { UserErrorFragment_AssignScreeningSpecialistsError_, UserErrorFragment_P2PStandardUserError_, UserErrorFragment_SpecialistAssignmentBulkActionError_, UserErrorFragment_StandardUserError_, UserErrorFragment_TopcallUserError_ } from '../../../../__fragments__/userErrorFragment.graphql.types';
import { CommissionsRole_Client_Fragment, CommissionsRole_CompanyRepresentative_Fragment, CommissionsRole_Leader_Fragment, CommissionsRole_ReferralPartner_Fragment, CommissionsRole_Staff_Fragment, CommissionsRole_Talent_Fragment, CommissionsRole_TalentPartner_Fragment } from '../../../../__fragments__/commissionsRoleFragment.graphql.types';
import { gql } from '@apollo/client';
import { UserErrorFragmentDoc } from '../../../../__fragments__/userErrorFragment.graphql.types';
import { CommissionsRoleFragmentDoc } from '../../../../__fragments__/commissionsRoleFragment.graphql.types';
import * as Apollo from '@apollo/client';
import * as ApolloReactHooks from '@staff-portal/data-layer-service/src/hooks';
const defaultOptions =  {"throwOnError":true}
export type SetUpdateClientClaimerMutationVariables = Types.Exact<{
  input: Types.UpdateClientClaimerInput;
}>;


export type SetUpdateClientClaimerMutation = { updateClientClaimer?: Types.Maybe<{ success: boolean, nextActionPerformable?: Types.Maybe<boolean>, errors: Array<UserErrorFragment_AssignScreeningSpecialistsError_ | UserErrorFragment_P2PStandardUserError_ | UserErrorFragment_SpecialistAssignmentBulkActionError_ | UserErrorFragment_StandardUserError_ | UserErrorFragment_TopcallUserError_>, client?: Types.Maybe<{ id: string, claimer?: Types.Maybe<CommissionsRole_Staff_Fragment> }> }> };


export const SetUpdateClientClaimerDocument = gql`
    mutation SetUpdateClientClaimer($input: UpdateClientClaimerInput!) {
  updateClientClaimer(input: $input) {
    success
    errors {
      ...UserErrorFragment
    }
    client {
      id
      claimer {
        ...CommissionsRole
      }
    }
    nextActionPerformable
  }
}
    ${UserErrorFragmentDoc}
${CommissionsRoleFragmentDoc}`;
export type SetUpdateClientClaimerMutationFn = Apollo.MutationFunction<SetUpdateClientClaimerMutation, SetUpdateClientClaimerMutationVariables>;

/**
 * __useSetUpdateClientClaimerMutation__
 *
 * To run a mutation, you first call `useSetUpdateClientClaimerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetUpdateClientClaimerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setUpdateClientClaimerMutation, { data, loading, error }] = useSetUpdateClientClaimerMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSetUpdateClientClaimerMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SetUpdateClientClaimerMutation, SetUpdateClientClaimerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<SetUpdateClientClaimerMutation, SetUpdateClientClaimerMutationVariables>(SetUpdateClientClaimerDocument, options);
      }
export type SetUpdateClientClaimerMutationHookResult = ReturnType<typeof useSetUpdateClientClaimerMutation>;
export type SetUpdateClientClaimerMutationResult = Apollo.MutationResult<SetUpdateClientClaimerMutation>;
export type SetUpdateClientClaimerMutationOptions = Apollo.BaseMutationOptions<SetUpdateClientClaimerMutation, SetUpdateClientClaimerMutationVariables>;