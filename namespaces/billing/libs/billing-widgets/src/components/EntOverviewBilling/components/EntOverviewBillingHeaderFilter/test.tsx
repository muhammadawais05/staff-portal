import React, { ReactNode } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'
import { OverviewAccessLevel as mockOverviewAccessLevel } from '@staff-portal/billing/src/@types/types'

import EntOverviewBillingHeaderFilter from './EntOverviewBillingHeaderFilter'

let mockIsTeamLead = false

jest.mock('@staff-portal/billing/src/_lib/context/overviewContext', () => ({
  useOverviewContext: () => ({
    accessLevel: mockOverviewAccessLevel.MyBilling,
    isTeamLead: mockIsTeamLead,
    setAccessLevel: () => {
      return undefined
    }
  })
}))

const render = (children: ReactNode) =>
  renderComponent(
    <EntOverviewBillingHeaderFilter>{children}</EntOverviewBillingHeaderFilter>
  )

describe('EntOverviewBillingHeaderFilter', () => {
  it('default render when `isTeamLead`: false', () => {
    mockIsTeamLead = false

    const { container } = render(null)

    expect(container).toMatchSnapshot()
  })

  it('default render when `isTeamLead`: true', () => {
    mockIsTeamLead = true
    const { container } = render(null)

    expect(container).toMatchSnapshot()
  })
})
