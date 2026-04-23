import { render, fireEvent } from '@testing-library/react'
import React from 'react'
import { ReferredRoleStatusCategory } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import ReferralStatus from './ReferralStatus'

describe('ReferralStatus', () => {
  it('renders referral status', async () => {
    const STATUS_TEXT = 'Hello'
    const STATUS_TOOLTIP = 'Tooltip text'

    const { container, findByText, getByText } = render(
      <TestWrapper>
        <ReferralStatus
          statusText={STATUS_TEXT}
          statusCategory={ReferredRoleStatusCategory.REJECTED}
          statusTooltip={STATUS_TOOLTIP}
        />
      </TestWrapper>
    )

    expect(container.innerHTML).toContain('red')
    expect(container.innerHTML).toContain('semibold')

    fireEvent.mouseEnter(getByText(STATUS_TEXT))

    expect(await findByText(STATUS_TOOLTIP)).toBeInTheDocument()
  })
})
