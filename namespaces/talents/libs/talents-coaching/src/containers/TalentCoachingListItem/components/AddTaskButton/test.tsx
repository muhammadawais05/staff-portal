import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from '@staff-portal/navigation'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import AddTaskButton, { Props } from '../AddTaskButton/AddTaskButton'

const arrangeTest = (props: Props = {}) =>
  render(
    <MemoryRouter>
      <TestWrapper>
        <AddTaskButton {...props} />
      </TestWrapper>
    </MemoryRouter>
  )

describe('AddTaskButton', () => {
  describe('when createTaskOperation is hidden', () => {
    it('does not render add task button', () => {
      arrangeTest({
        createTaskOperation: {
          callable: OperationCallableTypes.HIDDEN,
          messages: []
        }
      })
      expect(screen.queryByText('Add Task')).not.toBeInTheDocument()
    })
  })

  describe('when createTaskOperation is enabled', () => {
    const createTaskOperation = {
      callable: OperationCallableTypes.ENABLED,
      messages: []
    }

    it('renders "Add Task" button', () => {
      arrangeTest({ createTaskOperation })
      expect(screen.queryByText('Add Task')).toBeInTheDocument()
    })
  })
})
