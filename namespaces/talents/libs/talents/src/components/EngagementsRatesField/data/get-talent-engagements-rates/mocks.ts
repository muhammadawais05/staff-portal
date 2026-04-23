import { GET_TALENT_ENGAGEMENTS_RATES } from './get-talent-engagements-rates.staff.gql'

export const createGetTalentEngagementsRatesMock = ({
  talentId
}: {
  talentId: string
}) => ({
  request: {
    query: GET_TALENT_ENGAGEMENTS_RATES,
    variables: { talentId }
  },
  result: {
    data: {
      node: {
        id: talentId,
        engagements: {
          counters: {
            acceptedInterviewsNumber: 10,
            approvedTrialsNumber: 5,
            interviewsNumber: 10,
            successRate: 6,
            trialsNumber: 4,
            workingNumber: 0,
            clientsNumber: 0,
            repeatedClientsNumber: 0,
            __typename: 'TalentEngagementsCounters'
          },
          __typename: 'TalentEngagementConnection'
        },
        __typename: 'Talent'
      }
    }
  }
})

export const createGetTalentEngagementsRatesFailedMock = ({
  talentId
}: {
  talentId: string
}) => ({
  request: {
    query: GET_TALENT_ENGAGEMENTS_RATES,
    variables: { talentId }
  },
  error: new Error('Mocked Error')
})
