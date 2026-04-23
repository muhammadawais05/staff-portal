import { pick } from 'lodash-es'
import fixtures from '@staff-portal/billing/src/_fixtures'

import invoiceMutations from './invoiceMutations'

export default {
  ...invoiceMutations,
  QueryAutocomplete: {
    data: fixtures.MockAutocompleteSearchResultsInvoiceListTalents
  },
  InvoicesListFilters: {
    data: fixtures.MockInvoiceListFilters
  },
  GetClientsToConsolidate: {
    data: {
      ...fixtures.MockGetClientsToConsolidate,
      experiments: {
        __typename: 'Experiments'
      }
    }
  },
  GetInvoicesGrandTotals: {
    data: {
      invoices: {
        __typename: 'InvoicesConnection',
        totalCount: 50,
        totals: {
          __typename: 'InvoicesTotals',
          credited: '4018088.93',
          disputed: '16628.32',
          paid: '29314229.54',
          outstanding: '19878148.36',
          overdue: '2025589.53',
          pendingReceipt: '2324378.32',
          inCollections: '1324378.32',
          writtenOff: '324378.32',
          draft: '0.00'
        }
      }
    }
  },
  GetInvoicesMonthlyTotals: {
    data: {
      invoices: {
        __typename: 'InvoicesConnection',
        groups: [
          {
            __typename: 'InvoiceGroup',
            month: 2,
            year: 2020,
            totals: {
              __typename: 'InvoicesTotals',
              credited: '4018088.93',
              disputed: '16628.32',
              paid: '29314229.54',
              outstanding: '19878148.36',
              overdue: '2025589.53',
              pendingReceipt: '2324378.32',
              inCollections: '1324378.32',
              writtenOff: '324378.32',
              draft: '0.00'
            }
          }
        ]
      }
    }
  },
  GetInvoicesList: {
    data: fixtures.MockInvoiceList
  },
  GetInvoicesListHeader: {
    data: fixtures.MockInvoiceList
  },
  GetInvoiceListConsolidationOperation: {
    data: fixtures.MockInvoiceList
  },
  GetInvoiceListReconciliationOperation: {
    data: {
      invoicesNullable: {
        __typename: 'InvoicesConnection',
        operations: {
          __typename: 'InvoicesConnectionOperations',
          reconcileInvoices: {
            __typename: 'Operation',
            callable: 'ENABLED',
            messages: ['']
          }
        }
      }
    },
    extensions: {}
  },
  GetInvoicesToConsolidate: {
    data: fixtures.MockGetInvoicesToConsolidate
  },
  GetConsolidatedInvoices: {
    data: {
      node: {
        __typename: 'Invoice',
        id: fixtures.MockInvoice.id,
        originalInvoices: {
          __typename: 'InvoiceConnection',
          nodes: [
            {
              ...fixtures.MockInvoice,
              // id should not be the same
              id: 'abc'
            }
          ]
        }
      }
    }
  },
  GetOperations: {
    data: pick(fixtures.MockInvoice, [
      'id',
      'downloadHtmlUrl',
      'downloadPdfUrl',
      'documentNumber',
      'operations',
      'webResource'
    ])
  }
}
