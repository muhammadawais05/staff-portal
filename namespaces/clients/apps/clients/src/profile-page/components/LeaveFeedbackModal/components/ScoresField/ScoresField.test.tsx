import React from 'react'
import { Form, arrayMutators } from '@toptal/picasso-forms'
import { render } from '@toptal/picasso/test-utils'
import { EngagementSurveyQuestion } from '@staff-portal/graphql/staff'

import { SurveyEngagementFragment } from '../../../../data/survey-engagement-fragment'
import ScoresField from './'
import NegativeField from '../NegativeField'
import QuestionItem from '../QuestionItem'

jest.mock('../NegativeField', () => ({
  __esModule: true,
  default: jest.fn()
}))
jest.mock('../QuestionItem', () => ({
  __esModule: true,
  default: jest.fn()
}))

const mockedNegativeField = NegativeField as jest.Mock
const mockedQuestionItem = QuestionItem as jest.Mock

const questions = [{}] as EngagementSurveyQuestion[]

const renderComponent = ({ engagementsCount = 1 } = {}) => {
  return render(
    <Form
      onSubmit={() => {}}
      initialValues={{ scores: Array(1).fill(null) }}
      mutators={{ ...arrayMutators }}
    >
      <ScoresField
        engagements={
          {
            totalCount: engagementsCount
          } as NonNullable<SurveyEngagementFragment['engagements']>
        }
        questions={questions}
      />
    </Form>
  )
}

describe('ScoresField', () => {
  beforeEach(() => {
    mockedNegativeField.mockReturnValue(null)
    mockedQuestionItem.mockReturnValue(null)
  })

  describe('when called with expected props', () => {
    it('renders component', () => {
      renderComponent()

      expect(mockedQuestionItem).toHaveBeenCalledWith(
        {
          name: 'scores[0]',
          question: questions[0],
          value: null
        },
        {}
      )
    })
  })

  describe('when has more than one engagement to leave feedback', () => {
    it('renders negative component', () => {
      const totalCount = 2

      renderComponent({ engagementsCount: totalCount })

      expect(mockedNegativeField).toHaveBeenCalledWith(
        {
          engagements: { totalCount: totalCount },
          scoreIndex: 0
        },
        {}
      )
    })
  })
})
