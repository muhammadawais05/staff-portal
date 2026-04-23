import fixtures from '@staff-portal/billing/src/_fixtures'

export default {
  // Queries
  GetInvoiceTaskCard: {
    data: {
      node: {
        ...fixtures.MockInvoice,
        operations: {
          ...fixtures.MockInvoice.operations,
          addMemorandumToCommercialDocument: {
            __typename: 'Operation',
            callable: 'ENABLED',
            messages: []
          }
        }
      }
    }
  },
  GetPayModalInvoice: {
    data: {
      node: {
        ...fixtures.MockInvoice,
        operations: {
          ...fixtures.MockInvoice.operations,
          addMemorandumToCommercialDocument: {
            __typename: 'Operation',
            callable: 'ENABLED',
            messages: []
          }
        }
      }
    }
  },
  GetAddMemorandum: {
    data: {
      node: {
        ...fixtures.MockInvoice,
        operations: {
          ...fixtures.MockInvoice.operations,
          addMemorandumToCommercialDocument: {
            __typename: 'Operation',
            callable: 'ENABLED',
            messages: []
          }
        }
      }
    }
  },
  GetRevertMemorandum: {
    data: {
      node: {
        ...fixtures.MockInvoice,
        operations: {
          ...fixtures.MockInvoice.operations,
          addMemorandumToCommercialDocument: {
            __typename: 'Operation',
            callable: 'ENABLED',
            messages: []
          }
        }
      }
    }
  },
  GetMemorandumCategories: {
    data: {
      memorandumCategories: fixtures.MockMemorandumCategories
    }
  }
}
