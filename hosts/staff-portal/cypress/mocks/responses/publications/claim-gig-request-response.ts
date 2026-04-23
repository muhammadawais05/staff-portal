export const claimGigRequestResponse = (
  claimerName: string,
  claimerId: string,
  requestId: string,
  description: string,
  requestTitle: string
) => ({
  data: {
    claimGig: {
      gig: {
        id: requestId,
        approvedAt: '2022-01-31T06:58:26-05:00',
        createdAt: '2022-01-31T06:58:17-05:00',
        createdBy: {
          id: 'VjEtR2lnUGFydGljaXBhdGlvbi04My1DTEFJTUVSLTEwMDAxMA',
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
          }
        },
        claimedAt: '2022-01-31T06:58:26-05:00',
        claimedBy: {
          id: 'VjEtR2lnUGFydGljaXBhdGlvbi04My1DTEFJTUVSLTEwMDAxMA',
          role: {
            id: claimerId,
            fullName: claimerName,
            webResource: {
              url: 'https://staging.toptal.net/platform/staff/staff/100010',
              text: claimerName,
              __typename: 'Link'
            },
            timeZone: {
              name: '(UTC+03:00) Europe - Moscow',
              value: 'Europe/Moscow',
              __typename: 'TimeZone'
            },
            __typename: 'Staff'
          }
        },
        description: description,
        matchedAt: null,
        reachOuts: {
          totalCount: 0,
          __typename: 'GigWorkspaceConnection'
        },
        skills: ['Ruby'],
        slackConversations: {
          totalCount: 0,
          nodes: [],
          __typename: 'GigWorkspaceConnection'
        },
        status: 'APPROVED',
        title: requestTitle,
        updatedAt: '2022-01-31T06:58:26-05:00',
        __typename: 'PublicationGig'
      },
      success: true,
      errors: [],
      __typename: 'ClaimGigPayload'
    }
  }
})
