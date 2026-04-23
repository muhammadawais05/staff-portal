export const getTalentEmailRecipientResponse = () => ({
  data: {
    staffNode: {
      id: 'VjEtRW1haWxNZXNzYWdpbmdFbmdhZ2VtZW50VGFsZW50LTI4MDc4OA',
      roleType: 'Talent',
      defaultSendTo: {
        id: 'VjEtVGFsZW50LTY3NTAyMw',
        __typename: 'Talent'
      },
      optionsSendTo: {
        nodes: [
          {
            id: 'VjEtVGFsZW50LTY3NTAyMw',
            fullName: 'Dortha Hoeger',
            email: 'brad-5f97945c5fb62270@toptal.io',
            contacts: {
              nodes: [
                {
                  id: 'VjEtQ29udGFjdC00OTY3MTI',
                  value: 'brad-5f97945c5fb62270@toptal.io',
                  __typename: 'Contact'
                },
                {
                  id: 'VjEtQ29udGFjdC0xOTk2MjUy',
                  value: 'brad-9f95e3b3e5ce6249@toptal.io',
                  __typename: 'Contact'
                }
              ],
              __typename: 'ContactConnection'
            },
            __typename: 'Talent'
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
        body: 'Hi Dortha,\n\n\nMy best,\n{{sender.first_name}}\n\n{{sender.signature}}\n',
        subject: null,
        __typename: 'EmailTemplateRendered'
      },
      emailCarbonCopyOptions: {
        nodes: [],
        __typename: 'EmailCarbonCopyOptionConnection'
      },
      emailTemplates: {
        edges: [
          {
            rendered: {
              body: '"subject: ""Thanks for your feedback!"\r\n---\r\n\r\nHi Dortha,\r\n\r\nWe sincerely appreciate you taking the time to let us know that you find value in what we provide here at Toptal and that you\'re willing to recommend us to others. If there\'s anything else we can do to improve your experience, please don\'t hesitate to reach out!\r\n\r\nBest,\r\n{{sender.first_name}}\r\n\r\n{{sender.signature}}',
              subject: 'CX Talent Promoter NPS Thanks Email (Version 1)',
              __typename: 'EmailTemplateRendered'
            },
            node: {
              id: 'VjEtRW1haWxUZW1wbGF0ZS0xMjM1NDM',
              name: 'CX Talent Promoter NPS Thanks Email (Version 1)',
              __typename: 'EmailTemplate'
            },
            __typename: 'EmailTemplateEdge'
          }
        ],
        __typename: 'EmailTemplatesEdgedConnection'
      },
      fullName: 'Dortha Hoeger',
      ofacStatus: 'NORMAL',
      viewerPendingCommunications: {
        nodes: [],
        __typename: 'TaskSimpleConnection'
      },
      __typename: 'EmailMessagingEngagementTalent'
    },
    __typename: 'Engagement'
  }
})
