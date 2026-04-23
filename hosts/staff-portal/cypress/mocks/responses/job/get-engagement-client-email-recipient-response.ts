export const getEngagementClientEmailRecipientResponse = () => ({
  data: {
    staffNode: {
      id: 'VjEtRW1haWxNZXNzYWdpbmdFbmdhZ2VtZW50Q2xpZW50LTI4MDc4OA',
      roleType: 'Client',
      defaultSendTo: {
        id: 'VjEtQ29tcGFueVJlcHJlc2VudGF0aXZlLTI1NjgyMzY',
        __typename: 'CompanyRepresentative'
      },
      optionsSendTo: {
        nodes: [
          {
            id: 'VjEtQ29tcGFueVJlcHJlc2VudGF0aXZlLTI2NDM2Nzg',
            fullName: 'Lavina Pagac',
            email: 'lkin-4a43595da04840fb@toptal.io',
            contacts: {
              nodes: [
                {
                  id: 'VjEtQ29udGFjdC0yOTk5NDAw',
                  value: 'lkin-4a43595da04840fb@toptal.io',
                  __typename: 'Contact'
                }
              ],
              __typename: 'ContactConnection'
            },
            __typename: 'CompanyRepresentative'
          },
          {
            id: 'VjEtQ29tcGFueVJlcHJlc2VudGF0aXZlLTI1NjgyMzY',
            fullName: 'Sima Barton',
            email: 'mail-afdccfa617ae07ff@toptal.io',
            contacts: {
              nodes: [
                {
                  id: 'VjEtQ29udGFjdC0yOTI4MzYw',
                  value: 'mail-afdccfa617ae07ff@toptal.io',
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
              id: 'VjEtU3RhZmYtMjEwNTcwNQ',
              fullName: 'Pia Bailey',
              email: 'kulm-fd885388b1d65713@toptal.io',
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
              body: 'Hi {{receiver.contact_first_name}},\r\n\r\nAs per your request the hourly engagement [Senior  Developer (264984)](https://staging.toptal.net/platform/company/jobs/264984) with Dortha Hoeger has been scheduled to end and will not generate any further charges.\r\n\r\nThanks,\r\n{{sender.first_name}}\r\n\r\n{{sender.signature}}',
              subject: "Ending engagement 'Senior  Developer (264984)'",
              __typename: 'EmailTemplateRendered'
            },
            node: {
              id: 'VjEtRW1haWxUZW1wbGF0ZS0xMjM2NjY',
              name: 'Idle Hourly Closing',
              __typename: 'EmailTemplate'
            },
            __typename: 'EmailTemplateEdge'
          }
        ],
        __typename: 'EmailTemplatesEdgedConnection'
      },
      fullName: 'Mueller-Stokes WQ',
      ofacStatus: 'NORMAL',
      viewerPendingCommunications: {
        nodes: [],
        __typename: 'TaskSimpleConnection'
      },
      __typename: 'EmailMessagingEngagementClient'
    }
  }
})
