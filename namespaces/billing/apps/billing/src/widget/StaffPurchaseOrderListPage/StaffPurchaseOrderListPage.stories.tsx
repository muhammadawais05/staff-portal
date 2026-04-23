import React from 'react'

import StoryShell from '../../story-shell'
import Component from './StaffPurchaseOrderListPage'

export default {
  title: 'Billing/Pages/Staff Purchase Order List Page',
  component: Component
}

export const StaffPurchaseOrderListPage = () => (
  <StoryShell render={appProps => <Component baseAppProps={appProps} />} />
)
