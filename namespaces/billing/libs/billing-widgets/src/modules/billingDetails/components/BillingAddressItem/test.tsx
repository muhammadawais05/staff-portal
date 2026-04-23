import React, { ComponentProps } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'
import fixtures from '@staff-portal/billing/src/_fixtures'

import BillingAddressItem from '.'

const render = (props: ComponentProps<typeof BillingAddressItem>) =>
  renderComponent(<BillingAddressItem {...props} />)

describe('BillingAddressItem', () => {
  it('displays address', () => {
    const { queryByTestId } = render({
      client: fixtures.MockClient
    })

    expect(queryByTestId('BillingAddressItem-label')).toHaveTextContent(
      'Melissa Gulgowski, 25439 Kyra Mission, Loritachester, SC, United States, 04986-3362'
    )
    expect(queryByTestId('BillingAddressItem-billing-address-edit')).toBeNull()
  })

  it('displays edit button', () => {
    const { queryByTestId } = render({
      client: fixtures.MockClient,
      enableEdit: true
    })

    expect(
      queryByTestId('BillingAddressItem-billing-address-edit')
    ).toBeInTheDocument()
  })
})
