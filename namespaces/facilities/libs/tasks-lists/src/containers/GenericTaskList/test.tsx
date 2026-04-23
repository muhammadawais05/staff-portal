import React from 'react'
import { render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import GenericTaskList, { GenericTaskListProps } from './GenericTaskList'

jest.mock('./components/TasksTable', () => ({
  __esModule: true,
  default: () => <div data-testid='tasks-table' />
}))

const arrangeTest = ({
  loading,
  tasks,
  refreshTaskList,
  showDisputeActions
}: GenericTaskListProps) =>
  render(
    <TestWrapper>
      <GenericTaskList
        loading={loading}
        tasks={tasks}
        refreshTaskList={refreshTaskList}
        showDisputeActions={showDisputeActions}
      />
    </TestWrapper>
  )

describe('GenericTaskList', () => {
  it('renders loader when loading is set to true', () => {
    const { getByTestId, queryByTestId } = arrangeTest({
      loading: true
    } as unknown as GenericTaskListProps)

    expect(getByTestId('tasks-table-loader')).toBeInTheDocument()
    expect(queryByTestId('GenericTaskList-empty')).not.toBeInTheDocument()
  })

  it('renders appropriate info if there are no tasks', () => {
    const { queryByTestId, getByTestId, getByText } = arrangeTest({
      loading: false,
      tasks: []
    } as unknown as GenericTaskListProps)

    expect(queryByTestId('tasks-table-loader')).not.toBeInTheDocument()
    expect(getByTestId('GenericTaskList-empty')).toBeInTheDocument()
    expect(getByText('There are no tasks.')).toBeInTheDocument()
  })

  it('renders tasks table', () => {
    const { getByTestId, queryByTestId } = arrangeTest({
      loading: false,
      tasks: [{ id: 'test-id' }],
      showDisputeActions: true
    } as unknown as GenericTaskListProps)

    expect(queryByTestId('tasks-table-loader')).not.toBeInTheDocument()
    expect(queryByTestId('GenericTaskList-empty')).not.toBeInTheDocument()
    expect(getByTestId('tasks-table')).toBeInTheDocument()
  })
})
