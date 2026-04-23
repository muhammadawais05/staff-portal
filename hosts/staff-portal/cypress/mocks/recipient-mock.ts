const getRecipientMock = () => {
  const toId = 'VjEtVGFsZW50LTI1Njc0MDk'

  return {
    id: toId,
    emailMessaging: {
      roleType: 'Talent',
      defaultSendTo: {
        id: toId
      },
      fullName: 'Henrietta Howell',
      ofacStatus: 'NORMAL',
      optionsSendTo: {
        nodes: [
          {
            id: toId,
            fullName: 'Maynard Monahan',
            email: 'tim.-f02a3c7d39d3ff92@toptal.io',
            contacts: {
              nodes: [
                {
                  id: 'VjEtQ29udGFjdC0yNjA4MTc0',
                  value: 'tim.-f02a3c7d39d3ff92@toptal.io'
                }
              ]
            }
          }
        ]
      },
      emailCarbonCopyOptions: {
        nodes: []
      },
      viewerPendingCommunications: {
        nodes: []
      },
      blankEmailTemplate: {
        name: 'Blank template',
        id: 'VjEtRW1haWxUZW1wbGF0ZS05MDU0NQ'
      },
      renderedBlankEmailTemplate: {
        body: 'Hi Henrietta,\n\n\nMy best,\n{{sender.first_name}}\n\n{{sender.signature}}\n',
        subject: null
      },
      emailTemplates: {
        edges: [
          {
            node: {
              name: 'Activation Payment reminder after 3 days',
              id: 'VjEtRW1haWxUZW1wbGF0ZS0xMjI4MDk'
            },
            rendered: {
              body: 'Hi Henrietta,\r\n\r\nThis is a friendly reminder to set up your Toptal payment method.\r\n\r\nLog in to your Toptal account to choose how you’d like to receive payments from future engagements. Once selected, we’ll send you additional instructions to your inbox.\r\n\r\nIf you need extra time or have any questions, please reach out to us at payment@toptal.com.\r\n\r\nBest,\r\n{{sender.first_name}}\n\n{{sender.signature}}\r\n',
              subject: 'Set Up Your Toptal Payment Method'
            }
          }
        ]
      }
    }
  }
}

export default getRecipientMock
