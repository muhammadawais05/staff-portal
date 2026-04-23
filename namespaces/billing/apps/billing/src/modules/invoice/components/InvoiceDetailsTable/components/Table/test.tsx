import React, { ComponentProps } from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import InvoiceDetailsTable from '.'

jest.mock('../../../../../commercialDocument/components/DetailsDescription')
jest.mock('../TableContent')
jest.mock('../../utils', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue([{ label: 'a', value: 'b' }]),
  getItemsAsPairs: jest
    .fn()
    .mockReturnValue([
      [{ label: 'a', value: 'b' }],
      [{ label: 'c', value: 'd' }]
    ])
}))

const render = ({ invoice }: ComponentProps<typeof InvoiceDetailsTable>) =>
  renderComponent(
    <InvoiceDetailsTable invoice={invoice} poLinesEnabled={true} />
  )

describe('InvoiceDetailsTable', () => {
  it('renders component properly', () => {
    const { getByTestId } = render({ invoice: fixtures.MockInvoice })

    expect(getByTestId('InvoiceDetailsTable')).toBeInTheDocument()
    expect(getByTestId('InvoiceDetailsTable-title')).toContainHTML('Details')

    expect(getByTestId('DetailsDescription-description')).toContainHTML(
      'Hourly services from Hugh Wimberly for [Enterprise] Data Engineering Architect from December 29, 2019 to January 4, 2020. 15 hours of work billed.'
    )
  })
})
