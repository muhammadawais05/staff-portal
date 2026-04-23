/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag';
disableFragmentWarnings();

import * as Types from '@staff-portal/graphql/staff';

import { PaymentOperationsFragment } from './paymentOperationsFragment.graphql.types';
import { WebResourceFragment } from './webResourceFragment.graphql.types';
import { gql } from '@apollo/client';
import { PaymentOperationsFragmentDoc } from './paymentOperationsFragment.graphql.types';
import { WebResourceFragmentDoc } from './webResourceFragment.graphql.types';
export type PaymentDeferredOperationFragment = (
  { id: string, downloadHtmlUrl?: Types.Maybe<string>, downloadPdfUrl?: Types.Maybe<string>, documentNumber: number, webResource: WebResourceFragment }
  & PaymentOperationsFragment
);

export const PaymentDeferredOperationFragmentDoc = gql`
    fragment PaymentDeferredOperationFragment on Payment {
  id
  downloadHtmlUrl
  downloadPdfUrl
  documentNumber
  ...PaymentOperationsFragment
  webResource {
    ...WebResourceFragment
  }
}
    ${PaymentOperationsFragmentDoc}
${WebResourceFragmentDoc}`;