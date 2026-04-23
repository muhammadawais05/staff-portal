import React from 'react'

import StoryShell from '../../story-shell'
import Component from './StaffReceivedPaymentsPage'

export default {
  title: 'Billing/Pages/Staff Received Payments Page',
  component: Component
}

export const StaffReceivedPaymentsPage = () => (
  <StoryShell render={appProps => <Component baseAppProps={appProps} />} />
)
