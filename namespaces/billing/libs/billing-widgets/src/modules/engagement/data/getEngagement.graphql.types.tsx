/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag';
disableFragmentWarnings();

import * as Types from '@staff-portal/graphql/staff';

import { PurchaseOrderFragment } from '../../__fragments__/purchaseOrderFragment.graphql.types';
import { OperationItemFragment } from '../../../../../billing/src/__fragments__/operationItemFragment.graphql.types';
import { gql } from '@apollo/client';
import { PurchaseOrderFragmentDoc } from '../../__fragments__/purchaseOrderFragment.graphql.types';
import { OperationItemFragmentDoc } from '../../../../../billing/src/__fragments__/operationItemFragment.graphql.types';
import * as Apollo from '@apollo/client';
import * as ApolloReactHooks from '@staff-portal/data-layer-service/src/hooks';
const defaultOptions =  {"throwOnError":true}
export type GetEngagementQueryVariables = Types.Exact<{
  engagementId: Types.Scalars['ID'];
}>;


export type GetEngagementQuery = { node?: Types.Maybe<{ billCycle?: Types.Maybe<Types.BillCycle>, billDay?: Types.Maybe<Types.WeekDay>, id: string, commitment: Types.EngagementCommitmentEnum, canBeDiscounted?: Types.Maybe<boolean>, companyFullTimeRate?: Types.Maybe<string>, companyHourlyRate?: Types.Maybe<string>, companyPartTimeRate?: Types.Maybe<string>, extraHoursEnabled?: Types.Maybe<boolean>, defaultFullTimeDiscount?: Types.Maybe<string>, defaultMarkup?: Types.Maybe<string>, defaultPartTimeDiscount?: Types.Maybe<string>, defaultUpcharge?: Types.Maybe<string>, discountMultiplier?: Types.Maybe<string>, fullTimeDiscount?: Types.Maybe<string>, markup?: Types.Maybe<string>, partTimeDiscount?: Types.Maybe<string>, rateMethod?: Types.Maybe<Types.EngagementRateMethodEnum>, rateOverrideReason?: Types.Maybe<string>, talentFullTimeRate?: Types.Maybe<string>, talentHourlyRate?: Types.Maybe<string>, talentPartTimeRate?: Types.Maybe<string>, semiMonthlyPaymentTalentAgreement?: Types.Maybe<boolean>, talent?: Types.Maybe<{ id: string, fullName: string }>, job?: Types.Maybe<{ autoConsolidationEnabled: boolean, title: string, id: string, jobType: string, client: { fullName: string, enterprise: boolean, id: string, netTerms: number, contact?: Types.Maybe<{ fullName: string, id: string }>, purchaseOrders?: Types.Maybe<{ nodes: Array<(
            { purchaseOrderLines: { nodes: Array<{ id: string, poLineNumber: string }> } }
            & PurchaseOrderFragment
          )> }> } }>, operations: { changeProductBillingFrequency: OperationItemFragment, changeEngagementCommitment: OperationItemFragment } }> };


export const GetEngagementDocument = gql`
    query GetEngagement($engagementId: ID!) {
  node(id: $engagementId) {
    ... on Engagement {
      billCycle
      billDay
      id
      commitment
      canBeDiscounted
      companyFullTimeRate
      companyHourlyRate
      companyPartTimeRate
      extraHoursEnabled
      defaultFullTimeDiscount
      defaultMarkup
      defaultPartTimeDiscount
      defaultUpcharge
      discountMultiplier
      fullTimeDiscount
      markup
      partTimeDiscount
      rateMethod
      rateOverrideReason
      talentFullTimeRate
      talentHourlyRate
      talentPartTimeRate
      talent {
        id
        fullName
      }
      job {
        autoConsolidationEnabled
        title
        id
        jobType
        client {
          fullName
          contact {
            fullName
            id
          }
          enterprise
          id
          netTerms
          purchaseOrders: purchaseOrdersNullable(filter: {assignable: true}) {
            nodes {
              ...PurchaseOrderFragment
              purchaseOrderLines(filter: {assignable: true}) {
                nodes {
                  id
                  poLineNumber
                }
              }
            }
          }
        }
      }
      semiMonthlyPaymentTalentAgreement
      operations {
        changeProductBillingFrequency {
          ...OperationItem
        }
        changeEngagementCommitment {
          ...OperationItem
        }
      }
    }
  }
}
    ${PurchaseOrderFragmentDoc}
${OperationItemFragmentDoc}`;

/**
 * __useGetEngagementQuery__
 *
 * To run a query within a React component, call `useGetEngagementQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEngagementQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEngagementQuery({
 *   variables: {
 *      engagementId: // value for 'engagementId'
 *   },
 * });
 */
export function useGetEngagementQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetEngagementQuery, GetEngagementQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetEngagementQuery, GetEngagementQueryVariables>(GetEngagementDocument, options);
      }
export function useGetEngagementLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetEngagementQuery, GetEngagementQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetEngagementQuery, GetEngagementQueryVariables>(GetEngagementDocument, options);
        }
export type GetEngagementQueryHookResult = ReturnType<typeof useGetEngagementQuery>;
export type GetEngagementLazyQueryHookResult = ReturnType<typeof useGetEngagementLazyQuery>;
export type GetEngagementQueryResult = Apollo.QueryResult<GetEngagementQuery, GetEngagementQueryVariables>;