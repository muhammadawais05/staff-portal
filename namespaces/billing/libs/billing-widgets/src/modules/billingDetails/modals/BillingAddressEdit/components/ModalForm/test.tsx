import React, { ComponentProps } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import BillingAddressEditModalForm from '.'

const render = (
  props: ComponentProps<typeof BillingAddressEditModalForm> = {
    handleOnSubmit: jest.fn(),
    companyName: 'Acme Inc.',
    countries: [],
    usaStates: [],
    usaCountryId: '',
    initialValues: {}
  }
) => renderComponent(<BillingAddressEditModalForm {...props} />)

describe('BillingAddressEditModalForm', () => {
  it('default render', () => {
    const { getByTestId } = render()

    expect(
      getByTestId(`${BillingAddressEditModalForm.displayName}-title`)
    ).toHaveTextContent('Billing Address for Company Acme Inc.')
  })
})
