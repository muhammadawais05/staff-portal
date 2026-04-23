/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag';
disableFragmentWarnings();

import * as Types from '@staff-portal/graphql/staff';

import { CommissionsRole_Client_Fragment, CommissionsRole_CompanyRepresentative_Fragment, CommissionsRole_Leader_Fragment, CommissionsRole_ReferralPartner_Fragment, CommissionsRole_Staff_Fragment, CommissionsRole_Talent_Fragment, CommissionsRole_TalentPartner_Fragment } from '../../__fragments__/commissionsRoleFragment.graphql.types';
import { WebResourceFragment } from '../../../../../billing/src/__fragments__/webResourceFragment.graphql.types';
import { OperationItemFragment } from '../../../../../billing/src/__fragments__/operationItemFragment.graphql.types';
import { gql } from '@apollo/client';
import { CommissionsRoleFragmentDoc } from '../../__fragments__/commissionsRoleFragment.graphql.types';
import { WebResourceFragmentDoc } from '../../../../../billing/src/__fragments__/webResourceFragment.graphql.types';
import { OperationItemFragmentDoc } from '../../../../../billing/src/__fragments__/operationItemFragment.graphql.types';
import * as Apollo from '@apollo/client';
import * as ApolloReactHooks from '@staff-portal/data-layer-service/src/hooks';
const defaultOptions =  {"throwOnError":true}
export type GetCommissionQueryVariables = Types.Exact<{
  nodeId: Types.Scalars['ID'];
}>;


export type GetCommissionQuery = { node?: Types.Maybe<ClientCommissionFragment | TalentCommissionFragment> };

export type TalentCommissionFragment = { id: string, canIssueSourcingCommission?: Types.Maybe<boolean>, commissions?: Types.Maybe<{ commissionsPot: number, referralCommission?: Types.Maybe<{ commission: string } | { ratePercent: string }> }>, referrer?: Types.Maybe<CommissionsRole_Client_Fragment | CommissionsRole_CompanyRepresentative_Fragment | CommissionsRole_Leader_Fragment | CommissionsRole_ReferralPartner_Fragment | CommissionsRole_Staff_Fragment | CommissionsRole_Talent_Fragment | CommissionsRole_TalentPartner_Fragment> };

export type ClientCommissionFragment = { id: string, canIssueSourcingCommission?: Types.Maybe<boolean>, commissions?: Types.Maybe<{ commissionsPot: number, referralCommission?: Types.Maybe<{ commission: string } | { ratePercent: string }> }>, referrer?: Types.Maybe<CommissionsRole_Client_Fragment | CommissionsRole_CompanyRepresentative_Fragment | CommissionsRole_Leader_Fragment | CommissionsRole_ReferralPartner_Fragment | CommissionsRole_Staff_Fragment | CommissionsRole_Talent_Fragment | CommissionsRole_TalentPartner_Fragment>, claimer?: Types.Maybe<CommissionsRole_Staff_Fragment>, commissionReceiver?: Types.Maybe<{ id: string, fullName: string, webResource: WebResourceFragment } | { id: string, fullName: string, webResource: WebResourceFragment } | { id: string, fullName: string, webResource: WebResourceFragment } | { id: string, fullName: string, webResource: WebResourceFragment } | { id: string, fullName: string, webResource: WebResourceFragment } | { id: string, fullName: string, webResource: WebResourceFragment }>, operations: { changeRoleReferrer: OperationItemFragment, updateClientClaimer: OperationItemFragment } };

export const TalentCommissionFragmentDoc = gql`
    fragment TalentCommission on Talent {
  id
  commissions {
    commissionsPot
    referralCommission: referralCommissionV2 {
      ... on FixedSourcingCommission {
        commission
      }
      ... on RelativeSourcingCommission {
        ratePercent
      }
    }
  }
  canIssueSourcingCommission
  referrer {
    ...CommissionsRole
  }
}
    ${CommissionsRoleFragmentDoc}`;
export const ClientCommissionFragmentDoc = gql`
    fragment ClientCommission on Client {
  id
  commissions {
    commissionsPot
    referralCommission: referralCommissionV2 {
      ... on FixedSourcingCommission {
        commission
      }
      ... on RelativeSourcingCommission {
        ratePercent
      }
    }
  }
  canIssueSourcingCommission
  referrer {
    ...CommissionsRole
  }
  claimer {
    ...CommissionsRole
  }
  commissionReceiver {
    ... on Role {
      id
      fullName
    }
    ... on WebResource {
      webResource {
        ...WebResourceFragment
      }
    }
  }
  operations {
    changeRoleReferrer {
      ...OperationItem
    }
    updateClientClaimer {
      ...OperationItem
    }
  }
}
    ${CommissionsRoleFragmentDoc}
${WebResourceFragmentDoc}
${OperationItemFragmentDoc}`;
export const GetCommissionDocument = gql`
    query GetCommission($nodeId: ID!) {
  node(id: $nodeId) {
    ... on Talent {
      ...TalentCommission
    }
    ... on Client {
      ...ClientCommission
    }
  }
}
    ${TalentCommissionFragmentDoc}
${ClientCommissionFragmentDoc}`;

/**
 * __useGetCommissionQuery__
 *
 * To run a query within a React component, call `useGetCommissionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCommissionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCommissionQuery({
 *   variables: {
 *      nodeId: // value for 'nodeId'
 *   },
 * });
 */
export function useGetCommissionQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetCommissionQuery, GetCommissionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetCommissionQuery, GetCommissionQueryVariables>(GetCommissionDocument, options);
      }
export function useGetCommissionLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetCommissionQuery, GetCommissionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetCommissionQuery, GetCommissionQueryVariables>(GetCommissionDocument, options);
        }
export type GetCommissionQueryHookResult = ReturnType<typeof useGetCommissionQuery>;
export type GetCommissionLazyQueryHookResult = ReturnType<typeof useGetCommissionLazyQuery>;
export type GetCommissionQueryResult = Apollo.QueryResult<GetCommissionQuery, GetCommissionQueryVariables>;