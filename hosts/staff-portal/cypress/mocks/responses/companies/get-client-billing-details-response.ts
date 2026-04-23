import { encodeEntityId } from '@staff-portal/data-layer-service'
import { Client } from '@staff-portal/graphql/staff'

import { hiddenOperationMock } from '~integration/mocks'
import { getClientOperations } from '~integration/mocks/fragments'

export const getClientBillingDetailsResponse = (client?: Partial<Client>) => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Client'),
      _companyId: 1544845,
      fullName: 'DuBuque, Cruickshank and Volkman',
      invoices: {
        totalCount: 194,
        __typename: 'ClientInvoiceConnection'
      },
      billingAddress: '86029 Chara Ports',
      billingName: 'Lisa Koch',
      billingCity: 'Fritschbury',
      billingZip: '23593',
      billingState: 'IL',
      billingCountry: {
        name: 'United States',
        __typename: 'Country'
      },
      billingPhone: ' 608.242.4100 ext. 32120',
      billingNotes:
        'STA states net 10 terms, however Drew requested to honor net 30 terms without signing a new contract. \r\n',
      billingOptions: {
        nodes: [],
        __typename: 'BillingOptionInterfaceConnection'
      },
      netTerms: 30,
      enterprise: true,
      collectionSpeed: 'STANDARD',
      notifyAboutNewInvoices: false,
      autoAllocateMemos: false,
      attachTimesheetsToInvoices: false,
      investmentGrade: false,
      commitmentSettings: null,
      jobTemplate: {
        billCycle: 'WEEKLY',
        billDay: 'SATURDAY',
        commitment: null,
        id: 'VjEtSm9iVGVtcGxhdGUtMzU',
        operations: {
          updateJobTemplate: hiddenOperationMock(),
          deleteJobTemplate: hiddenOperationMock(),
          __typename: 'JobTemplateOperations'
        },
        __typename: 'JobTemplate'
      },
      operations: getClientOperations(),
      ...client,
      __typename: 'Client'
    }
  }
})
