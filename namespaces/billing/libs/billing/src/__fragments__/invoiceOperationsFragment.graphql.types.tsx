/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag';
disableFragmentWarnings();

import * as Types from '@staff-portal/graphql/staff';

import { OperationItemFragment } from './operationItemFragment.graphql.types';
import { gql } from '@apollo/client';
import { OperationItemFragmentDoc } from './operationItemFragment.graphql.types';
export type InvoiceOperationsFragment = { operations: { addDocumentNote: OperationItemFragment, addMemorandumToCommercialDocument: OperationItemFragment, applyPrepayments: OperationItemFragment, applyPromotions: OperationItemFragment, applyUnallocatedMemorandumsToCommercialDocument: OperationItemFragment, assignPurchaseOrder: OperationItemFragment, createTransferInvoice: OperationItemFragment, disputeTalentPayments: OperationItemFragment, editDocumentNote: OperationItemFragment, collectBadDebtInvoice: OperationItemFragment, recordBadDebt: OperationItemFragment, disputeCommercialDocument: OperationItemFragment, resolveDisputeOfCommercialDocument: OperationItemFragment, unconsolidate: OperationItemFragment, updateDispute: OperationItemFragment, updateIssueDate: OperationItemFragment, updateCommercialDocumentDueDate: OperationItemFragment, writeOff: OperationItemFragment } };

export const InvoiceOperationsFragmentDoc = gql`
    fragment InvoiceOperationsFragment on Invoice {
  operations {
    addDocumentNote {
      ...OperationItem
    }
    addMemorandumToCommercialDocument {
      ...OperationItem
    }
    applyPrepayments {
      ...OperationItem
    }
    applyPromotions {
      ...OperationItem
    }
    applyUnallocatedMemorandumsToCommercialDocument {
      ...OperationItem
    }
    assignPurchaseOrder {
      ...OperationItem
    }
    createTransferInvoice {
      ...OperationItem
    }
    disputeTalentPayments {
      ...OperationItem
    }
    editDocumentNote {
      ...OperationItem
    }
    collectBadDebtInvoice {
      ...OperationItem
    }
    recordBadDebt {
      ...OperationItem
    }
    disputeCommercialDocument {
      ...OperationItem
    }
    resolveDisputeOfCommercialDocument {
      ...OperationItem
    }
    unconsolidate {
      ...OperationItem
    }
    updateDispute {
      ...OperationItem
    }
    updateIssueDate {
      ...OperationItem
    }
    updateCommercialDocumentDueDate {
      ...OperationItem
    }
    writeOff {
      ...OperationItem
    }
  }
}
    ${OperationItemFragmentDoc}`;