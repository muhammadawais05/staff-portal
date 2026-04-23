import { render, screen } from '@testing-library/react'
import React from 'react'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'
import { NoteOperationFragment } from '@staff-portal/notes'

import EditRequestButton from './EditRequestButton'

const OPERATION = {
  callable: OperationCallableTypes.ENABLED,
  messages: []
}

const arrangeTest = ({
  operation = OPERATION
}: Partial<{
  operation: NoteOperationFragment
}> = {}) => {
  render(
    <TestWrapper>
      <EditRequestButton
        sourcingRequestId='VjEtU291cmNpbmdSZXF1ZXN0LTQ4OQ'
        updateSourcingRequestOperation={operation}
      />
    </TestWrapper>
  )
}

describe('EditRequestButton', () => {
  it('shows the Edit Request Button', () => {
    arrangeTest()

    expect(screen.getByTestId('edit-request-button')).toBeInTheDocument()
  })

  it('hides the Edit Request Button', () => {
    arrangeTest({
      operation: { callable: OperationCallableTypes.HIDDEN, messages: [] }
    })

    expect(screen.queryByTestId('edit-request-button')).not.toBeInTheDocument()
  })
})
