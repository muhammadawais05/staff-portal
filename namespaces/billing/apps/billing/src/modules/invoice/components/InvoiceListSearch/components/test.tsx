import { useQuery } from '@apollo/client'
import React from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import InvoiceListSearch from '.'

jest.mock('@apollo/client')
jest.mock('@staff-portal/billing/src/components/ListSearchAutocomplete')

const render = () => renderComponent(<InvoiceListSearch />)

describe('InvoiceListSearch', () => {
  // eslint-disable-next-line
  test.skip('default render', () => {
    ;(useQuery as jest.Mock).mockReturnValue({
      data: fixtures.MockInvoiceListFilters,
      error: false,
      loading: false
    })
    const { getByTestId } = render({})

    expect(getByTestId('InvoiceListSearch')).toBeInTheDocument()
    expect(getByTestId('ListSearchAutocomplete')).toContainHTML(
      '[{"label":"companies","name":"company_ids","type":"autocomplete"},{"label":"jobs","name":"jobs","type":"autocomplete"},{"label":"talents","name":"talent_ids","type":"autocomplete"}]'
    )
  })
})
