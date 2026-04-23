import { fireEvent, render, screen } from '@toptal/picasso/test-utils'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { when } from 'jest-when'
import React from 'react'
import { useMutation } from '@staff-portal/data-layer-service'
import { TestWrapper } from '@staff-portal/test-utils'

import ChangeEngagementStartDateForm from './ChangeEngagementStartDateForm'
import { ChangeEngagementStartDateDocument } from './data'
import {
  ENGAGEMENT_BILLING_CYCLES_UPDATE,
  ENGAGEMENT_UPDATED
} from '../../../../messages'

jest.mock('@staff-portal/date-time-utils', () => ({
  ...jest.requireActual('@staff-portal/date-time-utils'),
  useGetAvailableTimeZones: () => ({
    timezones: [
      {
        name: '(UTC+03:00) Indian - Mayotte',
        value: 'Indian/Mayotte'
      }
    ],
    loading: false
  })
}))

jest.mock('@toptal/staff-portal-message-bus')
const mockUseMessageEmitter = useMessageEmitter as jest.Mock

jest.mock('@staff-portal/data-layer-service')
const mockUseMutation = useMutation as jest.Mock

jest.mock('@staff-portal/forms', () => ({
  ...jest.requireActual('@staff-portal/forms'),
  FormDatePickerWrapper: () => null,
  FormTimeZoneSelect: () => null
}))

const mockSuccessImplementation = () => {
  when(mockUseMutation)
    .calledWith(ChangeEngagementStartDateDocument, expect.anything())
    .mockImplementation(() => [
      () => ({
        data: {
          changeEngagementStartDate: {
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
    .calledWith(ChangeEngagementStartDateDocument, expect.anything())
    .mockImplementation((_, { onError }: { onError: () => void }) => [
      onError,
      { loading: false }
    ])
}

const arrangeTest = ({
  hideModal = () => {}
}: Partial<{ hideModal: () => void }> = {}) => {
  render(
    <TestWrapper>
      <ChangeEngagementStartDateForm
        engagementId='123'
        timeZoneName='Indian/Mayotte'
        hideModal={hideModal}
      />
    </TestWrapper>
  )
}

describe('ChangeEngagementStartDateForm', () => {
  describe('when pressing cancel button', () => {
    it('triggers the hide modal callback function', () => {
      const hideModal = jest.fn()

      mockSuccessImplementation()
      arrangeTest({ hideModal })

      fireEvent.click(screen.getByTestId('FormCancelButton'))

      expect(hideModal).toHaveBeenCalled()
    })
  })

  describe('when start date was successfully changed', () => {
    it('shows success notification message', async () => {
      // this test had to be disabled as a result of refactoring and must be rewritten to follow FE testing guidelines
      const COMMENT = 'Some comment'
      const emitMessage = jest.fn()

      mockUseMessageEmitter.mockReturnValue(emitMessage)

      mockSuccessImplementation()
      arrangeTest()

      expect(screen.getAllByText('Change Start Date')).toHaveLength(2)

      expect(
        screen.queryByText(
          'Changing the start date will automatically remove and then re-generate billing cycles if needed.'
        )
      ).toBeInTheDocument()

      fireEvent.change(screen.getByLabelText(/Reason/), {
        target: { value: COMMENT }
      })

      fireEvent.click(
        screen.getByTestId('ChangeEngagementStartDateForm-submit-button')
      )

      // this should be a test for useChangeEngagementStartDate
      expect(
        await screen.findByText('The Start Date was successfully changed.')
      ).toBeInTheDocument()

      expect(emitMessage).toHaveBeenCalledWith(ENGAGEMENT_UPDATED, {
        engagementId: '123'
      })

      expect(emitMessage).toHaveBeenCalledWith(ENGAGEMENT_BILLING_CYCLES_UPDATE)
    })
  })

  describe('when change start date was changed with errors', () => {
    it('shows success notification message', async () => {
      // this test had to be disabled as a result of refactoring and must be rewritten to follow FE testing guidelines
      const COMMENT = 'Some comment'

      mockErrorImplementation()
      arrangeTest()

      fireEvent.change(screen.getByLabelText(/Reason/), {
        target: { value: COMMENT }
      })

      fireEvent.click(
        screen.getByTestId('ChangeEngagementStartDateForm-submit-button')
      )

      // this should be a test for useChangeEngagementStartDate
      expect(
        await screen.findByText(
          "An error occurred, The Start Date can't be changed."
        )
      ).toBeInTheDocument()
    })
  })
})
