import React from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'
import fixtures from '@staff-portal/billing/src/_fixtures'

import EngagementSelector from '.'

jest.mock('../../../billingCycles/components/BillingCycles')
jest.mock('../../data')

describe('BillingEngagementDetails', () => {
  it('default render', () => {
    const { queryByTestId } = renderComponent(
      <EngagementSelector
        handleOnChange={jest.fn()}
        engagement={
          fixtures.MockBillingSettingsJob.data.node.engagements.nodes[0].id
        }
        engagements={fixtures.MockBillingSettingsJob.data.node.engagements}
      />
    )

    expect(queryByTestId('engagement-selector')).toBeInTheDocument()
  })

  it('sets engagement name as a label', () => {
    const { queryByTestId } = renderComponent(
      <EngagementSelector
        handleOnChange={jest.fn()}
        engagement={
          fixtures.MockBillingSettingsJob.data.node.engagements.nodes[0].id
        }
        engagements={fixtures.MockBillingSettingsJob.data.node.engagements}
      />
    )

    expect(queryByTestId('engagement-label')).toContainHTML('Clorinda Lehner')
  })
})
