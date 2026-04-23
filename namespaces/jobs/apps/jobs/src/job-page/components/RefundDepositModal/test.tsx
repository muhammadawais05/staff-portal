import React from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import useRefundJobDepositMutation from './hooks/use-refund-deposit-mutation'
import RefundDepositModal from './RefundDepositModal'

jest.mock('./hooks/use-refund-deposit-mutation')

const useRefundJobDepositMutationMock = useRefundJobDepositMutation as jest.Mock

const JOB_ID = 'job-id'

const arrangeTest = () =>
  render(
    <TestWrapper>
      <RefundDepositModal jobId={JOB_ID} hideModal={() => {}} />
    </TestWrapper>
  )

describe('RefundDepositModal', () => {
  it('submits the refund deposit', async () => {
    const handleSubmitMock = jest.fn()

    useRefundJobDepositMutationMock.mockReturnValue({
      handleSubmit: handleSubmitMock,
      mutationLoading: false
    })

    arrangeTest()

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /Refund Deposit/i }))
    })

    expect(handleSubmitMock).toHaveBeenCalledTimes(1)
  })
})
