import { fireEvent, render, screen } from '@toptal/picasso/test-utils'
import React from 'react'
import {
  Operation,
  OperationCallableTypes,
  SourcingRequestStatus
} from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

jest.mock('@staff-portal/modals-service', () => ({
  ...jest.requireActual('@staff-portal/modals-service'),
  useModal: () => ({ showModal: jest.fn() })
}))

import SourcingRequestStatusField from './SourcingRequestStatusField'

const SOURCING_REQUEST_STATUS = SourcingRequestStatus.ACTIVE_SOURCING

const INITIAL_OPERATION: Operation = {
  callable: OperationCallableTypes.ENABLED,
  messages: []
}

const arrangeTest = (operation = INITIAL_OPERATION) => {
  return render(
    <TestWrapper>
      <SourcingRequestStatusField
        jobId='123'
        sourcingRequestId='123'
        sourcingRequestStatus={SOURCING_REQUEST_STATUS}
        operation={operation}
      />
    </TestWrapper>
  )
}

describe('SourcingRequestStatusField', () => {
  it('renders status full name', () => {
    arrangeTest()

    expect(
      screen.getByTestId('sourcing-request-status-root')
    ).toHaveTextContent('Active Sourcing')
  })

  it('hides the edit button', () => {
    arrangeTest({
      callable: OperationCallableTypes.HIDDEN,
      messages: []
    })

    expect(
      screen.queryByTestId('sourcing-request-status-edit-button')
    ).not.toBeInTheDocument()
  })

  it('shows the tooltip', async () => {
    const TOOLTIP_MESSAGE = 'Tooltip message'

    arrangeTest({
      callable: OperationCallableTypes.DISABLED,
      messages: [TOOLTIP_MESSAGE]
    })

    fireEvent.mouseOver(
      screen.getByTestId('sourcing-request-status-edit-button')
    )

    expect(await screen.findAllByText(TOOLTIP_MESSAGE)).toHaveLength(2)
  })
})
