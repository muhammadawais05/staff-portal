/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag';
disableFragmentWarnings();

import * as Types from '@staff-portal/graphql/staff';

import { MemorandumCategoryCommonFragment } from '../../../../__fragments__/memorandumCategoryCommon.graphql.types';
import { MemorandumItemFragment } from '../../../../__fragments__/memorandumFragment.graphql.types';
import { WebResourceFragment } from '../../../../../../../billing/src/__fragments__/webResourceFragment.graphql.types';
import { OperationItemFragment } from '../../../../../../../billing/src/__fragments__/operationItemFragment.graphql.types';
import { gql } from '@apollo/client';
import { MemorandumCategoryCommonFragmentDoc } from '../../../../__fragments__/memorandumCategoryCommon.graphql.types';
import { MemorandumItemFragmentDoc } from '../../../../__fragments__/memorandumFragment.graphql.types';
import { WebResourceFragmentDoc } from '../../../../../../../billing/src/__fragments__/webResourceFragment.graphql.types';
import { OperationItemFragmentDoc } from '../../../../../../../billing/src/__fragments__/operationItemFragment.graphql.types';
import * as Apollo from '@apollo/client';
import * as ApolloReactHooks from '@staff-portal/data-layer-service/src/hooks';
const defaultOptions =  {"throwOnError":true}
export type GetPaymentTaskCardQueryVariables = Types.Exact<{
  paymentId: Types.Scalars['ID'];
}>;


export type GetPaymentTaskCardQuery = { node?: Types.Maybe<{ id: string, status: Types.DocumentStatus, amount: string, balanceDue: string, createdOn: `${`${number}-${number}-${number}`}` | '', description?: Types.Maybe<string>, dueDate?: Types.Maybe<`${`${number}-${number}-${number}`}` | ''>, documentNumber: number, paymentKind: Types.PaymentKind, paymentMethod?: Types.Maybe<Types.PaymentOptionPaymentMethod>, memorandumCategories: { nodes: Array<MemorandumCategoryCommonFragment> }, memorandums: { nodes: Array<MemorandumItemFragment> }, operations: { addMemorandumToCommercialDocument: OperationItemFragment }, subjectObject: GetPaymentTaskCardSubjectObjectStaffFragment | GetPaymentTaskCardSubjectObjectTalentFragment, job?: Types.Maybe<{ id: string, webResource: WebResourceFragment }>, client?: Types.Maybe<{ id: string, webResource: WebResourceFragment }>, paymentGroup?: Types.Maybe<{ id: string, number: number, webResource: WebResourceFragment }>, webResource: WebResourceFragment }> };

export type GetPaymentTaskCardSubjectObjectStaffFragment = { id: string, fullName: string, webResource: WebResourceFragment };

export type GetPaymentTaskCardSubjectObjectTalentFragment = { id: string, fullName: string, activePaymentHold?: Types.Maybe<{ amountThreshold?: Types.Maybe<string>, dateThreshold?: Types.Maybe<`${`${number}-${number}-${number}`}` | ''>, creationReason?: Types.Maybe<string> }>, webResource: WebResourceFragment };

export const GetPaymentTaskCardSubjectObjectStaffFragmentDoc = gql`
    fragment GetPaymentTaskCardSubjectObjectStaff on Staff {
  id
  fullName
  webResource {
    ...WebResourceFragment
  }
}
    ${WebResourceFragmentDoc}`;
export const GetPaymentTaskCardSubjectObjectTalentFragmentDoc = gql`
    fragment GetPaymentTaskCardSubjectObjectTalent on Talent {
  id
  fullName
  activePaymentHold {
    amountThreshold
    dateThreshold
    creationReason
  }
  webResource {
    ...WebResourceFragment
  }
}
    ${WebResourceFragmentDoc}`;
export const GetPaymentTaskCardDocument = gql`
    query GetPaymentTaskCard($paymentId: ID!) {
  node(id: $paymentId) {
    ... on Payment {
      id
      status
      amount
      balanceDue
      createdOn
      description
      dueDate
      documentNumber
      paymentKind
      memorandumCategories {
        nodes {
          ...MemorandumCategoryCommon
        }
      }
      memorandums {
        nodes {
          ...MemorandumItem
        }
      }
      operations {
        addMemorandumToCommercialDocument {
          ...OperationItem
        }
      }
      subjectObject {
        ... on Staff {
          ...GetPaymentTaskCardSubjectObjectStaff
        }
        ... on Talent {
          ...GetPaymentTaskCardSubjectObjectTalent
        }
      }
      job {
        id
        webResource {
          ...WebResourceFragment
        }
      }
      client {
        id
        webResource {
          ...WebResourceFragment
        }
      }
      paymentMethod
      paymentGroup {
        id
        number
        webResource {
          ...WebResourceFragment
        }
      }
      webResource {
        ...WebResourceFragment
      }
    }
  }
}
    ${MemorandumCategoryCommonFragmentDoc}
${MemorandumItemFragmentDoc}
${OperationItemFragmentDoc}
${GetPaymentTaskCardSubjectObjectStaffFragmentDoc}
${GetPaymentTaskCardSubjectObjectTalentFragmentDoc}
${WebResourceFragmentDoc}`;

/**
 * __useGetPaymentTaskCardQuery__
 *
 * To run a query within a React component, call `useGetPaymentTaskCardQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPaymentTaskCardQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPaymentTaskCardQuery({
 *   variables: {
 *      paymentId: // value for 'paymentId'
 *   },
 * });
 */
export function useGetPaymentTaskCardQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetPaymentTaskCardQuery, GetPaymentTaskCardQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetPaymentTaskCardQuery, GetPaymentTaskCardQueryVariables>(GetPaymentTaskCardDocument, options);
      }
export function useGetPaymentTaskCardLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetPaymentTaskCardQuery, GetPaymentTaskCardQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetPaymentTaskCardQuery, GetPaymentTaskCardQueryVariables>(GetPaymentTaskCardDocument, options);
        }
export type GetPaymentTaskCardQueryHookResult = ReturnType<typeof useGetPaymentTaskCardQuery>;
export type GetPaymentTaskCardLazyQueryHookResult = ReturnType<typeof useGetPaymentTaskCardLazyQuery>;
export type GetPaymentTaskCardQueryResult = Apollo.QueryResult<GetPaymentTaskCardQuery, GetPaymentTaskCardQueryVariables>;