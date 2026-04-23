import { fireEvent, render, screen } from '@toptal/picasso/test-utils'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { when } from 'jest-when'
import React from 'react'
import { useMutation } from '@staff-portal/data-layer-service'
import { TestWrapper } from '@staff-portal/test-utils'

import ChangeEngagementEndDateForm from './ChangeEngagementEndDateForm'
import { ChangeEngagementEndDateDocument } from './data'
import {
  ENGAGEMENT_BILLING_CYCLES_UPDATE,
  ENGAGEMENT_UPDATED
} from '../../../../messages'

jest.mock('@toptal/staff-portal-message-bus')
const mockUseMessageEmitter = useMessageEmitter as jest.Mock

jest.mock('@staff-portal/data-layer-service')
const mockUseMutation = useMutation as jest.Mock

const mockSuccessImplementation = () => {
  when(mockUseMutation)
    .calledWith(ChangeEngagementEndDateDocument, expect.anything())
    .mockImplementation(() => [
      () => ({
        data: {
          changeEngagementEndDate: {
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
    .calledWith(ChangeEngagementEndDateDocument, expect.anything())
    .mockImplementation((_, { onError }: { onError: () => void }) => [
      onError,
      { loading: false }
    ])
}

const arrangeTest = ({
  hideModal = () => {}
}: Partial<{ hideModal: () => void }> = {}) =>
  render(
    <TestWrapper>
      <ChangeEngagementEndDateForm
        engagementId='123'
        endDate='2020-03-22'
        hideModal={hideModal}
      />
    </TestWrapper>
  )

describe('ChangeEngagementEndDateForm', () => {
  describe('when pressing cancel button', () => {
    it('triggers the hide modal callback function', () => {
      const hideModal = jest.fn()

      mockSuccessImplementation()
      arrangeTest({ hideModal })

      fireEvent.click(screen.getByTestId('FormCancelButton'))

      expect(hideModal).toHaveBeenCalled()
    })
  })

  describe('when end date was successfully changed', () => {
    it('shows success notification message', async () => {
      const COMMENT = 'Some comment'
      const emitMessage = jest.fn()

      mockUseMessageEmitter.mockReturnValue(emitMessage)

      mockSuccessImplementation()
      arrangeTest()

      expect(screen.getAllByText('Change End Date')).toHaveLength(2)

      expect(
        screen.queryByText(
          'Changing the end date will automatically remove and then re-generate billing cycles if needed.'
        )
      ).toBeInTheDocument()

      fireEvent.change(screen.getByLabelText(/Reason/), {
        target: { value: COMMENT }
      })

      fireEvent.click(
        screen.getByTestId('ChangeEngagementEndDateForm-submit-button')
      )

      expect(
        await screen.findByText('The End Date was successfully changed.')
      ).toBeInTheDocument()

      expect(emitMessage).toHaveBeenCalledWith(ENGAGEMENT_UPDATED, {
        engagementId: '123'
      })

      expect(emitMessage).toHaveBeenCalledWith(ENGAGEMENT_BILLING_CYCLES_UPDATE)
    })
  })

  describe('when change end date was changed with errors', () => {
    it('shows success notification message', async () => {
      const COMMENT = 'Some comment'

      mockErrorImplementation()
      arrangeTest()

      fireEvent.change(screen.getByLabelText(/Reason/), {
        target: { value: COMMENT }
      })

      fireEvent.click(
        screen.getByTestId('ChangeEngagementEndDateForm-submit-button')
      )

      expect(
        await screen.findByText(
          "An error occurred, the engagement date can't be changed."
        )
      ).toBeInTheDocument()
    })
  })
})
