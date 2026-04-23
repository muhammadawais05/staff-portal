/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag';
disableFragmentWarnings();

import * as Types from '@staff-portal/graphql/staff';

import { WebResourceFragment } from '../../../../billing/src/__fragments__/webResourceFragment.graphql.types';
import { MemorandumOperationsFragment } from '../../../../billing/src/__fragments__/memorandumOperationsFragment.graphql.types';
import { gql } from '@apollo/client';
import { WebResourceFragmentDoc } from '../../../../billing/src/__fragments__/webResourceFragment.graphql.types';
import { MemorandumOperationsFragmentDoc } from '../../../../billing/src/__fragments__/memorandumOperationsFragment.graphql.types';
export type MemorandumBaseItemFragment = (
  { allocated: boolean, allocatedAt?: Types.Maybe<`${`${number}-${number}-${number}T${number}:${number}:${number}${string}`}` | ''>, amount: string, amountDue: string, balance: Types.MemorandumBalance, depositCorrection: boolean, description: string, downloadHtmlUrl?: Types.Maybe<string>, downloadPdfUrl?: Types.Maybe<string>, id: string, number: number, category?: Types.Maybe<{ credit?: Types.Maybe<string>, debit?: Types.Maybe<string>, id: string, name: string }>, document?: Types.Maybe<{ invoiceKind: Types.InvoiceKind, id: string, documentNumber: number, subjectObject: { fullName: string, id: string }, webResource: WebResourceFragment } | { id: string, documentNumber: number, webResource: WebResourceFragment }> }
  & MemorandumOperationsFragment
);

export const MemorandumBaseItemFragmentDoc = gql`
    fragment MemorandumBaseItem on Memorandum {
  allocated
  allocatedAt
  amount
  amountDue
  balance
  category {
    credit
    debit
    id
    name
  }
  depositCorrection
  description
  document {
    id
    documentNumber
    ... on Payment {
      webResource {
        ...WebResourceFragment
      }
    }
    ... on Invoice {
      invoiceKind
      subjectObject {
        fullName
        id
      }
      webResource {
        ...WebResourceFragment
      }
    }
  }
  downloadHtmlUrl
  downloadPdfUrl
  id
  number
  ...MemorandumOperationsFragment
}
    ${WebResourceFragmentDoc}
${MemorandumOperationsFragmentDoc}`;