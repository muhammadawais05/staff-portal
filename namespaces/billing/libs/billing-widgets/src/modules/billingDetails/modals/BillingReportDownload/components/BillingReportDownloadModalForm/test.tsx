import React, { ComponentProps } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import BillingReportDownloadModalForm from '.'

const render = (props: ComponentProps<typeof BillingReportDownloadModalForm>) =>
  renderComponent(<BillingReportDownloadModalForm {...props} />)

describe('BillingReportDownloadModalForm', () => {
  it('default render', () => {
    const { getByTestId } = render({
      handleOnSubmit: jest.fn()
    })

    expect(
      getByTestId(`${BillingReportDownloadModalForm.displayName}-title`)
    ).toHaveTextContent('Download Billing Report')
    expect(
      getByTestId(`${BillingReportDownloadModalForm.displayName}-startDate`)
    ).toHaveTextContent('Start Date')
    expect(
      getByTestId(`${BillingReportDownloadModalForm.displayName}-endDate`)
    ).toHaveTextContent('End Date')
    expect(getByTestId('submit')).toHaveTextContent('Download')
  })
})
