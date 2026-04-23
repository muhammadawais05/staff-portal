/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag';
disableFragmentWarnings();

import * as Types from '@staff-portal/graphql/staff';

import { WebResourceFragment } from '../../../../../billing/src/__fragments__/webResourceFragment.graphql.types';
import { gql } from '@apollo/client';
import { WebResourceFragmentDoc } from '../../../../../billing/src/__fragments__/webResourceFragment.graphql.types';
import * as Apollo from '@apollo/client';
import * as ApolloReactHooks from '@staff-portal/data-layer-service/src/hooks';
const defaultOptions =  {"throwOnError":true}
export type OverviewInvoicesQueryVariables = Types.Exact<{
  accessLevel: Types.Scalars['AccessLevelFilter'];
  sinceDate: Types.Scalars['String'];
  timesheetsSinceDate?: Types.Maybe<Types.Scalars['Date']>;
}>;


export type OverviewInvoicesQuery = { overview: { invoicesOverview?: Types.Maybe<{ paid: string, disputed: string, overdue: string, outstanding: string }>, invoicesDisputed?: Types.Maybe<{ nodes: Array<{ id: string, dueDate?: Types.Maybe<`${`${number}-${number}-${number}`}` | ''>, issueDate?: Types.Maybe<`${`${number}-${number}-${number}`}` | ''>, amount: string, subject: { netTerms: number, contact?: Types.Maybe<{ webResource: WebResourceFragment }>, webResource: WebResourceFragment }, job?: Types.Maybe<{ webResource: WebResourceFragment }> }> }>, invoicesOverdue?: Types.Maybe<{ nodes: Array<{ id: string, dueDate?: Types.Maybe<`${`${number}-${number}-${number}`}` | ''>, issueDate?: Types.Maybe<`${`${number}-${number}-${number}`}` | ''>, amount: string, subject: { netTerms: number, contact?: Types.Maybe<{ webResource: WebResourceFragment }>, webResource: WebResourceFragment }, job?: Types.Maybe<{ webResource: WebResourceFragment }> }> }>, purchaseOrdersExpiration?: Types.Maybe<{ nodes: Array<{ id: string, expiryDate?: Types.Maybe<`${`${number}-${number}-${number}`}` | ''>, totalAmount?: Types.Maybe<string>, invoicedAmount: string, budgetSpent: boolean, threshold?: Types.Maybe<string>, client: { webResource: WebResourceFragment }, webResource: WebResourceFragment }> }>, purchaseOrdersLimit?: Types.Maybe<{ nodes: Array<{ id: string, expiryDate?: Types.Maybe<`${`${number}-${number}-${number}`}` | ''>, totalAmount?: Types.Maybe<string>, invoicedAmount: string, budgetSpent: boolean, threshold?: Types.Maybe<string>, client: { webResource: WebResourceFragment }, webResource: WebResourceFragment }> }>, timesheets?: Types.Maybe<{ nodes: Array<{ id: string, dueDate: `${`${number}-${number}-${number}`}` | '', client: { webResource: WebResourceFragment }, job: { webResource: WebResourceFragment }, talent: { webResource: WebResourceFragment }, recruiter: { webResource: (
            { __typename: 'Link' }
            & WebResourceFragment
          ) } }> }> } };


export const OverviewInvoicesDocument = gql`
    query OverviewInvoices($accessLevel: AccessLevelFilter!, $sinceDate: String!, $timesheetsSinceDate: Date) {
  overview {
    invoicesOverview(filter: {accessLevel: $accessLevel, sinceDate: $sinceDate}) {
      paid
      disputed
      overdue
      outstanding
    }
    invoicesDisputed: invoices(
      filter: {accessLevel: $accessLevel, status: "disputed"}
      order: {direction: DESC, field: LAST_STATUS_CHANGE_AT}
      pagination: {limit: 5, offset: 0}
    ) {
      nodes {
        id
        subject {
          contact {
            webResource {
              ...WebResourceFragment
            }
          }
          netTerms
          webResource {
            ...WebResourceFragment
          }
        }
        job {
          webResource {
            ...WebResourceFragment
          }
        }
        dueDate
        issueDate
        amount
      }
    }
    invoicesOverdue: invoices(
      filter: {accessLevel: $accessLevel, status: "overdue"}
      order: {direction: ASC, field: LAST_STATUS_CHANGE_AT}
      pagination: {limit: 5, offset: 0}
    ) {
      nodes {
        id
        subject {
          contact {
            webResource {
              ...WebResourceFragment
            }
          }
          netTerms
          webResource {
            ...WebResourceFragment
          }
        }
        job {
          webResource {
            ...WebResourceFragment
          }
        }
        dueDate
        issueDate
        amount
      }
    }
    purchaseOrdersExpiration: purchaseOrders(
      filter: {accessLevel: $accessLevel, type: "expiredAboveOneMonth"}
      order: {direction: ASC, field: EXPIRES_ON}
      pagination: {limit: 5, offset: 0}
    ) {
      nodes {
        id
        client {
          webResource {
            ...WebResourceFragment
          }
        }
        expiryDate
        totalAmount
        invoicedAmount
        budgetSpent
        threshold
        webResource {
          ...WebResourceFragment
        }
      }
    }
    purchaseOrdersLimit: purchaseOrders(
      filter: {accessLevel: $accessLevel, type: "withAmount"}
      order: {direction: ASC, field: AMOUNT_LEFT}
      pagination: {limit: 5, offset: 0}
    ) {
      nodes {
        id
        client {
          webResource {
            ...WebResourceFragment
          }
        }
        expiryDate
        totalAmount
        invoicedAmount
        budgetSpent
        threshold
        webResource {
          ...WebResourceFragment
        }
      }
    }
    timesheets(
      filter: {accessLevel: $accessLevel, type: "overdue", sinceDate: $timesheetsSinceDate}
      order: {direction: ASC, field: DUE_DATE}
      pagination: {limit: 5, offset: 0}
    ) {
      nodes {
        id
        dueDate
        client {
          webResource {
            ...WebResourceFragment
          }
        }
        job {
          webResource {
            ...WebResourceFragment
          }
        }
        talent {
          webResource {
            ...WebResourceFragment
          }
        }
        recruiter {
          ... on Staff {
            webResource {
              ...WebResourceFragment
              __typename
            }
          }
        }
      }
    }
  }
}
    ${WebResourceFragmentDoc}`;

/**
 * __useOverviewInvoicesQuery__
 *
 * To run a query within a React component, call `useOverviewInvoicesQuery` and pass it any options that fit your needs.
 * When your component renders, `useOverviewInvoicesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOverviewInvoicesQuery({
 *   variables: {
 *      accessLevel: // value for 'accessLevel'
 *      sinceDate: // value for 'sinceDate'
 *      timesheetsSinceDate: // value for 'timesheetsSinceDate'
 *   },
 * });
 */
export function useOverviewInvoicesQuery(baseOptions: ApolloReactHooks.QueryHookOptions<OverviewInvoicesQuery, OverviewInvoicesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<OverviewInvoicesQuery, OverviewInvoicesQueryVariables>(OverviewInvoicesDocument, options);
      }
export function useOverviewInvoicesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<OverviewInvoicesQuery, OverviewInvoicesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<OverviewInvoicesQuery, OverviewInvoicesQueryVariables>(OverviewInvoicesDocument, options);
        }
export type OverviewInvoicesQueryHookResult = ReturnType<typeof useOverviewInvoicesQuery>;
export type OverviewInvoicesLazyQueryHookResult = ReturnType<typeof useOverviewInvoicesLazyQuery>;
export type OverviewInvoicesQueryResult = Apollo.QueryResult<OverviewInvoicesQuery, OverviewInvoicesQueryVariables>;