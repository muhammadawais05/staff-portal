import React from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import InvoiceSettings from '.'

jest.mock('../InvoiceSettingsDetailsTable')
jest.mock('../../data')
jest.mock('@staff-portal/billing/src/data')

describe('InvoiceSettings', () => {
  it('default render', () => {
    const { getByTestId } = renderComponent(<InvoiceSettings jobId='id' />)

    expect(getByTestId('InvoiceSettingsDetailsTable')).toBeInTheDocument()
  })
})
