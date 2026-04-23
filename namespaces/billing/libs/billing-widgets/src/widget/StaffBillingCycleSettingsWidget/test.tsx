import { Button } from '@toptal/picasso'
import React from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'
import fixtures from '@staff-portal/billing/src/_fixtures'
import { encodeId } from '@staff-portal/billing/src/_lib/helpers/apollo'

import StaffBillingCycleSettingsWidget from './StaffBillingCycleSettingsWidget'

jest.mock('@staff-portal/billing/src/components/App')
jest.mock('@staff-portal/billing/src/components/Modals')
jest.mock('@staff-portal/billing/src/utils')

const render = () =>
  renderComponent(
    <StaffBillingCycleSettingsWidget
      baseAppProps={{ endpoints: fixtures.MockEndpoints }}
      engagementId={encodeId({ id: '265521', type: 'engagement' })}
    >
      {showModal => (
        <Button onClick={showModal} data-testid='ShowModalButton'>
          Show Modal
        </Button>
      )}
    </StaffBillingCycleSettingsWidget>
  )

describe('StaffBillingCycleSettingsWidget', () => {
  it('widget is rendered', () => {
    const { getByTestId } = render()

    expect(getByTestId('App')).toBeInTheDocument()
    expect(getByTestId('Modals')).toBeInTheDocument()
    expect(getByTestId('ShowModalButton')).toBeInTheDocument()
  })
})
