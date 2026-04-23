import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { PublicationGigStatus } from '@staff-portal/graphql/staff'
import { useGetCurrentUser } from '@staff-portal/current-user'
import {
  createGetGigMock,
  mockedStaff
} from '@staff-portal/talents-gigs/src/mocks'

import Request from './'

jest.mock('../../components')
jest.mock('@staff-portal/current-user', () => ({
  __esModule: true,
  ...jest.requireActual('@staff-portal/current-user'),
  useGetCurrentUser: jest.fn()
}))

const mockUseGetCurrentUser = useGetCurrentUser as jest.Mock
const approvedRequest = createGetGigMock({
  status: PublicationGigStatus.APPROVED
}).gig

const renderTest = (request = approvedRequest) => {
  return render(
    <TestWrapper>
      <Request request={request} />
    </TestWrapper>
  )
}

describe('Request Component', () => {
  it('displays all the information correctly', () => {
    const request = createGetGigMock({
      status: PublicationGigStatus.CLAIMED
    }).gig

    renderTest(request)

    expect(screen.queryByText(request.description)).toBeInTheDocument()
    expect(screen.queryByText('Javascript')).toBeInTheDocument()
    expect(
      screen.queryByTestId('p2p-request-candidates-list')
    ).toBeInTheDocument()
    expect(screen.queryByTestId('p2p-request-details')).toBeInTheDocument()
    expect(
      screen.queryByTestId('search-request-candidates')
    ).not.toBeInTheDocument()
  })

  it('display candidates list for CLAIMED request', () => {
    const request = createGetGigMock({
      status: PublicationGigStatus.CLAIMED
    }).gig

    renderTest(request)

    expect(
      screen.queryByTestId('p2p-request-candidates-list')
    ).toBeInTheDocument()
  })

  it('display candidates list for APPROVED request', () => {
    const request = createGetGigMock({
      status: PublicationGigStatus.APPROVED
    }).gig

    renderTest(request)

    expect(
      screen.queryByTestId('p2p-request-candidates-list')
    ).toBeInTheDocument()
  })

  it('display candidates list for MATCHED request', () => {
    const request = createGetGigMock({
      status: PublicationGigStatus.MATCHED
    }).gig

    renderTest(request)

    expect(
      screen.queryByTestId('p2p-request-candidates-list')
    ).toBeInTheDocument()
  })

  it('display candidates list for COMPLETED request', () => {
    const request = createGetGigMock({
      status: PublicationGigStatus.COMPLETED
    }).gig

    renderTest(request)

    expect(
      screen.queryByTestId('p2p-request-candidates-list')
    ).toBeInTheDocument()
  })

  it('display candidates list for CLOSED request', () => {
    const request = createGetGigMock({
      status: PublicationGigStatus.CLOSED
    }).gig

    renderTest(request)

    expect(
      screen.queryByTestId('p2p-request-candidates-list')
    ).toBeInTheDocument()
  })

  it('displays search candidates button for me when I am the claimer', () => {
    mockUseGetCurrentUser.mockReturnValue(mockedStaff)

    renderTest()

    expect(
      screen.queryByTestId(`search-candidates-${approvedRequest.id}`)
    ).toBeInTheDocument()
  })

  it('hides search candidates button for me when I am not the claimer', () => {
    mockUseGetCurrentUser.mockReturnValue({
      id: '01',
      fullName: 'Another Staff'
    })
    renderTest()

    expect(
      screen.queryByTestId('search-request-candidates')
    ).not.toBeInTheDocument()
  })

  it('hides candidates for unclaimed request', () => {
    const request = createGetGigMock({
      status: PublicationGigStatus.PENDING
    }).gig

    renderTest(request)

    expect(
      screen.queryByTestId('p2p-request-candidates-list')
    ).not.toBeInTheDocument()
  })
})
