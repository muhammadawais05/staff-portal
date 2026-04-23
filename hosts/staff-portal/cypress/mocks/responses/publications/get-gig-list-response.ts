export const getGigListResponse = (
  claimerName: string,
  claimerId: string,
  requestId: string,
  description: string,
  requestTitle: string
) => ({
  data: {
    gigs: {
      totalCount: 1,
      nodes: [
        {
          id: requestId,
          approvedAt: null,
          createdAt: '2022-01-18T09:56:57-05:00',
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
          claimedAt: null,
          claimedBy: null,
          description: description,
          matchedAt: null,
          reachOuts: {
            totalCount: 0,
            __typename: 'GigWorkspaceConnection'
          },
          skills: ['Ruby'],
          slackConversations: {
            nodes: [],
            totalCount: 0,
            __typename: 'GigWorkspaceConnection'
          },
          status: 'PENDING',
          title: requestTitle,
          updatedAt: '2022-01-18T09:56:57-05:00',
          __typename: 'PublicationGig'
        }
      ],
      __typename: 'GigConnection'
    }
  }
})
