import React from 'react'
import { render, screen } from '@testing-library/react'
import { useParams } from '@staff-portal/navigation'
import { TestWrapper } from '@staff-portal/test-utils'
import { useGetGig } from '@staff-portal/talents-gigs'
import { createGetGigMock } from '@staff-portal/talents-gigs/src/mocks'

import PublicationRequest from './PublicationRequest'

jest.mock('../../components')

jest.mock('@staff-portal/talents-gigs/src/data/get-gig', () => ({
  useGetGig: jest.fn()
}))

jest.mock('@staff-portal/config', () => ({
  ENVIRONMENT: 'production'
}))

jest.mock('@staff-portal/navigation', () => ({
  ...jest.requireActual('@staff-portal/navigation'),
  useParams: jest.fn()
}))

jest.mock('@staff-portal/query-params-state', () => ({
  __esModule: true,
  ...jest.requireActual('@staff-portal/query-params-state'),
  useQueryParamsState: jest.fn()
}))

const useParamsMock = useParams as jest.Mock

describe('PublicationRequest', () => {
  const mockedUseGetGig = useGetGig as jest.Mock

  beforeEach(() => {
    useParamsMock.mockReturnValue({ id: '1234' })
    mockedUseGetGig.mockReturnValue({
      gig: createGetGigMock().gig,
      loading: false
    })
  })

  it('renders request', () => {
    render(
      <TestWrapper>
        <PublicationRequest />
      </TestWrapper>
    )
    expect(
      screen.queryByText('Interacting with Python files from frontend elements')
    ).toBeInTheDocument()
    expect(screen.queryByText('Toptal Publications')).toBeInTheDocument()
    expect(screen.queryByTestId('p2p-request-skeleton')).not.toBeInTheDocument()
    expect(screen.queryByTestId('p2p-request')).toBeInTheDocument()
  })

  it('handles loading state', () => {
    mockedUseGetGig.mockReturnValue({
      request: null,
      loading: true
    })

    render(
      <TestWrapper>
        <PublicationRequest />
      </TestWrapper>
    )

    expect(screen.queryByTestId('p2p-request-skeleton')).toBeInTheDocument()
    expect(screen.queryByTestId('p2p-request')).not.toBeInTheDocument()
  })
})
