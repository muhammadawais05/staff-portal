import {
  TransferStatus,
  BillingMethodName,
  OperationCallableTypes,
  BillingOptionStatus,
  BillingOptionVerificationStatus
} from '@staff-portal/graphql/staff'

export default {
  __typename: 'TransferConnection',
  nodes: [
    {
      __typename: 'Transfer',
      amount: '500.0',
      amountToRefund: '499.0',
      document: {
        __typename: 'Invoice',
        id: 'VjEtSW52b2ljZS0zNzcyNDk'
      },
      billingOption: {
        __typename: 'CreditCardBillingOption',
        billingMethod: BillingMethodName.CREDIT_CARD,
        id: 'Y2MxLTEyMzQ',
        last4Digits: '4789',
        type: 'VISA',
        name: 'should be removed',
        discountable: false,
        discountValue: 0,
        cardExpired: false,
        preferred: false,
        comment: 'Example comment.',
        isLastPullMethod: true,
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
          __typename: 'BillingOptionOperations',
          reverifyCreditCardBillingOption: {
            __typename: 'Operation',
            callable: 'DISABLED',
            messages: []
          },
          preferEnterpriseBillingOption: {
            __typename: 'Operation',
            callable: 'DISABLED',
            messages: []
          },
          removeBillingOption: {
            __typename: 'Operation',
            callable: 'DISABLED',
            messages: []
          },
          removeEnterpriseBillingOption: {
            __typename: 'Operation',
            callable: 'DISABLED',
            messages: []
          },
          unsetPreferredBillingOption: {
            __typename: 'Operation',
            callable: 'DISABLED',
            messages: []
          }
        }
      },
      createdAt: '2020-01-07T12:12:38-04:00',
      description: 'Sent for processing to the bank network',
      effectiveDate: '2020-02-05',
      feesTotalAmount: '0',
      gateway: 'Stripe',
      id: 'VjEtVHJhbnNmZXItNTg5MDMw',
      operations: {
        __typename: 'TransferOperations',
        cancelTransfer: {
          __typename: 'Operation',
          callable: OperationCallableTypes.ENABLED,
          messages: []
        },
        claimTransferRefund: {
          __typename: 'Operation',
          callable: OperationCallableTypes.ENABLED,
          messages: []
        },
        failTransfer: {
          __typename: 'Operation',
          callable: OperationCallableTypes.ENABLED,
          messages: []
        },
        payTransfer: {
          __typename: 'Operation',
          callable: OperationCallableTypes.ENABLED,
          messages: []
        },
        postponeTransfer: {
          __typename: 'Operation',
          callable: OperationCallableTypes.ENABLED,
          messages: []
        },
        rollbackTransfer: {
          __typename: 'Operation',
          callable: OperationCallableTypes.ENABLED,
          messages: []
        }
      },
      paymentMethod: BillingMethodName.CREDIT_CARD,
      refund: false,
      status: TransferStatus.SUCCEEDED
    },
    {
      __typename: 'Transfer',
      amount: '200.0',
      amountToRefund: '0.0',
      document: {
        __typename: 'Invoice',
        id: 'VjEtSW52b2ljZS0zNzcyNDk'
      },
      billingOption: {
        __typename: 'BillingOption',
        billingMethod: BillingMethodName.CREDIT_CARD,
        id: 'Y2MxLTEyMzQ',
        last4Digits: '4789',
        type: 'VISA',
        name: 'should be removed',
        discountable: false,
        discountValue: 0,
        cardExpired: false,
        preferred: false,
        comment: 'Example comment.',
        isLastPullMethod: true,
        status: BillingOptionStatus.VERIFIED,
        accountInfo: [],
        operations: {
          __typename: 'BillingOptionOperations',
          reverifyCreditCardBillingOption: {
            __typename: 'Operation',
            callable: 'DISABLED',
            messages: []
          },
          preferEnterpriseBillingOption: {
            __typename: 'Operation',
            callable: 'DISABLED',
            messages: []
          },
          removeBillingOption: {
            __typename: 'Operation',
            callable: 'DISABLED',
            messages: []
          },
          removeEnterpriseBillingOption: {
            __typename: 'Operation',
            callable: 'DISABLED',
            messages: []
          },
          unsetPreferredBillingOption: {
            __typename: 'Operation',
            callable: 'DISABLED',
            messages: []
          }
        }
      },
      createdAt: '2020-01-07T23:14:38-04:00',
      description: 'Sent for processing to the ACH network',
      effectiveDate: '2020-02-05',
      feesTotalAmount: '0',
      gateway: 'Stripe',
      id: 'VjEtVHJhbnNmZXItNTg5MDM2',
      operations: {
        __typename: 'TransferOperations',
        cancelTransfer: {
          __typename: 'Operation',
          callable: OperationCallableTypes.HIDDEN,
          messages: []
        },
        claimTransferRefund: {
          __typename: 'Operation',
          callable: OperationCallableTypes.HIDDEN,
          messages: []
        },
        failTransfer: {
          __typename: 'Operation',
          callable: OperationCallableTypes.HIDDEN,
          messages: []
        },
        payTransfer: {
          __typename: 'Operation',
          callable: OperationCallableTypes.ENABLED,
          messages: []
        },
        postponeTransfer: {
          __typename: 'Operation',
          callable: OperationCallableTypes.HIDDEN,
          messages: []
        }
      },
      paymentMethod: 'Stripe ACH',
      refund: false,
      status: TransferStatus.PENDING
    },
    {
      __typename: 'Transfer',
      amount: '1500.0',
      amountToRefund: '0.0',
      document: {
        __typename: 'Invoice',
        id: 'VjEtSW52b2ljZS0zNzcyNDk'
      },
      billingOption: {
        __typename: 'BillingOption',
        billingMethod: BillingMethodName.CREDIT_CARD,
        id: 'Y2MxLTEyMzQ',
        last4Digits: '4789',
        type: 'VISA',
        name: 'should be removed',
        discountable: false,
        discountValue: 0,
        cardExpired: false,
        preferred: false,
        comment: 'Example comment.',
        isLastPullMethod: true,
        status: BillingOptionStatus.VERIFIED,
        accountInfo: [],
        operations: {
          __typename: 'BillingOptionOperations',
          reverifyCreditCardBillingOption: {
            __typename: 'Operation',
            callable: 'DISABLED',
            messages: []
          },
          preferEnterpriseBillingOption: {
            __typename: 'Operation',
            callable: 'DISABLED',
            messages: []
          },
          removeBillingOption: {
            __typename: 'Operation',
            callable: 'DISABLED',
            messages: []
          },
          removeEnterpriseBillingOption: {
            __typename: 'Operation',
            callable: 'DISABLED',
            messages: []
          },
          unsetPreferredBillingOption: {
            __typename: 'Operation',
            callable: 'DISABLED',
            messages: []
          }
        }
      },
      createdAt: '2020-01-07T13:14:38-04:00',
      description: 'The card was declined',
      effectiveDate: '2020-02-05',
      feesTotalAmount: '0',
      gateway: 'Stripe',
      id: 'VjEtVHJhbnNmZXItNTg5MDMa',
      operations: {
        __typename: 'TransferOperations',
        cancelTransfer: {
          __typename: 'Operation',
          callable: OperationCallableTypes.HIDDEN,
          messages: []
        },
        claimTransferRefund: {
          __typename: 'Operation',
          callable: OperationCallableTypes.HIDDEN,
          messages: []
        },
        failTransfer: {
          __typename: 'Operation',
          callable: OperationCallableTypes.HIDDEN,
          messages: []
        },
        payTransfer: {
          __typename: 'Operation',
          callable: OperationCallableTypes.HIDDEN,
          messages: []
        },
        postponeTransfer: {
          __typename: 'Operation',
          callable: OperationCallableTypes.HIDDEN,
          messages: []
        }
      },
      paymentMethod: 'Credit Card',
      refund: false,
      status: TransferStatus.FAILED
    }
  ]
}
