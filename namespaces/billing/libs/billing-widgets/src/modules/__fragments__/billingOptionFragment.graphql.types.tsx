/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag';
disableFragmentWarnings();

import * as Types from '@staff-portal/graphql/staff';

import { OperationItemFragment } from '../../../../billing/src/__fragments__/operationItemFragment.graphql.types';
import { gql } from '@apollo/client';
import { OperationItemFragmentDoc } from '../../../../billing/src/__fragments__/operationItemFragment.graphql.types';
export type BillingOptionFragment_AchBillingOption_ = { id: string, last4Digits: string, comment?: Types.Maybe<string>, status?: Types.Maybe<Types.BillingOptionStatus>, billingMethod: Types.BillingMethodName, discountValue: number, discountable: boolean, name: string, preferred?: Types.Maybe<boolean>, operations: { preferEnterpriseBillingOption: OperationItemFragment, removeBillingOption: OperationItemFragment, removeEnterpriseBillingOption: OperationItemFragment, unsetPreferredBillingOption: OperationItemFragment }, accountInfo?: Types.Maybe<Array<{ label: string, value: string }>> };

export type BillingOptionFragment_CreditCardBillingOption_ = { id: string, cardExpired: boolean, last4Digits: string, type: string, verificationStatuses?: Types.Maybe<Array<Types.BillingOptionVerificationStatus>>, comment?: Types.Maybe<string>, status?: Types.Maybe<Types.BillingOptionStatus>, billingMethod: Types.BillingMethodName, discountValue: number, discountable: boolean, name: string, preferred?: Types.Maybe<boolean>, operations: { preferEnterpriseBillingOption: OperationItemFragment, removeBillingOption: OperationItemFragment, reverifyCreditCardBillingOption: OperationItemFragment, removeEnterpriseBillingOption: OperationItemFragment, unsetPreferredBillingOption: OperationItemFragment }, accountInfo?: Types.Maybe<Array<{ label: string, value: string }>> };

export type BillingOptionFragment_OtherBillingOption_ = { id: string, comment?: Types.Maybe<string>, status?: Types.Maybe<Types.BillingOptionStatus>, billingMethod: Types.BillingMethodName, discountValue: number, discountable: boolean, name: string, preferred?: Types.Maybe<boolean>, operations: { preferEnterpriseBillingOption: OperationItemFragment, removeBillingOption: OperationItemFragment, removeEnterpriseBillingOption: OperationItemFragment, unsetPreferredBillingOption: OperationItemFragment }, accountInfo?: Types.Maybe<Array<{ label: string, value: string }>> };

export type BillingOptionFragment_PaypalBillingOption_ = { id: string, comment?: Types.Maybe<string>, status?: Types.Maybe<Types.BillingOptionStatus>, billingMethod: Types.BillingMethodName, discountValue: number, discountable: boolean, name: string, preferred?: Types.Maybe<boolean>, operations: { preferEnterpriseBillingOption: OperationItemFragment, removeBillingOption: OperationItemFragment, removeEnterpriseBillingOption: OperationItemFragment, unsetPreferredBillingOption: OperationItemFragment, updateBillingOption: OperationItemFragment }, accountInfo?: Types.Maybe<Array<{ label: string, value: string }>> };

export type BillingOptionFragment_WireBillingOption_ = { id: string, status?: Types.Maybe<Types.BillingOptionStatus>, comment?: Types.Maybe<string>, billingMethod: Types.BillingMethodName, discountValue: number, discountable: boolean, name: string, preferred?: Types.Maybe<boolean>, operations: { preferEnterpriseBillingOption: OperationItemFragment, removeBillingOption: OperationItemFragment, removeEnterpriseBillingOption: OperationItemFragment, unsetPreferredBillingOption: OperationItemFragment, verifyWireBillingOption: OperationItemFragment, unverifyWireBillingOption: OperationItemFragment, updateBillingOption: OperationItemFragment }, accountInfo?: Types.Maybe<Array<{ label: string, value: string }>> };

export type BillingOptionFragment = BillingOptionFragment_AchBillingOption_ | BillingOptionFragment_CreditCardBillingOption_ | BillingOptionFragment_OtherBillingOption_ | BillingOptionFragment_PaypalBillingOption_ | BillingOptionFragment_WireBillingOption_;

export const BillingOptionFragmentDoc = gql`
    fragment BillingOptionFragment on BillingOptionInterface {
  accountInfo {
    label
    value
  }
  comment
  status
  billingMethod
  discountValue
  discountable
  id
  name
  preferred
  ... on CreditCardBillingOption {
    id
    cardExpired
    last4Digits
    type
    verificationStatuses
    operations {
      preferEnterpriseBillingOption {
        ...OperationItem
      }
      removeBillingOption {
        ...OperationItem
      }
      reverifyCreditCardBillingOption {
        ...OperationItem
      }
      removeEnterpriseBillingOption {
        ...OperationItem
      }
      unsetPreferredBillingOption {
        ...OperationItem
      }
    }
  }
  ... on ACHBillingOption {
    id
    last4Digits
    operations {
      preferEnterpriseBillingOption {
        ...OperationItem
      }
      removeBillingOption {
        ...OperationItem
      }
      removeEnterpriseBillingOption {
        ...OperationItem
      }
      unsetPreferredBillingOption {
        ...OperationItem
      }
    }
  }
  ... on PaypalBillingOption {
    id
    operations {
      preferEnterpriseBillingOption {
        ...OperationItem
      }
      removeBillingOption {
        ...OperationItem
      }
      removeEnterpriseBillingOption {
        ...OperationItem
      }
      unsetPreferredBillingOption {
        ...OperationItem
      }
      updateBillingOption {
        ...OperationItem
      }
    }
  }
  ... on OtherBillingOption {
    id
    operations {
      preferEnterpriseBillingOption {
        ...OperationItem
      }
      removeBillingOption {
        ...OperationItem
      }
      removeEnterpriseBillingOption {
        ...OperationItem
      }
      unsetPreferredBillingOption {
        ...OperationItem
      }
    }
  }
  ... on WireBillingOption {
    id
    status
    operations {
      preferEnterpriseBillingOption {
        ...OperationItem
      }
      removeBillingOption {
        ...OperationItem
      }
      removeEnterpriseBillingOption {
        ...OperationItem
      }
      unsetPreferredBillingOption {
        ...OperationItem
      }
      verifyWireBillingOption {
        ...OperationItem
      }
      unverifyWireBillingOption {
        ...OperationItem
      }
      updateBillingOption {
        ...OperationItem
      }
    }
  }
}
    ${OperationItemFragmentDoc}`;