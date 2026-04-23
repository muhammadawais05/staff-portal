import { EngagementSurveyAnswerKind, Maybe } from '@staff-portal/graphql/staff'

import { GetOtherEngagementSurveyAnswersQuery } from './get-other-engagement-survey-answers.staff.gql.types'
import { EngagementSurveyAnswerFragment } from '../engagement-survey-answer-fragment'
import { SurveryAnswerType } from '../../types'

export const createEngagementSurveyAnswerMock = ({
  type,
  question,
  decoratedAnswer
}: {
  type?: SurveryAnswerType
  question?: Maybe<string>
  decoratedAnswer?: Maybe<{
    alerted?: Maybe<boolean>
    value?: Maybe<string>
  }>
}) => ({
  type,
  question,
  decoratedAnswer
})

export const createEngagementSurveyAnswersMock = ({
  id = 'VjEtRW5nYWdlbWVudFN1cnZleUFuc3dlci04MjE3Mw',
  kind = EngagementSurveyAnswerKind.TALENT,
  answers = []
}: {
  id?: string
  kind?: EngagementSurveyAnswerKind
  answers?: EngagementSurveyAnswerFragment['answers']
} = {}): EngagementSurveyAnswerFragment => ({
  id,
  createdAt: '2021-01-12T23:24:29+03:00',
  kind,
  answers
})

export const createOtherEngagementSurveyAnswersMock = ({
  nodes = []
}: {
  nodes?: EngagementSurveyAnswerFragment[]
} = {}): GetOtherEngagementSurveyAnswersQuery => ({
  node: {
    id: 'some-id-3',
    surveyAnswers: {
      nodes
    }
  }
})
