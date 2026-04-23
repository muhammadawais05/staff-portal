import { TalentCumulativeStatus } from '@staff-portal/graphql/staff'

import { GetTalentStatsSectionDocument } from './get-talent-stats-section.staff.gql.types'

export const createGetTalentStatsSectionMock = ({
  talentId,
  cumulativeStatus
}: {
  talentId: string
  cumulativeStatus: TalentCumulativeStatus
}) => ({
  request: {
    query: GetTalentStatsSectionDocument,
    variables: { talentId }
  },
  result: {
    data: {
      node: {
        id: talentId,
        cumulativeStatus: cumulativeStatus,
        engagements: {
          counters: {
            trialSuccessRate: 0,
            successfulTrialsNumber: 0,
            rejectedTrialsNumber: 0,
            __typename: 'TalentEngagementsCounters',
            workingNumber: 0,
            clientsNumber: 0,
            repeatedClientsNumber: 0,
            acceptedInterviewsNumber: 0,
            approvedTrialsNumber: 0,
            interviewsNumber: 0,
            successRate: 0,
            trialsNumber: 0
          },
          __typename: 'TalentEngagementConnection'
        },
        __typename: 'Talent',
        availabilityResponseSpeed: null,
        feedbackStatistics: {
          nodes: [],
          __typename: 'FeedbackStatisticEntryConnection'
        },
        deltaWaitingDays: null,
        lastClosedEngagementEndDate: null,
        lastAvailabilityIncreaseDate: null,
        eligibleJobsStatistics: {
          __typename: 'TalentEligibleJobsStatistics',
          alreadyInterviewing: 0,
          beFirstToApply: 0,
          candidatesIntroducedToClient: 0,
          reviewingApplications: 0
        }
      }
    }
  }
})

export const createGetTalentStatsSectionFailedMock = ({
  talentId
}: {
  talentId: string
}) => ({
  request: {
    query: GetTalentStatsSectionDocument,
    variables: { talentId }
  },
  error: new Error('Mocked Error')
})
