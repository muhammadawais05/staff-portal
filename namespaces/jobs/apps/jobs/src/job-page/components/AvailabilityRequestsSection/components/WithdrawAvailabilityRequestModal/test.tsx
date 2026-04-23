import { fireEvent, render, screen } from '@toptal/picasso/test-utils'
import React, { ComponentProps } from 'react'
import { TestWrapper } from '@staff-portal/test-utils'

import { useWithdrawAvailabilityRequest } from './data/withdraw-availability-request'
import { useGetWithdrawAvailabilityRequestReasons } from './data/get-withdraw-availability-request-reasons'
import WithdrawAvailabilityRequestModal from './WithdrawAvailabilityRequestModal'

jest.mock('./data/get-withdraw-availability-request-reasons', () => ({
  __esModule: true,
  useGetWithdrawAvailabilityRequestReasons: jest.fn()
}))
jest.mock('./data/withdraw-availability-request', () => ({
  __esModule: true,
  useWithdrawAvailabilityRequest: jest.fn()
}))

const FEEDBACK_REASON_1 = {
  id: 'VjEtRmVlZGJh',
  identifier: 'proceeding_with_other_talent',
  nameForRole: 'Client is proceeding',
  defaultComment: 'some comment 1'
}
const FEEDBACK_REASON_2 = {
  id: 'VjEtRmVlZGJhY2',
  identifier: 'lacking_required_skill',
  nameForRole: 'Job requirements',
  defaultComment: 'some comment 2'
}

const mockReturnValues = () => {
  const useGetWithdrawAvailabilityRequestReasonsMock =
    useGetWithdrawAvailabilityRequestReasons as jest.Mock
  const useWithdrawAvailabilityRequestMock =
    useWithdrawAvailabilityRequest as jest.Mock

  useWithdrawAvailabilityRequestMock.mockReturnValue([
    () => ({ data: { withdrawAvailabilityRequest: { success: true } } }),
    { loading: false }
  ])

  useGetWithdrawAvailabilityRequestReasonsMock.mockReturnValue({
    reasons: [FEEDBACK_REASON_1, FEEDBACK_REASON_2]
  })
}

const arrangeTest = () => {
  window.Element.prototype.scrollIntoView = jest.fn()
  mockReturnValues()

  const defaultProps: ComponentProps<typeof WithdrawAvailabilityRequestModal> =
    {
      availabilityRequestId: '1',
      hideModal: jest.fn()
    }

  return render(
    <TestWrapper>
      <WithdrawAvailabilityRequestModal {...defaultProps} />
    </TestWrapper>
  )
}

describe('WithdrawAvailabilityRequestModal', () => {
  it('shows feedback reason options', async () => {
    arrangeTest()
    fireEvent.click(screen.getByLabelText(/Reason/))
    expect(
      await screen.findByText(FEEDBACK_REASON_1.nameForRole)
    ).toBeInTheDocument()
    expect(
      await screen.findByText(FEEDBACK_REASON_2.nameForRole)
    ).toBeInTheDocument()
  })

  it('updates description when reason changes', async () => {
    arrangeTest()
    fireEvent.click(screen.getByLabelText(/Reason/))
    fireEvent.click(await screen.findByText(FEEDBACK_REASON_1.nameForRole))
    expect(
      await screen.findByText(FEEDBACK_REASON_1.defaultComment)
    ).toBeInTheDocument()
  })
})
