import { Talent } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getTalentEngagementRatesResponse = (talent?: Partial<Talent>) => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Talent'),
      engagements: {
        counters: {
          workingNumber: 0,
          clientsNumber: 0,
          repeatedClientsNumber: 0,
          acceptedInterviewsNumber: 0,
          approvedTrialsNumber: 0,
          interviewsNumber: 0,
          successRate: 0,
          trialsNumber: 0,
          __typename: 'TalentEngagementsCounters'
        },
        __typename: 'TalentEngagementConnection'
      },
      ...talent,
      __typename: 'Talent'
    }
  }
})
