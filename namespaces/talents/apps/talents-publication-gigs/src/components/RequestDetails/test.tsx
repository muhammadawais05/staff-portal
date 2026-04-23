import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { NO_VALUE } from '@staff-portal/config'
import { createGetGigsMock } from '@staff-portal/talents-gigs/src/mocks'
import { GigFragment } from '@staff-portal/talents-gigs'

import RequestDetails from './'

describe('RequestDetails Component', () => {
  const mockData = createGetGigsMock().gigs.nodes as GigFragment[]

  it('displays all the information correctly for pending requests', () => {
    const pendingClaimRequest = mockData[0]

    render(
      <TestWrapper>
        <RequestDetails request={pendingClaimRequest} />
      </TestWrapper>
    )

    expect(
      screen.queryByText(pendingClaimRequest.createdBy.role.fullName)
    ).toBeInTheDocument()
    expect(screen.queryByText('Pending Claim')).toBeInTheDocument()
  })

  it('displays all the information correctly for claimed requests', () => {
    const claimedRequest = mockData[1]

    render(
      <TestWrapper>
        <RequestDetails request={claimedRequest} />
      </TestWrapper>
    )

    expect(
      screen.queryByText(claimedRequest.claimedBy?.role.fullName!)
    ).toBeInTheDocument()
    expect(screen.queryByText('Pending Approval')).toBeInTheDocument()
    expect(screen.getByTestId('candidate')).toHaveTextContent(NO_VALUE)
  })

  it('displays all the information correctly for matched requests', () => {
    const matchedRequest = mockData[2]

    render(
      <TestWrapper>
        <RequestDetails request={matchedRequest} />
      </TestWrapper>
    )

    expect(screen.queryByText('Candidate Sent')).toBeInTheDocument()
    expect(screen.getByTestId('matched-at')).toHaveTextContent(
      '2021-01-05T03:00:00.000Z'
    )

    expect(
      screen.queryByText(matchedRequest.claimedBy?.role.fullName!)
    ).toBeInTheDocument()
    expect(screen.getByTestId('candidate')).toHaveTextContent('Dante Aligheri')
  })
})
