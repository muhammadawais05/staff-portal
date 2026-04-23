import { encodeEntityId } from '@staff-portal/data-layer-service'
import {
  Client,
  ClientCumulativeStatus,
  ContactType
} from '@staff-portal/graphql/staff'

import {
  getClientOperations,
  getCompanyRepresentativeOperations
} from '~integration/mocks/fragments'
import { enabledOperationMock } from '~integration/mocks'

export const getClientResponse = (client?: Partial<Client>) => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Client'),
      companyLegacyId: 12300,
      fullName: 'DuBuque, Cruickshank and Volkman',
      badLead: false,
      currentNegotiation: null,
      investigations: null,
      topcallPurposeHeuristicData: null,
      emailMessaging: {
        id: encodeEntityId('123', 'Email'),
        operations: {
          sendEmailTo: enabledOperationMock()
        },
        __typename: 'EmailMessagingClient'
      },
      addJobLink: {
        enabled: true,
        messages: [],
        url: 'https://foo.bar'
      },
      invoicesUrl: {
        enabled: true,
        messages: [],
        url: 'https://foo.bar'
      },
      paymentsUrl: {
        enabled: true,
        messages: [],
        url: 'https://foo.bar'
      },
      gdprReportUrl:
        'https://staging.toptal.net/platform/gdpr_report?user_id=1461028',
      emailMessagesUrl:
        'https://staging.toptal.net/platform/staff/companies/1544845/email_messages',
      casesUrl: 'https://staging.toptal.net/platform/staff/roles/1544845/cases',
      referralsUrl:
        'https://staging.toptal.net/platform/staff/companies/1544845/referrals',
      updateProfileUrl:
        'https://staging.toptal.net/platform/clients/update_profile?client_id=337939',
      historyLink: {
        url: '/platform/staff/companies/1544845/performed_actions/recent',
        __typename: 'Link'
      },
      webResource: {
        url: 'https://staging.toptal.net/platform/staff/companies/1544845',
        text: 'DuBuque, Cruickshank and Volkman',
        __typename: 'Link'
      },
      engagements: {
        nodes: [],
        totalCount: 0
      },
      topscreenClient: null,
      contact: {
        id: encodeEntityId('123', 'CompanyRepresentative'),
        fullName: "Ruben D'Amore",
        contacts: {
          nodes: [
            {
              id: encodeEntityId('1', 'Contact'),
              value: '+16082424100#32106',
              type: ContactType.PHONE,
              __typename: 'Contact'
            }
          ],
          __typename: 'ContactConnection'
        },
        operations: getCompanyRepresentativeOperations(),
        __typename: 'CompanyRepresentative'
      },
      operations: getClientOperations(),

      embeddedSigningEnabled: false,
      status: 'active',
      cumulativeStatus: ClientCumulativeStatus.PENDING_TOS,
      parent: null,
      children: {
        nodes: [
          {
            id: encodeEntityId('123', 'Client'),
            fullName: 'Carroll-Spencer LX',
            __typename: 'Client'
          }
        ],
        totalCount: 1,
        __typename: 'ClientChildrenConnection'
      },
      ...client,
      __typename: 'Client'
    }
  }
})
