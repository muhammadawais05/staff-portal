import React from 'react'

import StoryShell from '../../story-shell'
import Component from './StaffPaymentReconciliationToolPage'

export default {
  title: 'Billing/Pages/Staff Payment Reconciliation Tool Page',
  component: Component
}

export const StaffPaymentReconciliationToolPage = () => (
  <StoryShell render={appProps => <Component baseAppProps={appProps} />} />
)
