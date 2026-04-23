import React from 'react'
import { BaseAppProps } from '@staff-portal/billing/src/@types/types'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import WidgetStaffPaymentDetailsPage from '.'

jest.mock('@staff-portal/billing/src/components/App')
jest.mock('@staff-portal/billing/src/utils')
jest.mock('@staff-portal/billing/src/components/Modals')
jest.mock('../../modules/purchaseOrder/pages/PurchaseOrderDetails')

const render = (props: BaseAppProps) =>
  renderComponent(<WidgetStaffPaymentDetailsPage {...props} />)

describe('WidgetStaffPaymentDetailsPage', () => {
  it('widget is rendered', () => {
    const { queryByTestId } = render({
      purchaseOrderId: 'abc123456'
    })

    expect(queryByTestId('App')).not.toBeNull()
    expect(queryByTestId('PurchaseOrderDetails')).toContainHTML(
      '{"purchaseOrderId":"VjEtUHVyY2hhc2VPcmRlci11bmRlZmluZWQ"}'
    )
    expect(queryByTestId('Modals')).toBeInTheDocument()
  })
})
