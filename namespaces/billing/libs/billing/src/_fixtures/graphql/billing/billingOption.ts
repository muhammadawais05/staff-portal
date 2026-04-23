import {
  BillingMethodName,
  BillingOptionStatus,
  BillingOptionVerificationStatus,
  OperationCallableTypes
} from '@staff-portal/graphql/staff'

export default {
  __typename: 'CreditCardBillingOption',
  name: 'Credit Card1',
  billingMethod: BillingMethodName.CREDIT_CARD,
  cardExpired: false,
  type: 'MasterCard',
  last4Digits: '3745',
  discountValue: 0,
  discountable: false,
  preferred: true,
  isLastPullMethod: true,
  id: 'VjEtQ3JlZGl0Q2FyZEJpbGxpbmdPcHRpb24tMTcyMjE5',
  comment: '',
  status: BillingOptionStatus.VERIFIED,
  verificationStatuses: [BillingOptionVerificationStatus.CAN_BE_CHARGED],
  accountInfo: [
    { label: 'Name', value: 'John Talbot', __typename: 'AccountInfo' },
    {
      label: 'Number',
      value: '**** **** **** 1324',
      __typename: 'AccountInfo'
    },
    { label: 'Expires', value: '12/2015', __typename: 'AccountInfo' },
    { label: 'Type', value: 'MasterCard', __typename: 'AccountInfo' }
  ],
  operations: {
    __typename: 'ClientOperations',
    reverifyCreditCardBillingOption: {
      __typename: 'Operation',
      callable: OperationCallableTypes.HIDDEN,
      messages: []
    },
    preferEnterpriseBillingOption: {
      __typename: 'Operation',
      callable: OperationCallableTypes.HIDDEN,
      messages: []
    },
    unsetPreferredBillingOption: {
      __typename: 'Operation',
      callable: OperationCallableTypes.ENABLED,
      messages: []
    },
    removeBillingOption: {
      __typename: 'Operation',
      callable: OperationCallableTypes.ENABLED,
      messages: []
    },
    removeEnterpriseBillingOption: {
      __typename: 'Operation',
      callable: OperationCallableTypes.HIDDEN,
      messages: []
    }
  }
}
