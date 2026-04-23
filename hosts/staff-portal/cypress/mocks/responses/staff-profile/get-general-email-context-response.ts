import { encodeEntityId } from '@staff-portal/data-layer-service'

import { emailTemplateEdgesMock } from '~integration/mocks/fragments/email-template-edge-mock'

export const getGeneralEmailContextResponse = () => ({
  data: {
    staffNode: {
      id: encodeEntityId('123', 'Staff'),
      __typename: 'Staff',
      emailMessaging: {
        roleType: 'Staff',
        defaultSendTo: {
          id: 'VjEtU3RhZmYtMTEwODk1OQ',
          __typename: 'Staff'
        },
        optionsSendTo: {
          nodes: [
            {
              id: 'VjEtU3RhZmYtMTEwODk1OQ',
              fullName: 'Andi Blackwell',
              email: 'andi-50f9655ad924bbb8@toptal.io',
              contacts: {
                nodes: [
                  {
                    id: 'VjEtQ29udGFjdC0xNTYxMzE5',
                    value: 'andi-50f9655ad924bbb8@toptal.io',
                    __typename: 'Contact'
                  }
                ],
                __typename: 'ContactConnection'
              },
              __typename: 'Staff'
            }
          ],
          __typename: 'EmailMessagingOptionsSendToConnection'
        },
        blankEmailTemplate: {
          id: 'VjEtRW1haWxUZW1wbGF0ZS05MDU0NQ',
          name: 'Blank template',
          __typename: 'EmailTemplate'
        },
        renderedBlankEmailTemplate: {
          body: 'Hi Andi,\n\n\nMy best,\n{{sender.first_name}}\n\n{{sender.signature}}\n',
          subject: null,
          __typename: 'EmailTemplateRendered'
        },
        emailCarbonCopyOptions: {
          nodes: [],
          __typename: 'EmailCarbonCopyOptionConnection'
        },
        emailTemplates: {
          edges: emailTemplateEdgesMock(5),
          __typename: 'EmailTemplatesEdgedConnection'
        },
        fullName: 'Andi Blackwell',
        ofacStatus: 'NORMAL',
        viewerPendingCommunications: {
          nodes: [],
          __typename: 'TaskSimpleConnection'
        },
        __typename: 'EmailMessagingRole'
      }
    }
  }
})
