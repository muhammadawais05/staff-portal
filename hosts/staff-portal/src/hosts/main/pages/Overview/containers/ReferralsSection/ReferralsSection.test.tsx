import { render, screen } from '@testing-library/react'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'

import { useGetReferrals } from './data/get-referrals/get-referrals.staff.gql'
import { ReferredRoleEdgeFragment } from './data/referred-role-edge-fragment/referred-role-edge-fragment.staff.gql.types'
import ReferralsSection from './ReferralsSection'

jest.mock('./components/AvailableReferrals/AvailableReferrals', () => ({
  __esModule: true,
  default: () => <div data-testid='available-referrals' />
}))

jest.mock('./data/get-referrals/get-referrals.staff.gql', () => ({
  useGetReferrals: jest.fn()
}))

const arrangeTest = (referrals: Partial<ReferredRoleEdgeFragment>[] = []) => {
  const mockUseGetReferrals = useGetReferrals as jest.Mock

  mockUseGetReferrals.mockReturnValue({
    loading: false,
    data: {
      recentlyReferredRoles: {
        edges: referrals
      }
    }
  })

  return render(
    <TestWrapper>
      <ReferralsSection />
    </TestWrapper>
  )
}

describe('ReferralsSection', () => {
  it('hides the available referrals', () => {
    arrangeTest()

    expect(screen.queryByTestId('available-referrals')).not.toBeInTheDocument()
  })

  it('shows the available referrals', () => {
    arrangeTest([{}])

    expect(screen.queryByTestId('available-referrals')).toBeInTheDocument()
  })
})
