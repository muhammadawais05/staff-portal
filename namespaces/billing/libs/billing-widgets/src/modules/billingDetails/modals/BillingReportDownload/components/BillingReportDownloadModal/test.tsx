import React from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import { useSetDownloadClientBillingReportMutation } from '../../data'
import BillingReportDownloadModal from './'

jest.mock('@staff-portal/billing/src/_lib/form/handlers', () => ({
  handleOnSubmissionError: jest.fn(),
  handleSubmit: jest.fn().mockReturnValue('handleOnSubmit')
}))
jest.mock('../BillingReportDownloadModalForm')
jest.mock('../../data')

describe('BillingReportDownloadModal', () => {
  it('renders a form', () => {
    ;(useSetDownloadClientBillingReportMutation as jest.Mock).mockReturnValue([
      jest.fn()
    ])

    const { getByTestId } = renderComponent(
      <BillingReportDownloadModal options={{ nodeId: 'id' }} />
    )

    expect(getByTestId('BillingReportDownloadModalForm')).toBeInTheDocument()
  })
})
