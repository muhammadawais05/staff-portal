/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag';
disableFragmentWarnings();

import * as Types from '@staff-portal/graphql/staff';

import { OperationItemFragment } from '../../../../billing/src/__fragments__/operationItemFragment.graphql.types';
import { WebResourceFragment } from '../../../../billing/src/__fragments__/webResourceFragment.graphql.types';
import { gql } from '@apollo/client';
import { OperationItemFragmentDoc } from '../../../../billing/src/__fragments__/operationItemFragment.graphql.types';
import { WebResourceFragmentDoc } from '../../../../billing/src/__fragments__/webResourceFragment.graphql.types';
export type BillingSettingsJobFragment = { id: string, title: string, invoiceNote?: Types.Maybe<string>, autoConsolidationEnabled: boolean, attachTimesheetsToInvoices?: Types.Maybe<boolean>, commitment?: Types.Maybe<string>, operations: { assignPurchaseOrder: OperationItemFragment, assignPurchaseOrderLine: OperationItemFragment, assignNextPurchaseOrder: OperationItemFragment, updateAttachTimesheetsToInvoices: OperationItemFragment, editJobInvoiceNote: OperationItemFragment }, purchaseOrder?: Types.Maybe<{ id: string, poNumber: string, webResource: WebResourceFragment }>, purchaseOrderLine?: Types.Maybe<PurchaseOrderLineOptionFragment>, nextPurchaseOrderLine?: Types.Maybe<PurchaseOrderLineOptionFragment>, client: { purchaseOrdersNullable?: Types.Maybe<{ nodes: Array<{ id: string, client: { fullName: string }, webResource: WebResourceFragment, purchaseOrderLines: { nodes: Array<PurchaseOrderLineOptionFragment> } }> }> }, nextPurchaseOrder?: Types.Maybe<{ id: string, poNumber: string, webResource: WebResourceFragment }>, engagements?: Types.Maybe<{ nodes: Array<{ id: string, talent?: Types.Maybe<{ fullName: string }> }> }> };

export type PurchaseOrderLineOptionFragment = { id: string, poLineNumber: string, client: { fullName: string }, webResource: WebResourceFragment, purchaseOrder: { id: string, poNumber: string, webResource: WebResourceFragment } };

export const PurchaseOrderLineOptionFragmentDoc = gql`
    fragment PurchaseOrderLineOption on PurchaseOrderLine {
  id
  poLineNumber
  client {
    fullName
  }
  webResource {
    ...WebResourceFragment
  }
  purchaseOrder {
    id
    poNumber
    webResource {
      ...WebResourceFragment
    }
  }
}
    ${WebResourceFragmentDoc}`;
export const BillingSettingsJobFragmentDoc = gql`
    fragment BillingSettingsJobFragment on Job {
  id
  title
  invoiceNote
  autoConsolidationEnabled
  attachTimesheetsToInvoices
  operations {
    assignPurchaseOrder {
      ...OperationItem
    }
    assignPurchaseOrderLine {
      ...OperationItem
    }
    assignNextPurchaseOrder {
      ...OperationItem
    }
    updateAttachTimesheetsToInvoices {
      ...OperationItem
    }
    editJobInvoiceNote {
      ...OperationItem
    }
  }
  purchaseOrder {
    id
    poNumber
    webResource {
      ...WebResourceFragment
    }
  }
  purchaseOrderLine {
    ...PurchaseOrderLineOption
  }
  nextPurchaseOrderLine {
    ...PurchaseOrderLineOption
  }
  client {
    purchaseOrdersNullable(filter: {assignable: true}) {
      nodes {
        id
        client {
          fullName
        }
        webResource {
          ...WebResourceFragment
        }
        purchaseOrderLines {
          nodes {
            ...PurchaseOrderLineOption
          }
        }
      }
    }
  }
  nextPurchaseOrder {
    id
    poNumber
    webResource {
      ...WebResourceFragment
    }
  }
  commitment
  engagements {
    nodes {
      id
      talent {
        fullName
      }
    }
  }
}
    ${OperationItemFragmentDoc}
${WebResourceFragmentDoc}
${PurchaseOrderLineOptionFragmentDoc}`;