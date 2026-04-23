import React from 'react'

import StoryShell from '../../story-shell'
import Component from './StaffMyExpectedCommissionListPage'

export default {
  title: 'Billing/Pages/Staff My Expected Commission List Page',
  component: Component
}

export const StaffMyExpectedCommissionListPage = () => (
  <StoryShell render={appProps => <Component baseAppProps={appProps} />} />
)
