import { Talent } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getTalentStatsSectionResponse = (talent?: Partial<Talent>) => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Talent'),
      cumulativeStatus: 'ACTIVE',
      engagements: {
        counters: {
          trialSuccessRate: 100,
          successfulTrialsNumber: 1,
          rejectedTrialsNumber: 0,
          __typename: 'TalentEngagementsCounters',
          workingNumber: 2,
          clientsNumber: 2,
          repeatedClientsNumber: 0,
          acceptedInterviewsNumber: 10,
          approvedTrialsNumber: 2,
          interviewsNumber: 16,
          successRate: 13,
          trialsNumber: 2
        },
        __typename: 'TalentEngagementConnection'
      },
      __typename: 'Talent',
      availabilityResponseSpeed: 'FAST',
      feedbackStatistics: {
        nodes: [],
        __typename: 'FeedbackStatisticEntryConnection'
      },
      deltaWaitingDays: 0,
      lastClosedEngagementEndDate: null,
      lastAvailabilityIncreaseDate: '2021-03-10',
      eligibleJobsStatistics: {
        alreadyInterviewing: 3,
        beFirstToApply: 2,
        candidatesIntroducedToClient: 22,
        reviewingApplications: 4,
        __typename: 'TalentEligibleJobsStatistics'
      },
      ...talent
    }
  }
})
