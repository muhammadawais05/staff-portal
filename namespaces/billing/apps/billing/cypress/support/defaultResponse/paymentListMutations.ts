const successResponse = {
  errors: [],
  success: true,
  notice: ''
}

export default {
  SetCreatePaymentGroup: {
    data: {
      createPaymentGroup: {
        __typename: 'CreatePaymentGroupPayload',
        paymentGroup: {
          __typename: 'PaymentGroup',
          id: 'VjEtUGF5bWVudEdyb3VwLTEyMzQ1Ng'
        },
        ...successResponse
      }
    }
  },
  DownloadPaymentsFromSearch: {
    data: {
      downloadPaymentsFromSearch: {
        __typename: 'DownloadPaymentsFromSearchPayload',
        reportUrl: 'example.com/abc',
        reportGenerationScheduled: false,
        ...successResponse
      }
    }
  },
  SetPayMultiplePayments: {
    data: {
      payMultiplePayments: {
        __typename: 'PayMultiplePaymentsPayload',
        ...successResponse
      }
    }
  }
}
