import React, { ComponentProps } from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import InvoiceSettingsDetailsTable from '.'

jest.mock('../InvoiceNoteUpdate')
jest.mock('../PurchaseOrderEdit')
jest.mock('../NextPurchaseOrderEdit')
jest.mock('../UpdateAddTimesheetToInvoice')

const render = ({ job }: ComponentProps<typeof InvoiceSettingsDetailsTable>) =>
  renderComponent(<InvoiceSettingsDetailsTable job={job} />)

jest.mock('../../utils')

describe('InvoiceSettingsDetailsTable', () => {
  it('default render', () => {
    const { getByTestId } = render({
      job: fixtures.MockBillingSettingsJob.data.node
    })

    expect(getByTestId('InvoiceSettingsDetailsTable')).toBeInTheDocument()
  })
})
