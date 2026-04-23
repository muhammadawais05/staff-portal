import { render, screen } from '@testing-library/react'
import React from 'react'
import { ReferredRoleStatusCategory } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import { ReferredRoleEdgeFragment } from '../../data/referred-role-edge-fragment/referred-role-edge-fragment.staff.gql.types'
import AvailableReferrals from './AvailableReferrals'

jest.mock('../ReferralUser/ReferralUser', () => ({
  __esModule: true,
  default: () => <div data-testid='referral-user' />
}))

const arrangeTest = (
  hasMore = false,
  referrals: ReferredRoleEdgeFragment[] = []
) =>
  render(
    <TestWrapper>
      <AvailableReferrals hasMore={hasMore} referrals={referrals} />
    </TestWrapper>
  )

describe('ReferralsSection', () => {
  it('hides the see all referrals button and available referrals list', () => {
    arrangeTest()

    expect(
      screen.queryByTestId('see-all-referrals-button')
    ).not.toBeInTheDocument()
    expect(screen.queryByTestId('referral-user')).not.toBeInTheDocument()
  })

  it('shows the see all referrals button and available referrals list', () => {
    arrangeTest(true, [
      {
        createdAt: '2020-09-27T22:57:28+04:00',
        statusCategory: ReferredRoleStatusCategory.ACTIVE,
        statusText: 'Evaluating',
        node: { id: '1', type: 'Company', webResource: { text: 'Test Name' } }
      }
    ])

    expect(screen.getByTestId('see-all-referrals-button')).toBeInTheDocument()
    expect(screen.getByTestId('referral-user')).toBeInTheDocument()
  })
})
