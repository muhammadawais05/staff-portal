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

describe('CompanyAutocomplete', () => {
  it('default render', () => {
    const { getByTestId } = render()

    expect(getByTestId('CompanyAutocomplete-label')).toHaveTextContent(
      'Company'
    )
    expect(getByTestId('CompanyAutocomplete-model')).toHaveTextContent(
      'ACTIVE_OR_WITH_INVOICES_CLIENTS'
    )
    expect(getByTestId('CompanyAutocomplete-name')).toHaveTextContent(
      'clientId__fake'
    )
    expect(getByTestId('CompanyAutocomplete-width')).toHaveTextContent('full')
  })
})
