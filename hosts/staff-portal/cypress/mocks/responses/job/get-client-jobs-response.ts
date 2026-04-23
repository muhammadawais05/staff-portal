import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getClientJobsResponse = () => ({
  data: {
    node: {
      jobs: {
        nodes: [
          {
            id: encodeEntityId('123', 'Job'),
            title: 'Test Job With Trial',
            postedAt: '2022-05-15T23:14:54-11:00',
            status: 'PENDING_ENGINEER',
            cumulativeStatus: 'PENDING_ENGINEER',
            talentCount: 1,
            hiredCount: 0,
            matcherCallScheduled: false,
            currentInvestigation: null,
            webResource: {
              url: 'https://staging.toptal.net/platform/staff/jobs/293647',
              __typename: 'Link'
            },
            engagements: {
              nodes: [
                {
                  id: encodeEntityId('123', 'Engagement'),
                  status: 'REVIEWED',
                  detailedStatus:
                    'Interview scheduled for May 16, 2022 at 12:00am (confirmed by developer)',
                  cumulativeStatus: 'interview_time_accepted',
                  restoredAt: null,
                  talentSentAt: '2022-05-15T23:28:06-11:00',
                  startDate: null,
                  createdAt: '2022-05-15T23:28:06-11:00',
                  rejectDate: null,
                  endDate: null,
                  trialLength: 5,
                  trialEndDate: null,
                  onHoldStartDate: null,
                  interview: {
                    id: encodeEntityId('123', 'Interview'),
                    cumulativeStatus: 'TIME_ACCEPTED',
                    scheduledAtTimes: ['2022-05-16T13:00:00+02:00'],
                    interviewTime: '2022-05-16T00:00:00-11:00',
                    verifierName: 'company',
                    __typename: 'Interview'
                  },
                  timeZone: null,
                  talent: {
                    id: encodeEntityId('123', 'Talent'),
                    type: 'Developer',
                    fullName: 'King Stroman',
                    webResource: {
                      url: 'https://staging.toptal.net/platform/staff/talents/3038967',
                      __typename: 'Link'
                    },
                    __typename: 'Talent'
                  },
                  operations: {
                    expireEngagement: {
                      callable: 'ENABLED',
                      messages: ['Interview is not set for expiration'],
                      __typename: 'Operation'
                    },
                    cancelEngagementInInterview: {
                      callable: 'ENABLED',
                      messages: [],
                      __typename: 'Operation'
                    },
                    __typename: 'EngagementOperations'
                  },
                  __typename: 'Engagement'
                }
              ],
              __typename: 'JobEngagementConnection'
            },
            operations: {
              removeJob: {
                callable: 'ENABLED',
                messages: [],
                __typename: 'Operation'
              },
              postponeJob: {
                callable: 'ENABLED',
                messages: [],
                __typename: 'Operation'
              },
              resumePostponedJob: {
                callable: 'ENABLED',
                messages: [
                  'Something went wrong. Please try again later.',
                  "Can't restore job in Pending engineer status"
                ],
                __typename: 'Operation'
              },
              sendJobAway: {
                callable: 'ENABLED',
                messages: [],
                __typename: 'Operation'
              },
              resumeSendingJobAway: {
                callable: 'HIDDEN',
                messages: [
                  'Something went wrong. Please try again later.',
                  "Can't send away job in status Pending engineer"
                ],
                __typename: 'Operation'
              },
              __typename: 'JobOperations'
            },
            __typename: 'Job'
          }
        ],
        __typename: 'ClientJobConnection'
      },
      __typename: 'Client'
    }
  }
})
