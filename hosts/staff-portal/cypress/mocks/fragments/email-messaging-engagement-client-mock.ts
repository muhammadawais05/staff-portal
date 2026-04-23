import {
  EmailMessagingEngagementClient,
  OfacStatus
} from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { emailTemplateEdgesMock } from '~integration/mocks/fragments/email-template-edge-mock'
import { roleMock } from '~integration/mocks/fragments/role-mock'
import { hiddenOperationMock } from '~integration/mocks/hidden-operation-mock'

type EmailMessagingEngagementClientMock = EmailMessagingEngagementClient & {
  __typename: string
}

export const emailMessagingEngagementClientMock = (
  node?: Partial<EmailMessagingEngagementClientMock>
): EmailMessagingEngagementClientMock =>
  ({
    __typename: 'EmailMessagingEngagementClient',
    id: encodeEntityId('123', 'EmailMessagingEngagementClient'),
    blankEmailTemplate: {
      __typename: 'EmailTemplate',
      id: 'VjEtRW1haWxUZW1wbGF0ZS05MDU0NQ',
      name: 'Blank template',
      rawTemplate: 'Template content'
    },
    defaultSendTo: roleMock(),
    emailCarbonCopyOptions: {
      nodes: [
        {
          label: 'Sales Claimer',
          default: false,
          role: roleMock()
        },
        {
          label: 'Account Manager',
          default: false,
          role: roleMock()
        }
      ]
    },
    emailTemplates: {
      __typename: 'EmailTemplatesEdgedConnection',
      edges: emailTemplateEdgesMock(5)
    },
    fullName: 'Dibbert-Bins AK',
    roleType: 'Client',
    optionsSendTo: {
      nodes: [roleMock()],
      totalCount: 0
    },
    renderedBlankEmailTemplate: {
      body: 'Hi {{receiver.contact_first_name}},\n\n\nMy best,\n{{sender.first_name}}\n\n{{sender.signature}}\n',
      subject: null
    },
    ofacStatus: OfacStatus.NORMAL,
    ofacProhibited: false,
    viewerPendingCommunications: {
      nodes: []
    },
    operations: {
      sendEmailTo: hiddenOperationMock()
    },
    ...node
  } as EmailMessagingEngagementClientMock)
