import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import AddNewTemplateButton from './AddNewTemplateButton'

const BUTTON_LABEL = 'Add New Template'

const arrangeTest = ({
  callable = OperationCallableTypes.ENABLED,
  messages = []
}: {
  callable?: OperationCallableTypes
  messages?: string[]
} = {}) => {
  return render(
    <TestWrapper>
      <AddNewTemplateButton
        operation={{
          callable,
          messages
        }}
      />
    </TestWrapper>
  )
}

describe('AddNewTemplateButton', () => {
  it('shows the button', () => {
    arrangeTest()

    expect(screen.getByText(BUTTON_LABEL)).toBeInTheDocument()
  })

  it('hides the button', () => {
    arrangeTest({ callable: OperationCallableTypes.HIDDEN })

    expect(screen.queryByText(BUTTON_LABEL)).not.toBeInTheDocument()
  })

  it('disables the button and displays a tooltip message', async () => {
    const TOOLTIP_TEXT = 'Some content here'

    arrangeTest({
      callable: OperationCallableTypes.DISABLED,
      messages: [TOOLTIP_TEXT]
    })

    fireEvent.focus(await screen.findByText(BUTTON_LABEL))

    expect(screen.getByText(TOOLTIP_TEXT)).toBeInTheDocument()
  })
})
