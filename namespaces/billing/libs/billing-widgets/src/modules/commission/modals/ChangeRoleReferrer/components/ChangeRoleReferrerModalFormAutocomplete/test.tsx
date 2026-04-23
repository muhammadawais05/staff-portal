import React from 'react'
import { Form } from '@toptal/picasso-forms'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import CompanyAutocomplete from '.'

jest.mock('@staff-portal/billing/src/components/FormInputAutocomplete')

const render = () =>
  renderComponent(
    <Form onSubmit={jest.fn()}>
      <CompanyAutocomplete />
    </Form>
  )

describe('ChangeRoleReferrerModalFormAutocomplete', () => {
  it('renders properly Autocomplete component', () => {
    const { getByTestId } = render()

    expect(
      getByTestId('ChangeRoleReferrerModalFormAutocomplete-label')
    ).toHaveTextContent('Referrer')
    expect(
      getByTestId('ChangeRoleReferrerModalFormAutocomplete-model')
    ).toHaveTextContent('PAYEES')
    expect(
      getByTestId('ChangeRoleReferrerModalFormAutocomplete-name')
    ).toHaveTextContent('referrerId__fake')
    expect(
      getByTestId('ChangeRoleReferrerModalFormAutocomplete-width')
    ).toHaveTextContent('full')
  })
})
