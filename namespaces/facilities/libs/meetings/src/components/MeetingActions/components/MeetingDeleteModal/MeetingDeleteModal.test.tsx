import { useMutation } from '@staff-portal/data-layer-service'
import { TestWrapper } from '@staff-portal/test-utils'
import { fireEvent, render, screen } from '@toptal/picasso/test-utils'
import { when } from 'jest-when'
import React from 'react'

import { RemoveMeetingDocument } from './data'
import MeetingDeleteModal from './MeetingDeleteModal'

jest.mock('@staff-portal/modals-service', () => ({
  ...jest.requireActual('@staff-portal/modals-service'),
  ModalSuspender: () => <div data-testid='modal-suspender' />,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  PromptModal: ({ operationVariables, ...rest }: Record<string, unknown>) => {
    const ActualPromptModal = jest.requireActual(
      '@staff-portal/modals-service'
    ).PromptModal

    return <ActualPromptModal {...rest} />
  }
}))

jest.mock('@staff-portal/data-layer-service')
const mockUseMutation = useMutation as jest.Mock

const mockSuccessImplementation = () => {
  when(mockUseMutation)
    .calledWith(RemoveMeetingDocument, expect.anything())
    .mockImplementation(() => [
      () => ({
        data: {
          removeMeeting: {
            success: true,
            errors: []
          }
        }
      }),
      { loading: false }
    ])
}

const mockErrorImplementation = () => {
  when(mockUseMutation)
    .calledWith(RemoveMeetingDocument, expect.anything())
    .mockImplementation(() => [
      () => ({
        data: {
          removeMeeting: {
            meeting: null,
            success: false,
            errors: [
              {
                code: 'refusedOrRemoved',
                key: 'base',
                message: "You can't remove this meeting."
              }
            ]
          }
        }
      }),
      { loading: false }
    ])
}

const renderComponent = () => {
  return render(
    <TestWrapper>
      <MeetingDeleteModal
        meetingId='1'
        attendeeName='Test Name'
        hideModal={() => {}}
      />
    </TestWrapper>
  )
}

describe('MeetingDeleteModal', () => {
  describe('when pressing the submit button', () => {
    it('submit the form and display the notification message', async () => {
      mockSuccessImplementation()
      renderComponent()

      fireEvent.click(screen.getByTestId('CustomPromptButton-submit-button'))

      expect(
        await screen.findByText(
          'Meeting with Test Name was successfully deleted.'
        )
      ).toBeInTheDocument()
    })
  })

  describe('when the BE returns an error', () => {
    it('shows the error message', async () => {
      mockErrorImplementation()
      renderComponent()

      fireEvent.click(screen.getByTestId('CustomPromptButton-submit-button'))

      expect(
        await screen.findByText("You can't remove this meeting.")
      ).toBeInTheDocument()
    })
  })
})
