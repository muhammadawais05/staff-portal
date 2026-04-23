import React from 'react'
import { BaseAppProps } from '@staff-portal/billing/src/@types/types'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import WidgetStaffPurchaseOrderListPage from '.'

jest.mock('@staff-portal/billing/src/components/App')
jest.mock('@staff-portal/billing/src/utils')
jest.mock('@staff-portal/billing/src/components/Modals')
jest.mock('../../modules/purchaseOrder/pages/PurchaseOrderList')

const render = (props: BaseAppProps) =>
  renderComponent(<WidgetStaffPurchaseOrderListPage {...props} />)

describe('WidgetStaffPurchaseOrderListPage', () => {
  it('widget is rendered', () => {
    const { queryByTestId } = render({})

    expect(queryByTestId('App')).toBeInTheDocument()
    expect(queryByTestId('ScrollToTop')).toBeInTheDocument()
    expect(queryByTestId('PurchaseOrderList')).toBeInTheDocument()
    expect(queryByTestId('Modals')).toBeInTheDocument()
  })
})
