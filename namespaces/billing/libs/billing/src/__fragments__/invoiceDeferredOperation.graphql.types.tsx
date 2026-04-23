/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag';
disableFragmentWarnings();

import * as Types from '@staff-portal/graphql/staff';

import { InvoiceOperationsFragment } from './invoiceOperationsFragment.graphql.types';
import { WebResourceFragment } from './webResourceFragment.graphql.types';
import { gql } from '@apollo/client';
import { InvoiceOperationsFragmentDoc } from './invoiceOperationsFragment.graphql.types';
import { WebResourceFragmentDoc } from './webResourceFragment.graphql.types';
export type InvoiceDeferredOperationFragment = (
  { id: string, downloadHtmlUrl?: Types.Maybe<string>, downloadPdfUrl?: Types.Maybe<string>, documentNumber: number, webResource: WebResourceFragment }
  & InvoiceOperationsFragment
);

export const InvoiceDeferredOperationFragmentDoc = gql`
    fragment InvoiceDeferredOperationFragment on Invoice {
  id
  downloadHtmlUrl
  downloadPdfUrl
  documentNumber
  ...InvoiceOperationsFragment
  webResource {
    ...WebResourceFragment
  }
}
    ${InvoiceOperationsFragmentDoc}
${WebResourceFragmentDoc}`;