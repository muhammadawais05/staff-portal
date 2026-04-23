import { render, screen } from '@toptal/picasso/test-utils'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { useGetCurrentUser } from '@staff-portal/current-user'

import TasksPage from './TasksPage'

jest.mock('@staff-portal/current-user', () => ({
  ...jest.requireActual('@staff-portal/current-user'),
  useGetCurrentUser: jest.fn()
}))

jest.mock('../TasksList', () => ({
  __esModule: true,
  default: () => <div data-testid='tasks-list' />
}))

const arrangeTest = () => {
  const mockUseGetCurrentUser = useGetCurrentUser as jest.Mock

  mockUseGetCurrentUser.mockReturnValue({
    id: '',
    fullName: '',
    email: '',
    type: 'Staff'
  })

  return render(
    <TestWrapper>
      <TasksPage />
    </TestWrapper>
  )
}

describe('TasksPage', () => {
  it('shows the tasks list page', () => {
    arrangeTest()

    expect(screen.getByTestId('tasks-list')).toBeInTheDocument()
  })
})
