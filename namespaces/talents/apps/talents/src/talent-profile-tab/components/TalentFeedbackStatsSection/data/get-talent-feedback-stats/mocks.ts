import {
  FeedbackStatsAnswerEntryFragment,
  FeedbackStatsEntryFragment
} from './get-talent-feedback-stats.staff.gql.types'
import { GET_TALENT_FEEDBACK_STATS } from './get-talent-feedback-stats.staff.gql'

type TypenamedFeedbackStatsEntries = (FeedbackStatsEntryFragment & {
  __typename: string
  answers: {
    __typename: string
    nodes: (FeedbackStatsAnswerEntryFragment & {
      __typename: string
    })[]
  }
})[]

export const defaultFeedbackStatsEntries: TypenamedFeedbackStatsEntries = [
  {
    __typename: 'FeedbackStatisticEntry',
    roleTitle: 'Client',
    answers: {
      __typename: 'FeedbackStatisticAnswerEntryConnection',
      nodes: [
        {
          __typename: 'FeedbackStatisticAnswerEntry',
          label: 'Hire again',
          tooltip:
            'How likely are you to hire the developer again for a similar project?',
          score: 80
        },
        {
          __typename: 'FeedbackStatisticAnswerEntry',
          label: 'Timeline adherence',
          tooltip: 'Did the developer adhere to your timelines?',
          score: 100
        },
        {
          __typename: 'FeedbackStatisticAnswerEntry',
          label: 'Communication',
          tooltip:
            'Are you happy with the communication style of the developer?',
          score: 100
        },
        {
          __typename: 'FeedbackStatisticAnswerEntry',
          label: 'Quality of work',
          tooltip: 'Are you satisfied with the quality of the work delivered?',
          score: 100
        }
      ],
      totalCount: 5
    }
  },
  {
    __typename: 'FeedbackStatisticEntry',
    roleTitle: 'Matcher',
    answers: {
      __typename: 'FeedbackStatisticAnswerEntryConnection',
      nodes: [
        {
          __typename: 'FeedbackStatisticAnswerEntry',
          label: 'Match again',
          tooltip: 'Would you match this client with this developer again?',
          score: 100
        },
        {
          __typename: 'FeedbackStatisticAnswerEntry',
          label: 'Talent quality of work',
          tooltip: 'Did the developer produce good work here?',
          score: 100
        },
        {
          __typename: 'FeedbackStatisticAnswerEntry',
          label: 'Client directions',
          tooltip: 'Did the client provide good work direction here?',
          score: 100
        }
      ],
      totalCount: 6
    }
  },
  {
    __typename: 'FeedbackStatisticEntry',
    roleTitle: 'Talent',
    answers: {
      __typename: 'FeedbackStatisticAnswerEntryConnection',
      nodes: [
        {
          __typename: 'FeedbackStatisticAnswerEntry',
          label: 'Work again',
          tooltip:
            'If the client had a similar project, how likely is it that you would work with them again?',
          score: 100
        },
        {
          __typename: 'FeedbackStatisticAnswerEntry',
          label: 'Clear direction',
          tooltip:
            'Did the client provide you with clear direction on the work to be done?',
          score: 100
        },
        {
          __typename: 'FeedbackStatisticAnswerEntry',
          label: 'Communication',
          tooltip: 'Are you happy with the communication style of the client?',
          score: 100
        },
        {
          __typename: 'FeedbackStatisticAnswerEntry',
          label: 'Deadlines',
          tooltip: 'Did the client set reasonable deadlines?',
          score: 100
        }
      ],
      totalCount: 6
    }
  }
]

export const createTalentFeedbackStatsMock = (
  talentId: string,
  feedbackStatsEntries: TypenamedFeedbackStatsEntries
) => ({
  request: { query: GET_TALENT_FEEDBACK_STATS, variables: { talentId } },
  result: {
    data: {
      node: {
        id: talentId,
        feedbackStatistics: {
          nodes: feedbackStatsEntries,
          __typename: 'FeedbackStatisticEntryConnection'
        },
        __typename: 'Talent'
      },
      __typename: 'Query'
    }
  }
})

export const createGetTalentFeedbackStatsFailedMock = (talentId: string) => ({
  request: { query: GET_TALENT_FEEDBACK_STATS, variables: { talentId } },
  error: new Error('Network error occurred')
})
