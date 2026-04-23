import React from 'react'

import StoryShell from '../../story-shell'
import Component from './StaffMemorandumListPage'

export default {
  title: 'Billing/Pages/Staff Memorandum List Page',
  component: Component
}

export const StaffMemorandumListPage = () => (
  <StoryShell render={appProps => <Component baseAppProps={appProps} />} />
)
