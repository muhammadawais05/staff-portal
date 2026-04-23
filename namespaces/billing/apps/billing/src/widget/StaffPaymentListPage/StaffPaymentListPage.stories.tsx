import React from 'react'

import StoryShell from '../../story-shell'
import Component from './StaffPaymentListPage'

export default {
  title: 'Billing/Pages/Staff Payment List Page',
  component: Component
}

export const StaffPaymentListPage = () => (
  <StoryShell render={appProps => <Component baseAppProps={appProps} />} />
)
