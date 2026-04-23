import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getClientEmailRecipientResponse = () => ({
  data: {
    staffNode: {
      id: encodeEntityId('123', 'Client'),
      emailMessaging: {
        id: encodeEntityId('123', 'EmailMessagingClient'),
        roleType: 'Client',
        defaultSendTo: {
          id: 'VjEtQ29tcGFueVJlcHJlc2VudGF0aXZlLTIyNTk4OTI',
          __typename: 'CompanyRepresentative'
        },
        optionsSendTo: {
          nodes: [
            {
              id: 'VjEtQ29tcGFueVJlcHJlc2VudGF0aXZlLTIyNTk4OTI',
              fullName: 'Audrey Brakus',
              email: 'wpri-115c5b42185a4cbb@toptal.io',
              contacts: {
                nodes: [
                  {
                    id: 'VjEtQ29udGFjdC0yNjQ0MzIx',
                    value: 'wpri-115c5b42185a4cbb@toptal.io',
                    __typename: 'Contact'
                  }
                ],
                __typename: 'ContactConnection'
              },
              __typename: 'CompanyRepresentative'
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
          body: 'Hi {{receiver.contact_first_name}},\n\n\nMy best,\n{{sender.first_name}}\n\n{{sender.signature}}\n',
          subject: null,
          __typename: 'EmailTemplateRendered'
        },
        emailCarbonCopyOptions: {
          nodes: [
            {
              label: 'Sales Claimer',
              default: false,
              role: {
                id: 'VjEtU3RhZmYtMTcwMDIzMw',
                fullName: 'Robin Wilderman',
                email: 'vili-28114f4b751300df@toptal.io',
                __typename: 'Staff'
              },
              __typename: 'EmailCarbonCopyOption'
            }
          ],
          __typename: 'EmailCarbonCopyOptionConnection'
        },
        emailTemplates: {
          edges: [
            {
              rendered: {
                body: 'Hello World!',
                subject: 'Call with Toptal - Please reschedule',
                __typename: 'EmailTemplateRendered'
              },
              node: {
                id: 'VjEtRW1haWxUZW1wbGF0ZS0xMjMzMzY',
                name: '1SS - Escalated FC/IA rescheduling',
                __typename: 'EmailTemplate'
              },
              __typename: 'EmailTemplateEdge'
            }
          ],
          __typename: 'EmailTemplatesEdgedConnection'
        },
        fullName: 'Ryan, Mohr and Fadel',
        ofacStatus: 'NORMAL',
        viewerPendingCommunications: {
          nodes: [],
          __typename: 'TaskSimpleConnection'
        },
        __typename: 'EmailMessagingClient'
      },
      __typename: 'Client'
    }
  }
})
