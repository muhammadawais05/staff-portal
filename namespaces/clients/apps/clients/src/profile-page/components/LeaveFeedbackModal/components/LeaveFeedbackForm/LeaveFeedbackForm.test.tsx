import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { EngagementSurveyQuestion, Link } from '@staff-portal/graphql/staff'
import { useModalFormChangeHandler } from '@staff-portal/mutation-result-handlers'

import { SurveyEngagementFragment } from '../../../../data/survey-engagement-fragment'
import {
  ScoresField,
  LeaveFeedbackIntro,
  CommentsField
} from '../../components'
import LeaveFeedbackForm from './LeaveFeedbackForm'
import { validate } from './utils'

jest.mock('./utils', () => ({
  validate: jest.fn()
}))
jest.mock('../../components', () => ({
  ScoresField: jest.fn(),
  LeaveFeedbackIntro: jest.fn(),
  CommentsField: jest.fn()
}))
jest.mock('@staff-portal/mutation-result-handlers', () => ({
  useModalFormChangeHandler: jest.fn()
}))

const useModalFormChangeHandlerMock = useModalFormChangeHandler as jest.Mock
const mockedScoresField = ScoresField as jest.Mock
const mockedLeaveFeedbackIntro = LeaveFeedbackIntro as jest.Mock
const mockedCommentsField = CommentsField as jest.Mock
const validateMock = validate as jest.Mock

describe('LeaveFeedbackForm', () => {
  it('calls components with expected props', () => {
    const engagements = {
      totalCount: 2,
      nodes: [{ id: 'id-1' }, { id: 'id-2' }]
    } as NonNullable<SurveyEngagementFragment['engagements']>
    const questions = {} as EngagementSurveyQuestion[]
    const webResource = {} as Link

    mockedScoresField.mockReturnValue(null)
    mockedLeaveFeedbackIntro.mockReturnValue(null)
    mockedCommentsField.mockReturnValue(null)
    useModalFormChangeHandlerMock.mockReturnValue({
      handleSubmit: () => {},
      loading: false
    })

    render(
      <TestWrapper>
        <LeaveFeedbackForm
          hideModal={() => {}}
          webResource={webResource}
          companyId='companyId'
          questions={questions}
          engagements={engagements}
        />
      </TestWrapper>
    )

    expect(validateMock).toHaveBeenCalledWith(
      {
        scores: Array(questions.length).fill(null),
        negative: [],
        comments: engagements.nodes.map(({ id }) => ({
          engagementId: id,
          comment: ''
        }))
      },
      engagements.totalCount
    )
    expect(mockedLeaveFeedbackIntro).toHaveBeenCalledWith(
      { engagements, webResource },
      {}
    )
    expect(mockedScoresField).toHaveBeenCalledWith(
      { questions, engagements },
      {}
    )
    expect(mockedCommentsField).toHaveBeenCalledWith({ engagements }, {})
    expect(screen.getByTestId('leave-feedback-modal-form')).toBeInTheDocument()
    expect(
      screen.getByTestId('leave-feedback-modal-submit')
    ).toBeInTheDocument()
  })
})
