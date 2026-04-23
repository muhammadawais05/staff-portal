import { pick } from 'lodash-es'
import fixtures from '@staff-portal/billing/src/_fixtures'

import billingPermitsQueries from './billingPermitsQueries'

export default {
  ...billingPermitsQueries,
  GetConsolidationDefaults: fixtures.MockGetConsolidationDefaults,
  GetClientBillingNetTerms: {
    data: {
      node: pick(fixtures.MockClient, [
        '__typename',
        '_companyId',
        'id',
        'netTerms'
      ])
    }
  },
  GetClientBillingDetails: {
    data: {
      node: pick(fixtures.MockClient, [
        '__typename',
        '_companyId',
        'fullName',
        'accountInfo',
        'attachTimesheetsToInvoices',
        'autoAllocateMemos',
        'autoConsolidateInvoices',
        'billingAddress',
        'billingCity',
        'billingCountry',
        'billingName',
        'billingNotes',
        'billingOptions',
        'billingPhone',
        'billingState',
        'billingZip',
        'comment',
        'commitmentSettings',
        'id',
        'investmentGrade',
        'invoices',
        'jobTemplate',
        'netTerms',
        'enterprise',
        'collectionSpeed',
        'notifyAboutNewInvoices',
        'operations',
        'status',
        'verificationStatuses'
      ]),
      viewer: {
        permits: { canManageBillingOptions: true }
      }
    }
  },
  GetExperiments: [
    {
      data: {
        experiments: {
          __typename: 'Experiments'
        }
      },
      extensions: {
        tracing: {
          version: 1,
          startTime: '2021-06-01T09:15:29.493Z',
          endTime: '2021-06-01T09:15:29.988Z',
          duration: 494906287,
          execution: { resolvers: [] }
        }
      }
    }
  ],
  GetDataForConsolidationDefaultModal:
    fixtures.MockGetConsolidationDefaultsModal,
  CreateConsolidationDefault: { data: { createConsolidationDefault: {} } },
  GetClientBillingNotifyAboutNewInvoices: {
    data: {
      node: {
        id: fixtures.MockClient.id,
        notifyAboutNewInvoices: true,
        __typename: 'Client'
      }
    },
    loading: false,
    error: null
  },
  GetClientBillingAutoAllocateMemos: {
    data: {
      node: {
        id: fixtures.MockClient.id,
        autoAllocateMemos: true,
        __typename: 'Client'
      }
    },
    loading: false,
    error: null
  },
  GetClientBillingInvestmentGrade: {
    data: {
      node: {
        id: fixtures.MockClient.id,
        investmentGrade: true,
        __typename: 'Client'
      }
    },
    loading: false,
    error: null
  },
  GetClientBillingAttachTimesheetsToInvoices: {
    data: {
      node: {
        id: fixtures.MockClient.id,
        attachTimesheetsToInvoices: true,
        __typename: 'Client'
      }
    },
    loading: false,
    error: null
  },
  GetBillingNotes: {
    data: {
      node: {
        id: fixtures.MockClient.id,
        billingNotes: fixtures.MockClient.billingNotes,
        __typename: 'Client'
      }
    }
  }
}
