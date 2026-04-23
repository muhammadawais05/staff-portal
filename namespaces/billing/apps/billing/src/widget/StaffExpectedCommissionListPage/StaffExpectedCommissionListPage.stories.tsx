import React from 'react'

import StoryShell from '../../story-shell'
import Component from './StaffExpectedCommissionListPage'

export default {
  title: 'Billing/Pages/Staff Expected Commission List Page',
  component: Component
}

export const StaffExpectedCommissionListPage = () => (
  <StoryShell render={appProps => <Component baseAppProps={appProps} />} />
)
