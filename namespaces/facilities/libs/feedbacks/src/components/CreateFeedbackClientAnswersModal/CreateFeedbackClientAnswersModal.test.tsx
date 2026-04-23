import { fireEvent, render, screen } from '@toptal/picasso/test-utils'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'

import {
  useCreateFeedbackClientAnswers,
  useGetLeaveClientFeedbackData
} from './data'
import CreateFeedbackClientAnswersModal from './CreateFeedbackClientAnswersModal'

jest.mock('./data', () => ({
  __esModule: true,
  useGetLeaveClientFeedbackData: jest.fn(),
  useCreateFeedbackClientAnswers: jest.fn()
}))

const mockUseGetLeaveClientFeedbackData =
  useGetLeaveClientFeedbackData as jest.Mock

const mockCreateFeedbackClientAnswers =
  useCreateFeedbackClientAnswers as jest.Mock

const renderComponent = () => {
  window.Element.prototype.scrollIntoView = jest.fn()

  return render(
    <TestWrapper>
      <CreateFeedbackClientAnswersModal feedbackId='' hideModal={() => {}} />
    </TestWrapper>
  )
}

describe('CreateFeedbackClientAnswersModal', () => {
  it('renders and shows the success message after submit', async () => {
    mockUseGetLeaveClientFeedbackData.mockReturnValue({
      data: {
        node: {
          clientQuestions: {
            edges: [
              {
                text: 'test',
                node: {
                  id: '123',
                  identifier: 'option_1',
                  options: {
                    nodes: [
                      { id: '1', value: 'No' },
                      { id: '2', value: 'Yes', tooltip: 'Tooltip Content' }
                    ]
                  }
                }
              }
            ]
          }
        }
      },
      loading: false
    })

    mockCreateFeedbackClientAnswers.mockReturnValue([
      () => ({
        data: {
          createFeedbackClientAnswers: {
            success: true,
            errors: []
          }
        }
      }),
      { loading: false }
    ])

    renderComponent()

    expect(screen.getByText("Feedback on Client's behalf")).toBeInTheDocument()

    fireEvent.click(
      screen.getByTestId('create-feedback-client-answers-modal-submit-button')
    )

    expect(
      await screen.findByText('Please complete this field.')
    ).toBeInTheDocument()

    fireEvent.mouseEnter(screen.getByLabelText(/Yes/))

    expect(screen.getByText('Tooltip Content')).toBeInTheDocument()

    fireEvent.click(screen.getByLabelText(/Yes/))

    fireEvent.click(
      screen.getByTestId('create-feedback-client-answers-modal-submit-button')
    )

    expect(
      await screen.findByText('The Client Feedback was successfully created.')
    ).toBeInTheDocument()
  })

  it('shows the error message', async () => {
    mockUseGetLeaveClientFeedbackData.mockReturnValue({
      data: {
        node: {
          clientQuestions: {
            edges: []
          }
        }
      },
      loading: false
    })

    mockCreateFeedbackClientAnswers.mockImplementation(
      ({ onError }: { onError: () => void }) => [
        () => onError(),
        { loading: false }
      ]
    )

    renderComponent()

    fireEvent.click(
      screen.getByTestId('create-feedback-client-answers-modal-submit-button')
    )

    expect(
      await screen.findByText(
        'An error occurred, unable to leave client feedback.'
      )
    ).toBeInTheDocument()
  })

  it('shows the error message received from the API', async () => {
    const ERROR_MESSAGE = 'Server error message'

    mockUseGetLeaveClientFeedbackData.mockReturnValue({
      data: {
        node: {
          clientQuestions: {
            edges: []
          }
        }
      },
      loading: false
    })

    mockCreateFeedbackClientAnswers.mockReturnValue([
      () => ({
        data: {
          createFeedbackClientAnswers: {
            success: false,
            errors: [
              {
                code: 'code',
                key: 'base',
                message: ERROR_MESSAGE
              }
            ]
          }
        }
      }),
      { loading: false }
    ])

    renderComponent()

    fireEvent.click(
      screen.getByTestId('create-feedback-client-answers-modal-submit-button')
    )

    expect(await screen.findByText(ERROR_MESSAGE)).toBeInTheDocument()
  })

  it('shows the root error message received from the API', async () => {
    const ERROR_MESSAGE = 'Server error message'

    mockUseGetLeaveClientFeedbackData.mockReturnValue({
      data: {
        node: {
          clientQuestions: {
            edges: []
          }
        }
      },
      loading: false
    })

    mockCreateFeedbackClientAnswers.mockReturnValue([
      () => ({
        errors: [
          {
            code: 'code',
            key: 'base',
            message: ERROR_MESSAGE
          }
        ]
      }),
      { loading: false }
    ])

    renderComponent()

    fireEvent.click(
      screen.getByTestId('create-feedback-client-answers-modal-submit-button')
    )

    expect(await screen.findByText(ERROR_MESSAGE)).toBeInTheDocument()
  })
})
