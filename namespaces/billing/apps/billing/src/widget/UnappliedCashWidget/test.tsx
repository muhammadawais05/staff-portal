import { Button } from '@toptal/picasso'
import React from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'
import fixtures from '@staff-portal/billing/src/_fixtures'

import UnappliedCashWidget from './UnappliedCashWidget'

jest.mock('@staff-portal/billing/src/components/App')
jest.mock('@staff-portal/billing/src/components/Modals')

const render = () =>
  renderComponent(
    <UnappliedCashWidget endpoints={fixtures.MockEndpoints} clientId='265521'>
      {showModal => (
        <Button onClick={showModal} data-testid='ShowModalButton'>
          Show Modal
        </Button>
      )}
    </UnappliedCashWidget>
  )

describe('UnappliedCashWidget', () => {
  it('widget is rendered', () => {
    const { getByTestId } = render()

    expect(getByTestId('App')).toBeInTheDocument()
    expect(getByTestId('Modals')).toBeInTheDocument()
    expect(getByTestId('ShowModalButton')).toBeInTheDocument()
  })
})
