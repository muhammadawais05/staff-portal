import React from 'react'
import { when } from 'jest-when'
import { fireEvent, render, screen } from '@toptal/picasso/test-utils'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { useMutation } from '@staff-portal/data-layer-service'
import { TestWrapper } from '@staff-portal/test-utils'
import { useGetOperation } from '@staff-portal/operations'

import RevertEngagementTrialToActiveModal from './RevertEngagementTrialToActiveModal'
import { RevertEngagementTrialToActiveDocument } from './data/revert-engagement-trial-to-active/revert-engagement-trial-to-active.staff.gql.types'
import { ENGAGEMENT_UPDATED } from '../../messages'

jest.mock('@toptal/staff-portal-message-bus', () => ({
  ...jest.requireActual('@toptal/staff-portal-message-bus'),
  __esModule: true,
  useMessageEmitter: jest.fn()
}))

jest.mock('@staff-portal/data-layer-service')
jest.mock(
  '@staff-portal/operations/src/components/LazyOperation/hooks/use-get-operation',
  () => ({
    __esModule: true,
    useGetOperation: jest.fn()
  })
)

const mockUseMutation = useMutation as jest.Mock

const mockSuccessImplementation = () => {
  when(mockUseMutation)
    .calledWith(RevertEngagementTrialToActiveDocument, expect.anything())
    .mockImplementation(() => [
      () => ({
        data: {
          revertEngagementTrialToActive: {
            success: true,
            errors: []
          }
        }
      }),
      { loading: false }
    ])
}

const arrangeTest = () => {
  window.Element.prototype.scrollIntoView = jest.fn()

  const mockUseGetOperation = useGetOperation as jest.Mock

  mockUseGetOperation.mockReturnValue({ enabled: true, loading: false })

  return render(
    <TestWrapper>
      <RevertEngagementTrialToActiveModal
        engagementId='1'
        hideModal={() => {}}
      />
    </TestWrapper>
  )
}

describe('RevertEngagementTrialToActiveModal', () => {
  it('renders the correct text content', async () => {
    mockSuccessImplementation()
    arrangeTest()

    expect(
      screen.getByText('Revert Engagement to Trial Period')
    ).toBeInTheDocument()

    expect(
      screen.getByText(
        `This action will return the engagement's status to "On Trial", remove all existing billing cycles, and create a new trial period.`
      )
    ).toBeInTheDocument()

    expect(
      screen.getByText(
        `The talent will be paid 0% of the amount due, and the client will be invoiced 0% until the trial is approved.`
      )
    ).toBeInTheDocument()

    expect(
      screen.getByTestId('ConfirmationModal-submit-button')
    ).toHaveTextContent('Revert to Trial')
  })

  it('emits the message on success', async () => {
    const emitMessage = jest.fn()
    const mockUseMessageEmitter = useMessageEmitter as jest.Mock

    mockUseMessageEmitter.mockReturnValue(emitMessage)

    mockSuccessImplementation()

    arrangeTest()

    fireEvent.change(screen.getByLabelText(/Comment/), {
      target: { value: 'Some Comment' }
    })

    fireEvent.click(screen.getByTestId('ConfirmationModal-submit-button'))

    expect(
      await screen.findByText('You reverted an engagement to the trial period.')
    ).toBeInTheDocument()

    expect(emitMessage).toHaveBeenCalledWith(ENGAGEMENT_UPDATED, {
      engagementId: '1'
    })
  })

  it('renders the invalid field errors and the error notification message', async () => {
    mockUseMutation.mockImplementation(
      (_document, { onError }: { onError: () => void }) => [
        () => onError(),
        { loading: false }
      ]
    )

    arrangeTest()

    fireEvent.click(screen.getByTestId('ConfirmationModal-submit-button'))

    expect(
      await screen.findByText('Please complete this field.')
    ).toBeInTheDocument()

    fireEvent.change(screen.getByLabelText(/Comment/), {
      target: { value: 'Some Comment' }
    })

    fireEvent.click(screen.getByTestId('ConfirmationModal-submit-button'))

    expect(
      await screen.findByText(
        'An error occurred, unable engagement to revert to trial.'
      )
    ).toBeInTheDocument()
  })

  it('renders the error notification message received from the API', async () => {
    const ERROR_MESSAGE = 'Server error message'

    mockUseMutation.mockReturnValue([
      () => ({
        data: {
          revertEngagementTrialToActive: {
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

    arrangeTest()

    fireEvent.change(screen.getByLabelText(/Comment/), {
      target: { value: 'Some Comment' }
    })

    fireEvent.click(screen.getByTestId('ConfirmationModal-submit-button'))

    expect(await screen.findByText(ERROR_MESSAGE)).toBeInTheDocument()
  })
})
