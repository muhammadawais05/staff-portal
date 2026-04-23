import React from 'react'

import StoryShell from '../../story-shell'
import Component from './StaffInvoiceListPage'

export default {
  title: 'Billing/Pages/Staff Invoice List Page',
  component: Component
}

export const StaffInvoiceListPage = () => (
  <StoryShell render={appProps => <Component baseAppProps={appProps} />} />
)
