import React from 'react'
import { render, screen } from '@testing-library/react'
import { Link } from '@staff-portal/navigation'
import { TestWrapper } from '@staff-portal/test-utils'
import { createGetGigMock } from '@staff-portal/talents-gigs/src/mocks'

import RequestListItem from '.'

jest.mock('@staff-portal/config', () => ({
  ENVIRONMENT: 'production'
}))

jest.mock('../../components')

jest.mock('@staff-portal/navigation', () => ({
  ...jest.requireActual('@staff-portal/navigation'),
  Link: jest.fn()
}))

const mockedLink: jest.Mock = Link as unknown as jest.Mock

describe('RequestsListItem Component', () => {
  const request = createGetGigMock().gig

  it('renders correctly', () => {
    mockedLink.mockImplementation(({ children }) => children)
    render(
      <TestWrapper>
        <RequestListItem request={request} />
      </TestWrapper>
    )

    expect(screen.queryByText(request.title)).toBeInTheDocument()
    expect(screen.queryByTestId('p2p-request-details')).toBeInTheDocument()
    expect(screen.queryByTestId('p2p-request-actions')).toBeInTheDocument()
    expect(Link).toHaveBeenCalledTimes(1)
    expect(Link).toHaveBeenCalledWith(
      expect.objectContaining({
        href: '/toptal-publications/VjEtUHVibGljYXRpb25HaWctMjA'
      }),
      {}
    )
    expect(screen.queryByText(request.description)).toBeInTheDocument()
  })
})
