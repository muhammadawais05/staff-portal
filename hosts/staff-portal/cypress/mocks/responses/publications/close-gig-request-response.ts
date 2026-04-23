export const closeGigRequestResponse = (
  claimerName: string,
  claimerId: string,
  requestId: string,
  description: string,
  requestTitle: string
) => ({
  data: {
    closeGig: {
      success: true,
      errors: [],
      __typename: 'CloseGigPayload',
      gig: {
        id: requestId,
        approvedAt: '2022-05-24T04:22:49-04:00',
        createdAt: '2022-05-24T04:17:34-04:00',
        createdBy: {
          id: 'VjEtR2lnUGFydGljaXBhdGlvbi03OS1SRVFVRVNUT1ItMTAwMDEw',
          role: {
            id: 'VjEtU3RhZmYtMTAwMDEw',
            fullName: 'Alexander Danilenko',
            timeZone: {
              name: '(UTC+03:00) Europe - Moscow',
              value: 'Europe/Moscow',
              __typename: 'TimeZone'
            },
            webResource: {
              url: 'https://staging.toptal.net/platform/staff/staff/100010',
              text: 'Alexander Danilenko',
              __typename: 'Link'
            },
            __typename: 'Staff'
          },
          __typename: 'GigParticipation'
        },
        claimedAt: '2022-05-24T04:22:49-04:00',
        claimedBy: {
          id: 'VjEtR2lnUGFydGljaXBhdGlvbi03OS1DTEFJTUVSLTIzODQ4OTc',
          role: {
            id: claimerId,
            fullName: claimerName,
            timeZone: {
              name: '(UTC-07:00) America - Vancouver',
              value: 'America/Vancouver',
              __typename: 'TimeZone'
            },
            webResource: {
              url: 'https://staging.toptal.net/platform/staff/staff/2384897',
              text: 'Lester Lemke',
              __typename: 'Link'
            },
            __typename: 'Staff'
          },
          __typename: 'GigParticipation'
        },
        reachOuts: {
          totalCount: 1,
          __typename: 'GigWorkspaceConnection'
        },
        slackConversations: {
          nodes: [],
          totalCount: 0,
          __typename: 'GigWorkspaceConnection'
        },
        description,
        matchedAt: null,
        skills: ['JavaScript'],
        status: 'CLOSED',
        title: requestTitle,
        updatedAt: '2022-05-24T10:40:09-04:00',
        __typename: 'PublicationGig'
      }
    }
  }
})
