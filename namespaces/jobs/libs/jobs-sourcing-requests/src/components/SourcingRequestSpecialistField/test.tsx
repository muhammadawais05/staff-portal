import { fireEvent, render, screen } from '@toptal/picasso/test-utils'
import React from 'react'
import { Operation, OperationCallableTypes } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import SourcingRequestSpecialistField from './SourcingRequestSpecialistField'

jest.mock('@staff-portal/modals-service', () => ({
  useModal: () => ({ showModal: jest.fn() })
}))

const SPECIALIST_NAME = 'John Doe'

const INITIAL_OPERATION: Operation = {
  callable: OperationCallableTypes.ENABLED,
  messages: []
}

const arrangeTest = (operation = INITIAL_OPERATION) => {
  return render(
    <TestWrapper>
      <SourcingRequestSpecialistField
        jobId='123'
        sourcingRequestId='123'
        talentSpecialistId='123'
        talentSpecialistFullName={SPECIALIST_NAME}
        operation={operation}
      />
    </TestWrapper>
  )
}

describe('SourcingRequestSpecialistField', () => {
  it('renders specialist full name', () => {
    arrangeTest()

    expect(
      screen.getByTestId('sourcing-request-specialist-root')
    ).toHaveTextContent(SPECIALIST_NAME)
  })

  it('hides the edit button', () => {
    arrangeTest({
      callable: OperationCallableTypes.HIDDEN,
      messages: []
    })

    expect(
      screen.queryByTestId('sourcing-request-specialist-edit-button')
    ).not.toBeInTheDocument()
  })

  it('shows the tooltip', async () => {
    const TOOLTIP_MESSAGE = 'Tooltip message'

    arrangeTest({
      callable: OperationCallableTypes.DISABLED,
      messages: [TOOLTIP_MESSAGE]
    })

    fireEvent.mouseOver(
      screen.getByTestId('sourcing-request-specialist-edit-button')
    )

    expect(await screen.findAllByText(TOOLTIP_MESSAGE)).toHaveLength(2)
  })
})
