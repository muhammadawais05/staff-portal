import fixtures from '@staff-portal/billing/src/_fixtures'

import getInvoiceDetailsContent from './getInvoiceDetailsContent'

describe('getInvoiceDetailsContent', () => {
  it('content returned properly', () => {
    // eslint-disable-next-line
    // @ts-ignore
    const result = getInvoiceDetailsContent(fixtures.MockInvoice)

    expect(result).toMatchSnapshot()
  })
})
