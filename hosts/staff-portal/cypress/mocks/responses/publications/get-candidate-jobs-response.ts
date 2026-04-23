export const getCandidateJobsResponse = (candidateId:string) => ({
  data: {
    node: {
      id: candidateId,
      engagements: {
        nodes: [
          {
            id: 'VjEtRW5nYWdlbWVudC0xNzE3MzA',
            status: 'CANCELLED',
            cumulativeStatus: 'cancelled',
            createdAt: '2018-07-19T05:35:34+02:00',
            startDate: null,
            endDate: null,
            statusFeedback: {
              comment: 'This part was obfuscated, some content was here.',
              createdAt: '2018-08-03T04:47:36+02:00',
              reason: {
                name: 'Job was cancelled',
                __typename: 'FeedbackReason'
              },
              __typename: 'Feedback'
            },
            interview: {
              id: 'VjEtSW50ZXJ2aWV3LTE0Mjc5NA',
              cumulativeStatus: 'TIME_ACCEPTED',
              scheduledAtTimes: [
                '2018-07-19T17:30:00-05:00',
                '2018-07-20T09:30:00-05:00',
                '2018-07-20T10:30:00-05:00'
              ],
              interviewTime: '2018-07-20T16:30:00+02:00',
              verifierName: 'company',
              meeting: {
                id: 'VjEtTWVldGluZy0zODk4MjA',
                attendeeName: 'John Jones',
                topSchedulerMeeting: false,
                __typename: 'Meeting'
              },
              __typename: 'Interview'
            },
            client: {
              id: 'VjEtQ2xpZW50LTIzNjg4Nw',
              fullName: "O'Connell, McKenzie and Cremin",
              enterprise: false,
              __typename: 'Client'
            },
            job: {
              id: 'VjEtSm9iLTE0NTIyOA',
              client: {
                fullName: "O'Connell, McKenzie and Cremin",
                __typename: 'Client'
              },
              skillSets: {
                nodes: [
                  {
                    rating: 'EXPERT',
                    skill: {
                      id: 'VjEtU2tpbGwtMzY5MzY',
                      name: 'Ruby',
                      category: {
                        title: 'Languages',
                        description:
                          'e.g., Python, PHP, Java, C#, JavaScript, SQL',
                        __typename: 'SkillCategory'
                      },
                      __typename: 'Skill'
                    },
                    __typename: 'SkillSet'
                  }
                ],
                __typename: 'SkillSetConnection'
              },
              webResource: {
                text: 'Junior Decentralized Information Asset Program Developer (145228)',
                url: 'https://staging.toptal.net/platform/staff/jobs/145228',
                __typename: 'Link'
              },
              __typename: 'Job'
            },
            currentCommitment: {
              availability: 'full_time',
              __typename: 'AdjustedCommitment'
            },
            commitment: 'FULL_TIME',
            timeZone: null,
            __typename: 'Engagement'
          }
        ],
        __typename: 'TalentEngagementConnection'
      },
      __typename: 'Talent'
    }
  }
})
