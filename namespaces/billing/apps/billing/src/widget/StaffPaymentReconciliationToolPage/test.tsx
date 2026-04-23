import React, { ComponentProps } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import WidgetStaffPaymentReconciliationToolPage from '.'

jest.mock('@staff-portal/billing/src/components/App')
jest.mock('@staff-portal/billing/src/utils')
jest.mock('@staff-portal/billing/src/components/Modals')
jest.mock('../../modules/invoice/pages/ReconciliationPage', () => () => (
  <div data-testid='ReconciliationPage' />
))

const render = (
  props?: ComponentProps<typeof WidgetStaffPaymentReconciliationToolPage>
) => renderComponent(<WidgetStaffPaymentReconciliationToolPage {...props} />)

describe('WidgetStaffPaymentReconciliationToolPage', () => {
  it('renders all required components', () => {
    const { getByTestId } = render()

    expect(getByTestId('App')).toBeInTheDocument()
    expect(getByTestId('ScrollToTop')).toBeInTheDocument()
    expect(getByTestId('ReconciliationPage')).toBeInTheDocument()
    expect(getByTestId('Modals')).toBeInTheDocument()
  })
})
