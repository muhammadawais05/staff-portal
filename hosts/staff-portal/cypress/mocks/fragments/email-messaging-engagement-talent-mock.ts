import {
  EmailMessagingEngagementTalent,
  OfacStatus
} from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { hiddenOperationMock } from '~integration/mocks/hidden-operation-mock'
import { roleMock } from '~integration/mocks/fragments/role-mock'
import { emailTemplateEdgesMock } from '~integration/mocks/fragments/email-template-edge-mock'

type EmailMessagingEngagementTalentMock = EmailMessagingEngagementTalent & {
  __typename: string
}

export const emailMessagingEngagementTalentMock = (
  node?: Partial<EmailMessagingEngagementTalentMock>
): EmailMessagingEngagementTalentMock =>
  ({
    __typename: 'EmailMessagingEngagementTalent',
    id: encodeEntityId('123', 'EmailMessagingEngagementTalent'),
    blankEmailTemplate: {
      __typename: 'EmailTemplate',
      id: 'VjEtRW1haWxUZW1wbGF0ZS05MDU0NQ',
      name: 'Blank template',
      rawTemplate: 'Template content'
    },
    defaultSendTo: roleMock(),
    emailCarbonCopyOptions: {
      nodes: []
    },
    emailTemplates: {
      __typename: 'EmailTemplatesEdgedConnection',
      edges: emailTemplateEdgesMock(5)
    },
    fullName: 'Alla Rice',
    ofacProhibited: false,
    ofacStatus: OfacStatus.NORMAL,
    optionsSendTo: {
      nodes: [roleMock()],
      totalCount: 0
    },
    renderedBlankEmailTemplate: { body: 'body', subject: null },
    roleType: 'Talent',
    viewerPendingCommunications: {
      nodes: []
    },
    operations: {
      __typename: 'EmailMessagingOperation',
      sendEmailTo: hiddenOperationMock()
    },
    ...node
  } as EmailMessagingEngagementTalentMock)
