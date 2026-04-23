/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag';
disableFragmentWarnings();

import * as Types from '@staff-portal/graphql/staff';

import { OperationItemFragment } from '../../../../../../../billing/src/__fragments__/operationItemFragment.graphql.types';
import { BillingOptionFragment_AchBillingOption_, BillingOptionFragment_CreditCardBillingOption_, BillingOptionFragment_OtherBillingOption_, BillingOptionFragment_PaypalBillingOption_, BillingOptionFragment_WireBillingOption_ } from '../../../../__fragments__/billingOptionFragment.graphql.types';
import { WebResourceFragment } from '../../../../../../../billing/src/__fragments__/webResourceFragment.graphql.types';
import { gql } from '@apollo/client';
import { OperationItemFragmentDoc } from '../../../../../../../billing/src/__fragments__/operationItemFragment.graphql.types';
import { BillingOptionFragmentDoc } from '../../../../__fragments__/billingOptionFragment.graphql.types';
import { WebResourceFragmentDoc } from '../../../../../../../billing/src/__fragments__/webResourceFragment.graphql.types';
import * as Apollo from '@apollo/client';
import * as ApolloReactHooks from '@staff-portal/data-layer-service/src/hooks';
const defaultOptions =  {"throwOnError":true}
export type GetInvoiceTaskCardQueryVariables = Types.Exact<{
  invoiceId: Types.Scalars['ID'];
}>;


export type GetInvoiceTaskCardQuery = { node?: Types.Maybe<{ id: string, status: Types.DocumentStatus, amount: string, balanceDue: string, createdOn: `${`${number}-${number}-${number}`}` | '', description?: Types.Maybe<string>, documentNumber: number, discountedAmount: string, dueDate?: Types.Maybe<`${`${number}-${number}-${number}`}` | ''>, invoiceKind: Types.InvoiceKind, duePeriod: number, partiallyPaid: boolean, discountApplied: boolean, cleanOutstandingAmount?: Types.Maybe<string>, operations: { addMemorandumToCommercialDocument: OperationItemFragment, createTransferInvoice: OperationItemFragment }, subjectObject: { id: string, fullName: string, preferredBillingOption?: Types.Maybe<BillingOptionFragment_AchBillingOption_ | BillingOptionFragment_CreditCardBillingOption_ | BillingOptionFragment_OtherBillingOption_ | BillingOptionFragment_PaypalBillingOption_ | BillingOptionFragment_WireBillingOption_>, claimer?: Types.Maybe<{ id: string, fullName: string, webResource: WebResourceFragment }>, matchers?: Types.Maybe<{ nodes: Array<{ id: string, role: { id: string, fullName: string, webResource: WebResourceFragment }, vertical: { id: string, talentType: string } }> }>, webResource: WebResourceFragment }, consolidatedDocument?: Types.Maybe<{ id: string, webResource: WebResourceFragment } | { id: string }>, job?: Types.Maybe<{ id: string, hiredCount?: Types.Maybe<number>, cumulativeStatus?: Types.Maybe<Types.CumulativeJobStatus>, matcherCallScheduled?: Types.Maybe<boolean>, talentCount?: Types.Maybe<number>, status?: Types.Maybe<Types.JobStatus>, currentInvestigation?: Types.Maybe<{ id: string, startedAt: `${`${number}-${number}-${number}T${number}:${number}:${number}${string}`}` | '' }>, webResource: WebResourceFragment }>, webResource: WebResourceFragment }> };


export const GetInvoiceTaskCardDocument = gql`
    query GetInvoiceTaskCard($invoiceId: ID!) {
  node(id: $invoiceId) {
    ... on Invoice {
      id
      status
      amount
      balanceDue
      createdOn
      description
      documentNumber
      discountedAmount
      dueDate
      invoiceKind
      duePeriod
      partiallyPaid
      discountApplied
      cleanOutstandingAmount
      operations {
        addMemorandumToCommercialDocument {
          ...OperationItem
        }
        createTransferInvoice {
          ...OperationItem
        }
      }
      subjectObject {
        id
        preferredBillingOption {
          ...BillingOptionFragment
        }
        claimer {
          id
          fullName
          webResource {
            ...WebResourceFragment
          }
        }
        matchers {
          nodes {
            id
            role {
              id
              fullName
              webResource {
                ...WebResourceFragment
              }
            }
            vertical {
              id
              talentType
            }
          }
        }
        fullName
        webResource {
          ...WebResourceFragment
        }
      }
      consolidatedDocument {
        id
        ... on Invoice {
          webResource {
            ...WebResourceFragment
          }
        }
      }
      job {
        id
        currentInvestigation {
          id
          startedAt
        }
        hiredCount
        cumulativeStatus
        matcherCallScheduled
        talentCount
        status
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
    ${OperationItemFragmentDoc}
${BillingOptionFragmentDoc}
${WebResourceFragmentDoc}`;

/**
 * __useGetInvoiceTaskCardQuery__
 *
 * To run a query within a React component, call `useGetInvoiceTaskCardQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInvoiceTaskCardQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInvoiceTaskCardQuery({
 *   variables: {
 *      invoiceId: // value for 'invoiceId'
 *   },
 * });
 */
export function useGetInvoiceTaskCardQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetInvoiceTaskCardQuery, GetInvoiceTaskCardQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetInvoiceTaskCardQuery, GetInvoiceTaskCardQueryVariables>(GetInvoiceTaskCardDocument, options);
      }
export function useGetInvoiceTaskCardLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetInvoiceTaskCardQuery, GetInvoiceTaskCardQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetInvoiceTaskCardQuery, GetInvoiceTaskCardQueryVariables>(GetInvoiceTaskCardDocument, options);
        }
export type GetInvoiceTaskCardQueryHookResult = ReturnType<typeof useGetInvoiceTaskCardQuery>;
export type GetInvoiceTaskCardLazyQueryHookResult = ReturnType<typeof useGetInvoiceTaskCardLazyQuery>;
export type GetInvoiceTaskCardQueryResult = Apollo.QueryResult<GetInvoiceTaskCardQuery, GetInvoiceTaskCardQueryVariables>;