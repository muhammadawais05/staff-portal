import React from 'react'
import { render } from '@testing-library/react'
import { TaskSource } from '@staff-portal/graphql/staff'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'

import { CREATE_TASK } from './data'
import AddNewTaskModal from './AddNewTaskModal'

const mocks = [
  {
    request: {
      query: CREATE_TASK,
      variables: {
        description: 'test',
        dueDate: '2019-11-24T17:00:00.000Z',
        performer: 'ABC Name',
        priority: 'medium',
        recurringPeriod: '',
        tags: ['qwerty']
      }
    },
    newData: () => ({
      data: {
        task: {
          id: '1245908wt984',
          name: 'test',
          dueDate: new Date().toISOString(),
          relatedTo: {
            id: 1,
            name: 'Obfuscated subject',
            timezoneOffset: null
          },
          assignee: {
            id: '2',
            name: 'ABC Name'
          },
          priority: 'medium',
          status: 'pending',
          isSystemGenerated: false,
          starred: false
        }
      }
    })
  }
]

describe('AddNewTaskModal component', () => {
  it('default render', async () => {
    const { getByText } = render(
      <TestWrapperWithMocks mocks={mocks}>
        <AddNewTaskModal
          taskCreateData={{ source: TaskSource.TASKS_LIST }}
          hideModal={jest.fn()}
          onTaskCreated={jest.fn()}
        />
      </TestWrapperWithMocks>
    )

    expect(getByText('Description')).toBeInTheDocument()
    expect(getByText('Due Date')).toBeInTheDocument()
    expect(getByText('Recurring Period')).toBeInTheDocument()
    expect(getByText('Performer')).toBeInTheDocument()
    expect(getByText('Tags')).toBeInTheDocument()
  })
})
