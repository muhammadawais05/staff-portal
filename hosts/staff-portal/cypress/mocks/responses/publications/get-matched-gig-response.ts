export const getMatchedGigResponse = (
  claimerName: string,
  claimerId: string,
  requestId: string,
  description: string,
  requestTitle: string,
  status = 'MATCHED'
) => ({
  data: {
    node: {
      id: requestId,
      approvedAt: '2022-02-17T07:12:55-05:00',
      createdAt: '2022-02-17T07:12:49-05:00',
      createdBy: {
        id: 'participationId',
        role: {
          id: claimerId,
          fullName: claimerName,
          timeZone: {
            name: '(UTC+03:00) Europe - Moscow',
            value: 'Europe/Moscow',
            __typename: 'TimeZone'
          },
          webResource: {
            url: 'https://staging.toptal.net/platform/staff/staff/100010',
            text: claimerName,
            __typename: 'Link'
          },
          __typename: 'Staff'
        },
        __typename: 'GigParticipation'
      },
      claimedAt: '2022-02-17T07:12:55-05:00',
      claimedBy: {
        id: 'participationId',
        role: {
          id: claimerId,
          fullName: claimerName,
          timeZone: {
            name: '(UTC+03:00) Europe - Moscow',
            value: 'Europe/Moscow',
            __typename: 'TimeZone'
          },
          webResource: {
            url: 'https://staging.toptal.net/platform/staff/staff/100010',
            text: claimerName,
            __typename: 'Link'
          },
          __typename: 'Staff'
        },
        __typename: 'GigParticipation'
      },
      description: description,
      matchedAt: '2022-02-17T07:19:01-05:00',
      reachOuts: {
        totalCount: 1,
        __typename: 'GigWorkspaceConnection'
      },
      skills: ['Ruby'],
      slackConversations: {
        totalCount: 1,
        nodes: [
          {
            id: 'VjEtU2xhY2tXb3Jrc3BhY2UtNDU',
            channelUrl: 'slack://channel?team=T02856HKHFS&id=C038LFS6JE4',
            participations: {
              nodes: [
                {
                  id: 'VjEtR2lnUGFydGljaXBhdGlvbi02Ny1GVUxGSUxMRVItMTI1NjAw',
                  participationType: 'FULFILLER',
                  role: {
                    id: 'VjEtVGFsZW50LTExNTEzNg',
                    fullName: 'Troy Lebsack',
                    timeZone: {
                      name: '(UTC+07:00) Asia - Novosibirsk',
                      value: 'Asia/Novosibirsk',
                      __typename: 'TimeZone'
                    },
                    webResource: {
                      url: 'https://staging.toptal.net/platform/staff/talents/115136',
                      text: 'Troy Lebsack',
                      __typename: 'Link'
                    },
                    __typename: 'Talent'
                  },
                  __typename: 'GigParticipation'
                }
              ],
              __typename: 'GigParticipationConnection'
            },
            __typename: 'SlackWorkspace'
          }
        ],
        __typename: 'GigWorkspaceConnection'
      },
      status,
      title: requestTitle,
      updatedAt: '2022-02-17T07:19:01-05:00',
      __typename: 'PublicationGig'
    }
  }
})
