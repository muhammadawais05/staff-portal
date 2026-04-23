import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import EditableTaskAssignee, { Props } from './EditableTaskAssignee'

jest.mock('@staff-portal/tasks', () => ({
  ...jest.requireActual('@staff-portal/tasks'),
  TaskStaffAutocomplete: () => <div data-testid='task-staff-autocomplete' />
}))

jest.mock('./data', () => ({
  __esModule: true,
  useReassignTask: () => ({ reassignTask: jest.fn(), loading: false })
}))

jest.mock('@toptal/picasso/utils', () => ({
  __esModule: true,
  ...jest.requireActual('@toptal/picasso/utils'),
  useNotifications: () => ({ showError: jest.fn() })
}))

const TASK_ID = 'test-task-id'

const TEST_ASSIGNEE = {
  id: 'test-assignee-id',
  fullName: 'Test Name',
  webResource: { text: 'resource test text', url: 'http://test.url/' }
}

const TEST_ASSIGNEE_2 = {
  id: 'test-assignee-id-2',
  fullName: 'Other Name',
  webResource: { text: 'resource test text', url: 'http://test.url/' }
}

const arrangeTest = ({
  taskId,
  assignee,
  disabled = false,
  lineThrough = false
}: Props) =>
  render(
    <TestWrapper>
      <EditableTaskAssignee
        taskId={taskId}
        assignee={assignee}
        disabled={disabled}
        lineThrough={lineThrough}
      />
    </TestWrapper>
  )

describe('EditableTaskAssignee', () => {
  it('renders link with assignee initials', () => {
    const { getByText } = arrangeTest({
      taskId: TASK_ID,
      assignee: TEST_ASSIGNEE
    })

    expect(getByText('TN')).toBeInTheDocument()
  })

  it('should change assignee initials on assignee change', () => {
    const { getByText, rerender } = arrangeTest({
      taskId: TASK_ID,
      assignee: TEST_ASSIGNEE
    })

    expect(getByText('TN')).toBeInTheDocument()

    rerender(
      <TestWrapper>
        <EditableTaskAssignee taskId={TASK_ID} assignee={TEST_ASSIGNEE_2} />
      </TestWrapper>
    )

    expect(getByText('ON')).toBeInTheDocument()
  })

  it('renders staff autocomplete when edit button is clicked', async () => {
    const { getByLabelText, getByTestId } = arrangeTest({
      taskId: TASK_ID,
      assignee: TEST_ASSIGNEE
    })

    const editAssigneeButton = getByLabelText('Edit task assignee')

    fireEvent.click(editAssigneeButton)

    expect(getByTestId('task-staff-autocomplete')).toBeInTheDocument()
  })

  it('should leave the same initials when user cancel the change assignee operation', async () => {
    const { getByLabelText, getByTestId, queryByTestId, container } =
      arrangeTest({
        taskId: TASK_ID,
        assignee: TEST_ASSIGNEE
      })

    const editAssigneeButton = getByLabelText('Edit task assignee')

    fireEvent.click(editAssigneeButton)

    expect(getByTestId('task-staff-autocomplete')).toBeInTheDocument()

    fireEvent.click(container)

    expect(queryByTestId('task-staff-autocomplete')).not.toBeInTheDocument()
  })
})
