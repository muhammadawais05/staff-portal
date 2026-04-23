import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import {
  ApplicationQuestion,
  ApplicationQuestionKinds
} from '@staff-portal/graphql/staff'
import { Form } from '@toptal/picasso-forms'

import ApplicationQuestionItem from './ApplicationQuestionItem'

const arrangeTest = (question: ApplicationQuestion) =>
  render(
    <TestWrapper>
      <Form onSubmit={() => {}}>
        <ApplicationQuestionItem question={question} />
      </Form>
    </TestWrapper>
  )

describe('ApplicationQuestionItem', () => {
  it('renders text type question', () => {
    const question = {
      kind: ApplicationQuestionKinds.TEXT,
      id: 'question-id',
      options: {
        nodes: [],
        totalCount: 0
      },
      requiredForStaff: false,
      label: 'Current company'
    }

    arrangeTest(question)

    expect(screen.getByLabelText(/Current company/i)).toBeInTheDocument()
    expect(screen.getByTestId('application-question-text')).toBeInTheDocument()
    expect(
      screen.queryByTestId('application-question-select')
    ).not.toBeInTheDocument()
  })

  it('renders select type question', () => {
    const question = {
      kind: ApplicationQuestionKinds.SELECT,
      id: 'question-id',
      options: {
        nodes: [
          {
            content: 'Less than 1 year',
            id: 'VjEtQXBwbGljYXRpb25RdWVzdGlvbk9wdGlvbi0zMzUyNA'
          },
          {
            content: '1 to 2 years',
            id: 'VjEtQXBwbGljYXRpb25RdWVzdGlvbk9wdGlvbi0zMzUyNQ'
          },
          {
            content: '2 to 5 years',
            id: 'VjEtQXBwbGljYXRpb25RdWVzdGlvbk9wdGlvbi0zMzUyNg'
          },
          {
            content: 'More than 5 years',
            id: 'VjEtQXBwbGljYXRpb25RdWVzdGlvbk9wdGlvbi0zMzUyNw'
          }
        ],
        totalCount: 4
      },
      requiredForStaff: false,
      label: 'Which type of job commitment do you prefer?'
    }

    arrangeTest(question)

    expect(
      screen.getByLabelText(/Which type of job commitment do you prefer?/i)
    ).toBeInTheDocument()
    expect(
      screen.getByTestId('application-question-select')
    ).toBeInTheDocument()

    fireEvent.click(
      screen.getByLabelText(/Which type of job commitment do you prefer?/i)
    )

    expect(screen.getAllByRole('option')).toHaveLength(4)
    expect(
      screen.queryByTestId('application-question-text')
    ).not.toBeInTheDocument()
  })
})
