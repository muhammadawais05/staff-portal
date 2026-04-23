import React from 'react'
import { render } from '@testing-library/react'
import { TaskPriorityLevel } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import { TaskListItemFragment } from './data/task-list-item-fragment'
import TaskListItem, { Props } from './TaskListItem'

const { useGetTaskMetadata } = require('./data')

jest.mock('./utils', () => ({
  __esModule: true,
  renderPriorityCol: () => <div data-testid='priority-col' />,
  renderNameCol: () => <div data-testid='name-col' />,
  renderDueDateCol: () => <div data-testid='due-date-col' />,
  renderRelatedToCol: () => <div data-testid='related-to-col' />,
  renderRelatedTimeCol: () => <div data-testid='related-time-col' />,
  renderAssigneeCol: () => <div data-testid='assignee-col' />,
  renderActionsCol: () => <div data-testid='actions-col' />,
  renderExpandedContent: () => <div data-testid='expanded-content' />
}))

jest.mock('./data', () => ({
  __esModule: true,
  useGetTaskMetadata: jest.fn()
}))

jest.mock('./components/CompleteTaskCheckbox', () => ({
  __esModule: true,
  default: () => <span data-testid='complete-task-checkbox' />
}))

const TEST_TASK = {
  id: 'test-id',
  description: 'test-description',
  disputed: false,
  priority: TaskPriorityLevel.HIGH,
  starred: true,
  commentCount: 3,
  subjects: {
    nodes: [
      {
        id: 'test-subject',
        __typename: 'Client',
        fullName: 'test'
      }
    ]
  }
} as TaskListItemFragment

const arrangeTest = ({
  task,
  index,
  isExpanded,
  expandTask,
  showDisputeActions
}: Props) =>
  render(
    <TestWrapper>
      <table>
        <tbody>
          <TaskListItem
            task={task}
            index={index}
            isExpanded={isExpanded}
            expandTask={expandTask}
            showDisputeActions={showDisputeActions}
          />
        </tbody>
      </table>
    </TestWrapper>
  )

describe('RelatedTaskList', () => {
  it('renders columns', () => {
    const IS_EXPANDED = false
    const defaultProps: Props = {
      task: TEST_TASK,
      index: 1,
      isExpanded: false,
      expandTask: jest.fn()
    }

    useGetTaskMetadata.mockImplementation(() => ({
      loading: false,
      data: {}
    }))

    const { getByTestId } = arrangeTest(defaultProps)

    expect(getByTestId('priority-col')).toBeInTheDocument()
    expect(getByTestId('name-col')).toBeInTheDocument()
    expect(getByTestId('due-date-col')).toBeInTheDocument()
    expect(getByTestId('related-to-col')).toBeInTheDocument()
    expect(getByTestId('related-time-col')).toBeInTheDocument()
    expect(getByTestId('assignee-col')).toBeInTheDocument()
    expect(getByTestId('actions-col')).toBeInTheDocument()
    expect(useGetTaskMetadata).toHaveBeenCalledWith({
      taskId: TEST_TASK.id,
      skip: !IS_EXPANDED
    })
  })

  describe('when task is expanded', () => {
    const defaultProps: Props = {
      task: TEST_TASK,
      index: 1,
      isExpanded: true,
      expandTask: jest.fn()
    }

    describe('when task metadata exists', () => {
      it('renders expanded content', () => {
        useGetTaskMetadata.mockImplementation(() => ({
          loading: false,
          data: {}
        }))

        const { queryByTestId } = arrangeTest(defaultProps)

        expect(queryByTestId('expanded-content')).toBeInTheDocument()
      })
    })

    describe('when task metadata is missing', () => {
      it('render expanded content to faster first-draw of the content', () => {
        useGetTaskMetadata.mockImplementation(() => ({
          loading: false,
          data: null
        }))

        const { queryByTestId } = arrangeTest(defaultProps)

        expect(queryByTestId('expanded-content')).toBeInTheDocument()
      })
    })
  })
})
