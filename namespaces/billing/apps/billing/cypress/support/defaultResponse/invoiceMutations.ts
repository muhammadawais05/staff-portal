import fixtures from '@staff-portal/billing/src/_fixtures'

const invoiceResponse = {
  errors: [],
  invoice: fixtures.MockInvoice,
  success: true,
  notice: ''
}

const commercialDocumentResponse = {
  errors: [],
  commercialDocument: fixtures.MockInvoice,
  success: true,
  notice: ''
}

export default {
  SetApplyPrepayments: {
    data: {
      applyPrepayments: {
        __typename: 'ApplyPrepaymentsPayload',
        ...invoiceResponse
      }
    }
  },
  SetApplyPromotions: {
    data: {
      applyPromotions: {
        __typename: 'ApplyPromotionsPayload',
        ...invoiceResponse
      }
    }
  },
  SetWriteOffInvoice: {
    data: {
      writeOffInvoice: {
        __typename: 'WriteOffInvoicePayload',
        ...invoiceResponse
      }
    }
  },
  SetUpdateCommercialDocumentDueDate: {
    data: {
      updateCommercialDocumentDueDate: {
        __typename: 'UpdateCommercialDocumentDueDatePayload',
        ...commercialDocumentResponse
      }
    }
  },
  SetDisputeTalentPayments: {
    data: {
      disputeTalentPayments: {
        __typename: 'disputeTalentPaymentsPayload',
        ...invoiceResponse
      }
    }
  },
  CollectBadDebtInvoice: {
    data: {
      collectBadDebtInvoice: {
        __typename: 'CollectBadDebtInvoicePayload',
        ...invoiceResponse
      }
    }
  },
  Dispute: {
    data: {
      disputeCommercialDocument: {
        __typename: 'DisputeCommercialDocumentPayload',
        ...commercialDocumentResponse
      }
    }
  },
  SetResolveDisputeResolution: {
    data: {
      resolveDisputeOfCommercialDocument: {
        __typename: 'DisputeCommercialDocumentPayload',
        ...commercialDocumentResponse
      }
    }
  },
  SetRequestDisputeResolution: {
    data: {
      resolveDisputeOfCommercialDocument: {
        __typename: 'RequestDisputeResolutionPayload',
        ...invoiceResponse
      }
    }
  },
  SetRecordBadDebt: {
    data: {
      recordBadDebt: {
        __typename: 'RecordBadDebtPayload',
        ...invoiceResponse
      }
    }
  },
  SetAddMemorandumToCommercialDocument: {
    data: {
      addMemorandumToCommercialDocument: {
        __typename: 'AddMemorandumToCommercialDocumentPayload',
        errors: [],
        commercialDocument: {
          __typename: 'Invoice',
          id: 'VjEtSW52b2ljZS0zODA2MDA'
        },
        success: true
      }
    }
  }
}
