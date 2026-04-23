import { render, screen } from '@testing-library/react'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'

import ClaimSteps from './ClaimSteps'
import { GetClaimsWidgetQuery } from './data/get-claims-widget/get-claims-widget.staff.gql.types'
import { useGetClaimsWidget } from './data/get-claims-widget/get-claims-widget.staff.gql'

jest.mock('./data/get-claims-widget/get-claims-widget.staff.gql', () => ({
  useGetClaimsWidget: jest.fn()
}))

const TITLE = 'test'

const generateClaimStepItem = () =>
  ({
    talent: { id: '0', webResource: { text: 'abc', url: null } },
    roleStepsCount: 1,
    roleStepsTitle: TITLE,
    createdAt: '2016-12-07T00:00:00+00:00'
  } as const)

const arrangeTest = (data: GetClaimsWidgetQuery['widgets']['claims']) => {
  const mockedUseGetClaimsWidget = useGetClaimsWidget as jest.Mock

  mockedUseGetClaimsWidget.mockReturnValue({
    loading: false,
    data
  })

  return render(
    <TestWrapper>
      <ClaimSteps />
    </TestWrapper>
  )
}

describe('ClaimSteps', () => {
  it('does NOT render if there is no data', () => {
    arrangeTest({ allClaimedTalentUrl: null, nodes: [] })

    expect(screen.queryByText('Your Claimed Steps')).not.toBeInTheDocument()
  })

  it('does NOT render All Claimed Talent button if not applicable', () => {
    arrangeTest({
      allClaimedTalentUrl: null,
      nodes: [generateClaimStepItem()]
    })

    expect(screen.queryByText('All Claimed Talent')).not.toBeInTheDocument()
  })

  it('renders correctly', () => {
    arrangeTest({
      allClaimedTalentUrl: 'somelink',
      nodes: [generateClaimStepItem()]
    })

    expect(screen.getByText(TITLE)).toBeInTheDocument()
    expect(screen.getByText('All Claimed Talent')).toBeInTheDocument()
  })
})
