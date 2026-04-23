import React from 'react'
import { render, screen } from '@testing-library/react'
import { useLocation, useHistory } from '@staff-portal/navigation'
import { TestWrapper } from '@staff-portal/test-utils'
import { fireEvent } from '@toptal/picasso/test-utils'

import PublicationRequests from './PublicationRequests'

jest.mock('../../components')

jest.mock('@staff-portal/config', () => ({
  ENVIRONMENT: 'production'
}))

jest.mock('@staff-portal/navigation', () => ({
  ...jest.requireActual('@staff-portal/navigation'),
  useLocation: jest.fn(),
  useHistory: jest.fn()
}))

const useLocationMock = useLocation as jest.Mock
const useHistoryMock = useHistory as jest.Mock

describe('PublicationRequests', () => {
  const history = {
    listen: jest.fn(),
    push: jest.fn()
  }

  beforeEach(() => {
    useLocationMock.mockReturnValue({ hash: 'mine' })
    useHistoryMock.mockReturnValue(history)
  })

  it('renders correctly', () => {
    render(
      <TestWrapper>
        <PublicationRequests />
      </TestWrapper>
    )

    expect(screen.getByText('Toptal Publications')).toBeInTheDocument()
    expect(screen.getByTestId('requests-list')).toBeInTheDocument()
    expect(screen.getByTestId('my-requests-list')).toBeInTheDocument()
  })

  it('renders correctly for all requests', () => {
    useLocationMock.mockReturnValue({ hash: 'all' })

    render(
      <TestWrapper>
        <PublicationRequests />
      </TestWrapper>
    )

    expect(screen.getByText('Toptal Publications')).toBeInTheDocument()
    expect(screen.getByTestId('requests-list')).toBeInTheDocument()
    expect(screen.getByTestId('all-requests-list')).toBeInTheDocument()
  })

  it('changes rendered tab and history on tab change', () => {
    render(
      <TestWrapper>
        <PublicationRequests />
      </TestWrapper>
    )

    expect(screen.getByText('Toptal Publications')).toBeInTheDocument()
    expect(screen.getByTestId('requests-list')).toBeInTheDocument()
    expect(screen.getByTestId('my-requests-list')).toBeInTheDocument()

    fireEvent.click(screen.getByText('All Requests'))

    expect(history.push).toHaveBeenCalledWith({ hash: 'all' })
    expect(screen.getByTestId('all-requests-list')).toBeInTheDocument()
  })
})
