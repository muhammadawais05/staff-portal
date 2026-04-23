import React from 'react'
import { screen, render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import { ClientTransferRoleRequestFragment } from '../../data'
import { createTransferRequestMock } from '../../data/mocks'
import TransferRequestList from './TransferRequestList'

const arrangeTest = (transferRequest: ClientTransferRoleRequestFragment) =>
  render(
    <TestWrapper>
      <TransferRequestList transferRequest={transferRequest} />
    </TestWrapper>
  )

describe('TransferRequestList', () => {
  it('displays correct values for all fields', () => {
    arrangeTest(createTransferRequestMock())

    expect(
      screen.getByTestId(/item-field: Current Claimer/i)
    ).toHaveTextContent('Ali Hammoud')
    expect(screen.getByTestId(/item-field: New Claimer/i)).toHaveTextContent(
      'Margie Yost'
    )
    expect(screen.getByTestId(/item-field: Comment/i)).toHaveTextContent(
      'some info'
    )
  })
})
