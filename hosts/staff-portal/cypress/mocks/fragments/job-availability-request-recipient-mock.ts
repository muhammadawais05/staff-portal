import { AvailabilityRequest, ContactType } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

export const jobAvailabilityRequestRecipientMock = () =>
  ({
    id: encodeEntityId('xxx', 'AvailabilityRequest'),
    emailMessaging: {
      id: 'VjEtRW1haWxNZXNzYWdpbmdBdmFpbGFiaWxpdHlSZXF1ZXN0ZWUtNzg3MTAy',
      roleType: 'Talent',
      defaultSendTo: {
        id: 'VjEtVGFsZW50LTQ4OTk0OQ',
        __typename: 'Talent'
      },
      optionsSendTo: {
        nodes: [
          {
            id: 'VjEtVGFsZW50LTQ4OTk0OQ',
            fullName: 'Belva Reinger',
            email: 'ghal-a20239876a9837b4@toptal.io',
            contacts: {
              nodes: [
                {
                  id: 'VjEtQ29udGFjdC0yMTEzMjM',
                  value: 'ghal-a20239876a9837b4@toptal.io',
                  primary: true,
                  type: ContactType.PHONE
                }
              ]
            }
          }
        ]
      },
      blankEmailTemplate: {
        id: 'VjEtRW1haWxUZW1wbGF0ZS05MDU0NQ',
        name: 'Blank template'
      },
      renderedBlankEmailTemplate: {
        body: 'Hi Belva,\n\n\nMy best,\n{{sender.first_name}}\n\n{{sender.signature}}\n',
        subject: null
      },
      emailCarbonCopyOptions: {
        nodes: []
      },
      emailTemplates: {
        edges: [
          {
            rendered: {
              body: '"subject: ""Thanks for your feedback!"\r\n---\r\n\r\nHi Belva',
              subject: 'CX Talent Promoter NPS Thanks Email (Version 1)'
            },
            node: {
              id: 'VjEtRW1haWxUZW1wbGF0ZS0xMjM1NDM',
              name: 'CX Talent Promoter NPS Thanks Email (Version 1)'
            }
          }
        ]
      },
      fullName: 'Belva Reinger',
      ofacStatus: 'NORMAL',
      viewerPendingCommunications: {
        nodes: []
      }
    }
  } as unknown as AvailabilityRequest)
