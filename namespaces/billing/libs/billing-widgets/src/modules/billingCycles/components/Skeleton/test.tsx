import React from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import BillingCyclesSkeleton from '.'

describe('BillingCyclesSkeleton List', () => {
  it('<BillingCyclesSkeleton />', () => {
    const { queryAllByRole } = renderComponent(
      <BillingCyclesSkeleton header={<></>} />
    )

    expect(queryAllByRole('row')).toHaveLength(13)
  })
})
