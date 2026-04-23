import { fireEvent, render, screen } from '@toptal/picasso/test-utils'
import React from 'react'
import { useMutation } from '@staff-portal/data-layer-service'
import { TestWrapper } from '@staff-portal/test-utils'

import CreateFeedbackMatcherAnswersModal from './CreateFeedbackMatcherAnswersModal'
import { useGetLeaveMatcherFeedbackData } from './data'

jest.mock('@staff-portal/data-layer-service')
jest.mock('./data', () => ({
  __esModule: true,
  useGetLeaveMatcherFeedbackData: jest.fn()
}))

const mockUseGetLeaveMatcherFeedbackData =
  useGetLeaveMatcherFeedbackData as jest.Mock
const mockUseMutation = useMutation as jest.Mock

const renderComponent = () => {
  window.Element.prototype.scrollIntoView = jest.fn()

  return render(
    <TestWrapper>
      <CreateFeedbackMatcherAnswersModal feedbackId='' hideModal={() => {}} />
    </TestWrapper>
  )
}

describe('CreateFeedbackMatcherAnswersModal', () => {
  it('renders and shows the success message after submit', async () => {
    mockUseMutation.mockReturnValue([
      () => ({
        data: {
          createFeedbackMatcherAnswers: {
            success: true,
            errors: []
          }
        }
      }),
      { loading: false }
    ])

    mockUseGetLeaveMatcherFeedbackData.mockReturnValue({
      data: {
        node: {
          matcherQuestions: {
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

    renderComponent()

    expect(screen.getByText('Job Feedback')).toBeInTheDocument()

    fireEvent.click(
      screen.getByTestId('create-feedback-matcher-answers-modal-submit-button')
    )

    expect(
      await screen.findByText('Please complete this field.')
    ).toBeInTheDocument()

    fireEvent.mouseEnter(screen.getByLabelText(/Yes/))

    expect(screen.getByText('Tooltip Content')).toBeInTheDocument()

    fireEvent.click(screen.getByLabelText(/Yes/))

    fireEvent.click(
      screen.getByTestId('create-feedback-matcher-answers-modal-submit-button')
    )

    expect(
      await screen.findByText('The Matcher Feedback was successfully created.')
    ).toBeInTheDocument()
  })

  it('shows the error message', async () => {
    mockUseMutation.mockImplementation(
      (_document, { onError }: { onError: () => void }) => [
        () => onError(),
        { loading: false }
      ]
    )

    mockUseGetLeaveMatcherFeedbackData.mockReturnValue({
      data: {
        node: {
          matcherQuestions: {
            edges: []
          }
        }
      },
      loading: false
    })

    renderComponent()

    fireEvent.click(
      screen.getByTestId('create-feedback-matcher-answers-modal-submit-button')
    )

    expect(
      await screen.findByText(
        'An error occurred, unable to leave Matcher Feedback.'
      )
    ).toBeInTheDocument()
  })

  it('shows the error message received from the API', async () => {
    const ERROR_MESSAGE = 'Server error message'

    mockUseGetLeaveMatcherFeedbackData.mockReturnValue({
      data: {
        node: {
          matcherQuestions: {
            edges: []
          }
        }
      },
      loading: false
    })

    mockUseMutation.mockReturnValue([
      () => ({
        data: {
          createFeedbackMatcherAnswers: {
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
      screen.getByTestId('create-feedback-matcher-answers-modal-submit-button')
    )

    expect(await screen.findByText(ERROR_MESSAGE)).toBeInTheDocument()
  })

  it('shows the root error message received from the API', async () => {
    const ERROR_MESSAGE = 'Server error message'

    mockUseGetLeaveMatcherFeedbackData.mockReturnValue({
      data: {
        node: {
          matcherQuestions: {
            edges: []
          }
        }
      },
      loading: false
    })

    mockUseMutation.mockReturnValue([
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
      screen.getByTestId('create-feedback-matcher-answers-modal-submit-button')
    )

    expect(await screen.findByText(ERROR_MESSAGE)).toBeInTheDocument()
  })
})
