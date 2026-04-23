import { gql } from '@apollo/client'
import { operationItemFragment } from '@staff-portal/billing/src/__fragments__/operationItemFragment.graphql'

export const billingOptionFragment = gql`
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

  ${operationItemFragment}
`
