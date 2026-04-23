import React, { ComponentProps } from 'react'
import { useModal } from '@staff-portal/modals-service'
import { TestWrapper } from '@staff-portal/test-utils'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { fireEvent, render, screen, waitFor } from '@toptal/picasso/test-utils'

import MeetingMarkAsCompletedWithSurveyButton from './MeetingMarkAsCompletedWithSurveyButton'

jest.mock('@staff-portal/modals-service', () => ({
  ...jest.requireActual('@staff-portal/modals-service'),
  useModal: jest.fn()
}))

const mockedUseModal = useModal as jest.Mock
const showModal = jest.fn()

const arrangeTest = (
  options?: Partial<
    ComponentProps<typeof MeetingMarkAsCompletedWithSurveyButton>
  >
) => {
  const props = {
    meetingId: '123',
    muted: false,
    operation: {
      callable: OperationCallableTypes.ENABLED,
      messages: []
    },
    ...options
  }

  return render(
    <TestWrapper>
      <MeetingMarkAsCompletedWithSurveyButton {...props} />
    </TestWrapper>
  )
}

describe('MeetingMarkAsCompletedWithSurveyButton', () => {
  beforeEach(() => {
    mockedUseModal.mockReturnValue({ showModal })
  })

  describe('when the operation is enabled', () => {
    it('shows the button', async () => {
      arrangeTest()
      const button = screen.getByRole('button', { name: 'Mark as Completed' })

      expect(button).toBeInTheDocument()

      fireEvent.click(button)

      await waitFor(() => {
        expect(showModal).toHaveBeenCalled()
      })
    })
  })

  describe('when the operation is hidden', () => {
    it('does not show the button', () => {
      arrangeTest({
        operation: {
          callable: OperationCallableTypes.HIDDEN,
          messages: []
        }
      })

      expect(
        screen.queryByRole('button', { name: 'Mark as Completed' })
      ).not.toBeInTheDocument()
    })
  })
})
