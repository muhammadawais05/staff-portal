import React, { ComponentProps } from 'react'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import DownloadClientBillingReportButton from '.'

const { displayName } = DownloadClientBillingReportButton

const render = (
  props: ComponentProps<typeof DownloadClientBillingReportButton>
) => renderComponent(<DownloadClientBillingReportButton {...props} />)

describe('DownloadClientBillingReportButton', () => {
  it('renders a button used to display a modal', () => {
    const { getByTestId } = render({
      clientId: 'id',
      operation: {
        callable: OperationCallableTypes.ENABLED,
        messages: ['']
      }
    })

    expect(getByTestId(`${displayName}-download-button`)).toHaveTextContent(
      'Billing Report'
    )
  })
})
