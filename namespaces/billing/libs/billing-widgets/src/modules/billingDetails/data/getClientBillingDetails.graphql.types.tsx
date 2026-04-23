/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag';
disableFragmentWarnings();

import * as Types from '@staff-portal/graphql/staff';

import { JobTemplateFragment } from '../../__fragments__/jobTemplateFragment.graphql.types';
import { OperationItemFragment } from '../../../../../billing/src/__fragments__/operationItemFragment.graphql.types';
import { BillingOptionFragment_AchBillingOption_, BillingOptionFragment_CreditCardBillingOption_, BillingOptionFragment_OtherBillingOption_, BillingOptionFragment_PaypalBillingOption_, BillingOptionFragment_WireBillingOption_ } from '../../__fragments__/billingOptionFragment.graphql.types';
import { gql } from '@apollo/client';
import { JobTemplateFragmentDoc } from '../../__fragments__/jobTemplateFragment.graphql.types';
import { OperationItemFragmentDoc } from '../../../../../billing/src/__fragments__/operationItemFragment.graphql.types';
import { BillingOptionFragmentDoc } from '../../__fragments__/billingOptionFragment.graphql.types';
import * as Apollo from '@apollo/client';
import * as ApolloReactHooks from '@staff-portal/data-layer-service/src/hooks';
const defaultOptions =  {"throwOnError":true}
export type GetClientBillingDetailsQueryVariables = Types.Exact<{
  clientId: Types.Scalars['ID'];
}>;


export type GetClientBillingDetailsQuery = { node?: Types.Maybe<{ id: string, _companyId?: Types.Maybe<number>, fullName: string, billingAddress?: Types.Maybe<string>, billingName?: Types.Maybe<string>, billingCity?: Types.Maybe<string>, billingZip?: Types.Maybe<string>, billingState?: Types.Maybe<string>, billingPhone?: Types.Maybe<string>, billingNotes?: Types.Maybe<string>, netTerms: number, enterprise: boolean, collectionSpeed?: Types.Maybe<Types.ClientCollectionSpeed>, notifyAboutNewInvoices?: Types.Maybe<boolean>, autoAllocateMemos?: Types.Maybe<boolean>, attachTimesheetsToInvoices?: Types.Maybe<boolean>, investmentGrade?: Types.Maybe<boolean>, invoices?: Types.Maybe<{ totalCount: number }>, billingCountry?: Types.Maybe<{ name: string }>, billingOptions: { nodes: Array<ClientBillingDetailsBillingOptions_AchBillingOption_Fragment | ClientBillingDetailsBillingOptions_CreditCardBillingOption_Fragment | ClientBillingDetailsBillingOptions_OtherBillingOption_Fragment | ClientBillingDetailsBillingOptions_PaypalBillingOption_Fragment | ClientBillingDetailsBillingOptions_WireBillingOption_Fragment> }, commitmentSettings?: Types.Maybe<{ minimumHours: number }>, jobTemplate?: Types.Maybe<JobTemplateFragment>, operations: { updateBillingNotes: OperationItemFragment, updateClientAttachTimesheetsToInvoices: OperationItemFragment, updateClientAutoAllocateMemos: OperationItemFragment, updateClientBillingAddress: OperationItemFragment, updateClientCommitment: OperationItemFragment, updateClientNetTerms: OperationItemFragment, updateClientCollectionSpeed: OperationItemFragment, updateClientNotifyAboutNewInvoices: OperationItemFragment, updateClientInvestmentGrade: OperationItemFragment, downloadClientBillingReport: OperationItemFragment, createJobTemplate: OperationItemFragment } }>, viewer: { permits: { canManageBillingOptions: boolean } } };

export type ClientBillingDetailsBillingOptions_AchBillingOption_Fragment = (
  { isLastPullMethod?: Types.Maybe<boolean> }
  & BillingOptionFragment_AchBillingOption_
);

export type ClientBillingDetailsBillingOptions_CreditCardBillingOption_Fragment = (
  { isLastPullMethod?: Types.Maybe<boolean> }
  & BillingOptionFragment_CreditCardBillingOption_
);

export type ClientBillingDetailsBillingOptions_OtherBillingOption_Fragment = (
  { isLastPullMethod?: Types.Maybe<boolean> }
  & BillingOptionFragment_OtherBillingOption_
);

export type ClientBillingDetailsBillingOptions_PaypalBillingOption_Fragment = (
  { isLastPullMethod?: Types.Maybe<boolean> }
  & BillingOptionFragment_PaypalBillingOption_
);

export type ClientBillingDetailsBillingOptions_WireBillingOption_Fragment = (
  { isLastPullMethod?: Types.Maybe<boolean> }
  & BillingOptionFragment_WireBillingOption_
);

export type ClientBillingDetailsBillingOptionsFragment = ClientBillingDetailsBillingOptions_AchBillingOption_Fragment | ClientBillingDetailsBillingOptions_CreditCardBillingOption_Fragment | ClientBillingDetailsBillingOptions_OtherBillingOption_Fragment | ClientBillingDetailsBillingOptions_PaypalBillingOption_Fragment | ClientBillingDetailsBillingOptions_WireBillingOption_Fragment;

export const ClientBillingDetailsBillingOptionsFragmentDoc = gql`
    fragment ClientBillingDetailsBillingOptions on BillingOptionInterface {
  ...BillingOptionFragment
  isLastPullMethod
}
    ${BillingOptionFragmentDoc}`;
export const GetClientBillingDetailsDocument = gql`
    query GetClientBillingDetails($clientId: ID!) {
  node(id: $clientId) {
    ... on Client {
      id
      _companyId
      fullName
      invoices(filter: {statuses: []}, pagination: {offset: 0, limit: 1}) {
        totalCount
      }
      billingAddress
      billingName
      billingCity
      billingZip
      billingState
      billingCountry {
        name
      }
      billingPhone
      billingNotes
      billingOptions(filter: {scope: ALL}) {
        nodes {
          ...ClientBillingDetailsBillingOptions
        }
      }
      netTerms
      enterprise
      collectionSpeed
      notifyAboutNewInvoices
      autoAllocateMemos
      attachTimesheetsToInvoices
      investmentGrade
      commitmentSettings {
        minimumHours
      }
      jobTemplate {
        ...JobTemplateFragment
      }
      operations {
        updateBillingNotes {
          ...OperationItem
        }
        updateClientAttachTimesheetsToInvoices {
          ...OperationItem
        }
        updateClientAutoAllocateMemos {
          ...OperationItem
        }
        updateClientBillingAddress {
          ...OperationItem
        }
        updateClientCommitment {
          ...OperationItem
        }
        updateClientNetTerms {
          ...OperationItem
        }
        updateClientCollectionSpeed {
          ...OperationItem
        }
        updateClientNotifyAboutNewInvoices {
          ...OperationItem
        }
        updateClientInvestmentGrade {
          ...OperationItem
        }
        downloadClientBillingReport {
          ...OperationItem
        }
        createJobTemplate {
          ...OperationItem
        }
      }
    }
  }
  viewer {
    permits {
      canManageBillingOptions
    }
  }
}
    ${ClientBillingDetailsBillingOptionsFragmentDoc}
${JobTemplateFragmentDoc}
${OperationItemFragmentDoc}`;

/**
 * __useGetClientBillingDetailsQuery__
 *
 * To run a query within a React component, call `useGetClientBillingDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetClientBillingDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetClientBillingDetailsQuery({
 *   variables: {
 *      clientId: // value for 'clientId'
 *   },
 * });
 */
export function useGetClientBillingDetailsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetClientBillingDetailsQuery, GetClientBillingDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetClientBillingDetailsQuery, GetClientBillingDetailsQueryVariables>(GetClientBillingDetailsDocument, options);
      }
export function useGetClientBillingDetailsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetClientBillingDetailsQuery, GetClientBillingDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetClientBillingDetailsQuery, GetClientBillingDetailsQueryVariables>(GetClientBillingDetailsDocument, options);
        }
export type GetClientBillingDetailsQueryHookResult = ReturnType<typeof useGetClientBillingDetailsQuery>;
export type GetClientBillingDetailsLazyQueryHookResult = ReturnType<typeof useGetClientBillingDetailsLazyQuery>;
export type GetClientBillingDetailsQueryResult = Apollo.QueryResult<GetClientBillingDetailsQuery, GetClientBillingDetailsQueryVariables>;