export const completeGigRequestResponse = (
  claimerName: string,
  claimerId: string,
  requestId: string,
  description: string,
  requestTitle: string,
  candidateId: string
) => ({
  data: {
    completeGig: {
      success: true,
      errors: [],
      __typename: 'CompleteGigPayload',
      gig: {
        id: requestId,
        approvedAt: '2022-02-18T04:12:47-05:00',
        createdAt: '2022-02-18T04:12:34-05:00',
        createdBy: {
          id: 'VjEtR2lnUGFydGljaXBhdGlvbi04My1DTEFJTUVSLTEwMDAxMA',
          role: {
            id: claimerId,
            fullName: claimerName,
            timeZone: {
              name: '(UTC+01:00) Europe - Paris',
              value: 'Europe/Paris',
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
        claimedAt: '2022-02-18T04:12:47-05:00',
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
        matchedAt: '2022-02-18T05:19:38-05:00',
        reachOuts: {
          totalCount: 1,
          __typename: 'GigWorkspaceConnection'
        },
        skills: ['Ruby'],
        slackConversations: {
          totalCount: 1,
          nodes: [
            {
              id: 'slack-conversation-1',
              channelUrl: 'slack://channel?team=T02856HKHFS&id=C033Q8L4CCT',
              participations: {
                nodes: [
                  {
                    id: 'VjEtR2lnUGFydGljaXBhdGlvbi04My1GVUxGSUxMRVItMTE0ODU2',
                    participationType: 'FULFILLER',
                    role: {
                      id: candidateId,
                      fullName: 'Corie Leuschke',
                      webResource: {
                        url: 'https://staging.toptal.net/platform/staff/talents/308424',
                        text: 'Corie Leuschke',
                        __typename: 'Link'
                      },
                      timeZone: {
                        name: '(UTC+03:00) Europe - Moscow',
                        value: 'Europe/Moscow',
                        __typename: 'TimeZone'
                      },
                      __typename: 'Talent'
                    }
                  }
                ]
              },
              __typename: 'SlackWorkspace'
            }
          ],
          __typename: 'GigWorkspaceConnection'
        },
        status: 'COMPLETED',
        title: requestTitle,
        updatedAt: '2022-02-18T05:20:06-05:00',
        __typename: 'PublicationGig'
      }
    }
  }
})
