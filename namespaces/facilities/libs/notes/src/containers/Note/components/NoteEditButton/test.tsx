import { render, screen } from '@testing-library/react'
import React from 'react'
import { Operation, OperationCallableTypes } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import NoteEditButton from './NoteEditButton'

const arrangeTest = (
  callable: OperationCallableTypes = OperationCallableTypes.ENABLED
) =>
  render(
    <TestWrapper>
      <NoteEditButton
        noteId='1'
        editNoteOperation={{ callable, messages: [] } as Operation}
      />
    </TestWrapper>
  )

describe('NoteEditButton', () => {
  it('render note edit button', () => {
    arrangeTest()

    expect(screen.getByLabelText('Edit Note')).toBeInTheDocument()
  })

  it('should not display the edit button', () => {
    arrangeTest(OperationCallableTypes.HIDDEN)

    expect(screen.queryByLabelText('Edit Note')).not.toBeInTheDocument()
  })
})
