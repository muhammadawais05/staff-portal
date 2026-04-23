import React, { ReactNode } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import EntOverviewBillingHeader from './EntOverviewBillingHeader'

jest.mock('../EntOverviewBillingHeaderFilter')

const render = (children: ReactNode) =>
  renderComponent(
    <EntOverviewBillingHeader>{children}</EntOverviewBillingHeader>
  )

describe('EntOverviewBillingHeader', () => {
  it('default render', () => {
    const { container } = render(null)

    expect(container).toMatchSnapshot()
  })
})
