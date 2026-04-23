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
export type PaymentOperationsFragment = { operations: { addDocumentNote: OperationItemFragment, addMemorandumToCommercialDocument: OperationItemFragment, applyUnallocatedMemorandumsToCommercialDocument: OperationItemFragment, cancelPayment: OperationItemFragment, convertPaymentIntoCreditMemorandum: OperationItemFragment, disputeCommercialDocument: OperationItemFragment, editDocumentNote: OperationItemFragment, payPayment: OperationItemFragment, resolveDisputeOfCommercialDocument: OperationItemFragment, updateCommercialDocumentDueDate: OperationItemFragment } };

export const PaymentOperationsFragmentDoc = gql`
    fragment PaymentOperationsFragment on Payment {
  operations {
    addDocumentNote {
      ...OperationItem
    }
    addMemorandumToCommercialDocument {
      ...OperationItem
    }
    applyUnallocatedMemorandumsToCommercialDocument {
      ...OperationItem
    }
    cancelPayment {
      ...OperationItem
    }
    convertPaymentIntoCreditMemorandum {
      ...OperationItem
    }
    disputeCommercialDocument {
      ...OperationItem
    }
    editDocumentNote {
      ...OperationItem
    }
    payPayment {
      ...OperationItem
    }
    resolveDisputeOfCommercialDocument {
      ...OperationItem
    }
    updateCommercialDocumentDueDate {
      ...OperationItem
    }
  }
}
    ${OperationItemFragmentDoc}`;