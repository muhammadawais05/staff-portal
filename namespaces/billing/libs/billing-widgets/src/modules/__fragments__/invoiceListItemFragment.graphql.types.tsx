/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag';
disableFragmentWarnings();

import * as Types from '@staff-portal/graphql/staff';

import { OperationItemFragment } from '../../../../billing/src/__fragments__/operationItemFragment.graphql.types';
import { WebResourceFragment } from '../../../../billing/src/__fragments__/webResourceFragment.graphql.types';
import { BillingOptionFragment_AchBillingOption_, BillingOptionFragment_CreditCardBillingOption_, BillingOptionFragment_OtherBillingOption_, BillingOptionFragment_PaypalBillingOption_, BillingOptionFragment_WireBillingOption_ } from './billingOptionFragment.graphql.types';
import { gql } from '@apollo/client';
import { OperationItemFragmentDoc } from '../../../../billing/src/__fragments__/operationItemFragment.graphql.types';
import { WebResourceFragmentDoc } from '../../../../billing/src/__fragments__/webResourceFragment.graphql.types';
import { BillingOptionFragmentDoc } from './billingOptionFragment.graphql.types';
export type InvoiceListItemFragment = { amount: string, listedAmount: string, actionDueOn?: Types.Maybe<`${`${number}-${number}-${number}`}` | ''>, cleanOutstandingAmount?: Types.Maybe<string>, description?: Types.Maybe<string>, longDescription?: Types.Maybe<Array<string>>, discountApplied: boolean, discountedAmount: string, statusComment?: Types.Maybe<string>, documentNumber: number, id: string, invoiceKind: Types.InvoiceKind, unconsolidated: boolean, issueDate?: Types.Maybe<`${`${number}-${number}-${number}`}` | ''>, dueDate?: Types.Maybe<`${`${number}-${number}-${number}`}` | ''>, creditedAmount: string, status: Types.DocumentStatus, paidAmount: string, paidAt?: Types.Maybe<`${`${number}-${number}-${number}T${number}:${number}:${number}${string}`}` | ''>, processingDate?: Types.Maybe<`${`${number}-${number}-${number}`}` | ''>, partiallyPaid: boolean, hasPendingCharges: boolean, consolidatedDocument?: Types.Maybe<{ id: string } | { id: string }>, operations: { createTransferInvoice: OperationItemFragment }, range?: Types.Maybe<{ from: `${`${number}-${number}-${number}`}` | '', till: `${`${number}-${number}-${number}`}` | '' }>, reason?: Types.Maybe<{ id: string, placementFees?: Types.Maybe<{ totalCount: number }> }>, webResource: WebResourceFragment, subjectObject: { id: string, webResource: WebResourceFragment, preferredBillingOption?: Types.Maybe<BillingOptionFragment_AchBillingOption_ | BillingOptionFragment_CreditCardBillingOption_ | BillingOptionFragment_OtherBillingOption_ | BillingOptionFragment_PaypalBillingOption_ | BillingOptionFragment_WireBillingOption_> }, originalBillingCycle?: Types.Maybe<{ endDate: `${`${number}-${number}-${number}`}` | '', startDate: `${`${number}-${number}-${number}`}` | '' }>, talent?: Types.Maybe<{ id: string, webResource: WebResourceFragment }>, job?: Types.Maybe<{ id: string, webResource: WebResourceFragment }> };

export const InvoiceListItemFragmentDoc = gql`
    fragment InvoiceListItemFragment on Invoice {
  amount
  listedAmount
  actionDueOn
  cleanOutstandingAmount
  description
  longDescription
  consolidatedDocument {
    id
  }
  discountApplied
  discountedAmount
  statusComment
  documentNumber
  id
  invoiceKind
  unconsolidated
  issueDate
  dueDate
  creditedAmount
  status
  paidAmount
  paidAt
  processingDate
  partiallyPaid
  hasPendingCharges
  operations {
    createTransferInvoice {
      ...OperationItem
    }
  }
  range {
    from
    till
  }
  reason {
    ... on Engagement {
      id
      placementFees: placementFeesNullable {
        totalCount
      }
    }
  }
  webResource {
    ...WebResourceFragment
  }
  subjectObject {
    id
    webResource {
      ...WebResourceFragment
    }
    preferredBillingOption {
      ...BillingOptionFragment
    }
  }
  originalBillingCycle {
    endDate
    startDate
  }
  talent {
    id
    webResource {
      ...WebResourceFragment
    }
  }
  job {
    id
    webResource {
      ...WebResourceFragment
    }
  }
}
    ${OperationItemFragmentDoc}
${WebResourceFragmentDoc}
${BillingOptionFragmentDoc}`;