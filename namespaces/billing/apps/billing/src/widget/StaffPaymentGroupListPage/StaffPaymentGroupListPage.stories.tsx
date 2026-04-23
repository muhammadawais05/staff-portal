import React from 'react'

import StoryShell from '../../story-shell'
import Component from './StaffPaymentGroupListPage'

export default {
  title: 'Billing/Pages/Staff Payment Group List Page',
  component: Component
}

export const StaffPaymentGroupListPage = () => (
  <StoryShell render={appProps => <Component baseAppProps={appProps} />} />
)
