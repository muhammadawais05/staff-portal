import { encodeEntityId } from '@staff-portal/data-layer-service'
import { Subject, JobOperations } from '@staff-portal/graphql/staff'

import { enabledOperationMock } from '~integration/mocks'
import { timeZoneMock } from '~integration/mocks/fragments'
import { hiddenOperationMock } from '~integration/mocks/hidden-operation-mock'

type Props = {
  subjects?: Partial<Subject[]>
  jobOperations?: Partial<JobOperations>
}

export const getJobResponse = ({ jobOperations }: Props = {}) => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Job'),
      __typename: 'Job',
      title: 'Junior Brand Experience Engager Designer (267944)',
      availabilityRequests: {
        totalCount: 17,
        __typename: 'AvailabilityRequestConnection'
      },
      claimerOrHandoff: {
        id: encodeEntityId('123', 'Staff'),
        webResource: {
          text: 'Rafael Serrano',
          url: 'https://staging.toptal.net/platform/staff/staff/2450571',
          __typename: 'Link'
        },
        __typename: 'Staff',
        fullName: 'Rafael Serrano'
      },
      client: {
        claimer: {
          id: encodeEntityId('123', 'Staff'),
          webResource: {
            text: 'Jamie K. Meshew',
            url: 'https://staging.toptal.net/platform/staff/staff/2068172',
            __typename: 'Link'
          },
          __typename: 'Staff'
        },
        id: encodeEntityId('123', 'Client'),
        webResource: {
          text: 'Cruickshank-Crooks WQ',
          url: 'https://staging.toptal.net/platform/staff/companies/2839988',
          __typename: 'Link'
        },
        __typename: 'Client',
        fullName: 'Cruickshank-Crooks WQ'
      },
      commitment: 'part_time',
      cumulativeStatus: 'ACTIVE',
      currentInvestigation: null,
      historyLink: null,
      description: 'Lorem ipsum dolor sit amet',
      engagementEndedFeedbackReason: null,
      estimatedLength: 'LENGTH_3_6_MONTHS',
      hiredCount: 1,
      jobType: 'designer',
      matcherCallScheduled: false,
      postedAt: '2021-10-30T05:11:31+03:00',
      searchCandidatesUrl: null,
      semiMonthlyBilling: null,
      originalJob: null,
      probabilityToConvert: null,
      estimatedValue: '20163.84',
      estimatedRevenue: '37080.0',
      sendCandidateUrl: null,
      skillSets: {
        totalCount: 4,
        __typename: 'SkillSetConnection'
      },
      specialization: {
        id: encodeEntityId('123', 'Specialization'),
        title: 'Digital Design',
        __typename: 'Specialization'
      },
      startDate: '2021-11-10',
      status: 'ACTIVE',
      talentCount: 1,
      timeZonePreference: timeZoneMock(),
      hasPreferredHours: true,
      hoursOverlap: 1,
      totalHours: 0,
      visibleAt: '2021-11-04T02:02:01+03:00',
      applications: {
        totalCount: 0,
        __typename: 'JobApplicationConnection'
      },
      assigned: {
        totalCount: 1,
        __typename: 'JobEngagementConnection'
      },
      breaks: {
        nodes: [
          {
            id: encodeEntityId('123', 'Engagement'),
            engagementBreaks: {
              nodes: [],
              __typename: 'EngagementBreakConnection'
            },
            __typename: 'Engagement'
          }
        ],
        __typename: 'JobEngagementConnection'
      },
      candidates: {
        totalCount: 2,
        __typename: 'JobEngagementConnection'
      },
      currentEngagement: {
        nodes: [
          {
            id: encodeEntityId('123', 'Engagement'),
            startDate: '2021-11-17',
            endDate: null,
            accessibleBillingCycles: {
              totalCount: 6,
              __typename: 'BillingCyclesConnection'
            },
            talent: {
              id: encodeEntityId('123', 'Talent'),
              __typename: 'Talent'
            },
            clientEmailMessaging: {
              id: encodeEntityId('123', 'EmailMessagingEngagementClient'),
              operations: {
                sendEmailTo: enabledOperationMock(),
                __typename: 'EmailMessagingOperation'
              },
              __typename: 'EmailMessagingEngagementClient'
            },
            talentEmailMessaging: {
              id: encodeEntityId('123', 'EmailMessagingEngagementTalent'),
              operations: {
                sendEmailTo: enabledOperationMock(),
                __typename: 'EmailMessagingOperation'
              },
              __typename: 'EmailMessagingEngagementTalent'
            },
            __typename: 'Engagement'
          }
        ],
        __typename: 'JobEngagementConnection'
      },
      webResource: {
        url: 'https://staging.toptal.net/platform/staff/jobs/267944',
        text: 'Junior Brand Experience Engager Designer (267944)',
        __typename: 'Link'
      },
      invoiceNote: null,
      operations: {
        approveJob: hiddenOperationMock(),
        removeJob: hiddenOperationMock(),
        resumePostponedJob: hiddenOperationMock(),
        __typename: 'JobOperations',
        ...jobOperations
      }
    }
  }
})
