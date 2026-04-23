import React from 'react'

import StoryShell from '../../story-shell'
import Component from './StaffOverviewPage'

export default {
  title: 'Billing/Pages/Staff Overview Page',
  component: Component
}

export const StaffOverviewPage = () => {
  return (
    <StoryShell render={appProps => <Component baseAppProps={appProps} />} />
  )
}
