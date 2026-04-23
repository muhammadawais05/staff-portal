import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { useGetOperation } from '@staff-portal/operations'

import RemovePaymentHoldModal from './RemovePaymentHoldModal'

jest.mock('./data', () => ({
  useRemovePaymentHold: () => [() => {}, { loading: false }]
}))

jest.mock(
  '@staff-portal/operations/src/components/LazyOperation/hooks/use-get-operation',
  () => ({
    useGetOperation: jest.fn()
  })
)

const mockReturnValues = () => {
  const mockUseGetOperation = useGetOperation as jest.Mock

  mockUseGetOperation.mockReturnValue({ enabled: true, loading: false })
}

const TEST_NAME = 'test name'

const arrangeTest = () => {
  mockReturnValues()

  render(
    <TestWrapper>
      <RemovePaymentHoldModal
        talentId='id'
        fullName={TEST_NAME}
        hideModal={() => {}}
      />
    </TestWrapper>
  )
}

describe('RemovePaymentHoldModal', () => {
  it('displays required copies', async () => {
    arrangeTest()

    expect(
      await screen.findByText(`Remove hold for ${TEST_NAME}`)
    ).toBeInTheDocument()

    expect(
      await screen.findByText(
        "Are you sure you want to remove the hold from this role's payments?"
      )
    ).toBeInTheDocument()
  })
})
