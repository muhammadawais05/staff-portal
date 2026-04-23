import React from 'react'

import StoryShell from '../../story-shell'
import Component from './StaffBillingStatsWidget'

export default {
  title: 'Billing/Widgets/Staff Billing Stats Widget',
  component: Component
}

export const StaffBillingStatsWidget = () => (
  <StoryShell
    render={baseAppProps => <Component baseAppProps={baseAppProps} />}
  />
)
