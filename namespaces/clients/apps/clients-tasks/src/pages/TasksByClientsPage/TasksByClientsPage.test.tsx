import { render, screen } from '@toptal/picasso/test-utils'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { useGetCurrentUser } from '@staff-portal/current-user'

import TasksByClientsPage from './TasksByClientsPage'

jest.mock('@staff-portal/current-user', () => ({
  ...jest.requireActual('@staff-portal/current-user'),
  useGetCurrentUser: jest.fn()
}))

jest.mock('./containers/TasksByClientsList/TasksByClientsList', () => ({
  __esModule: true,
  default: () => <div data-testid='tasks-by-clients-list' />
}))

const renderComponent = () => {
  const mockUseGetCurrentUser = useGetCurrentUser as jest.Mock

  mockUseGetCurrentUser.mockReturnValue({
    id: '',
    fullName: '',
    email: '',
    type: 'Staff'
  })

  return render(
    <TestWrapper>
      <TasksByClientsPage />
    </TestWrapper>
  )
}

describe('TasksByClientsPage', () => {
  it('shows the tasks list page', () => {
    renderComponent()

    expect(screen.getByTestId('tasks-by-clients-list')).toBeInTheDocument()
  })
})
