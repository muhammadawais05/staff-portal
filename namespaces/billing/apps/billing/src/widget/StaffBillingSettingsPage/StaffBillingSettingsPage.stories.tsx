import React from 'react'

import StoryShell from '../../story-shell'
import Component from './StaffBillingSettingsPage'

export default {
  title: 'Billing/Pages/Staff Billing Settings Page',
  component: Component,
  args: {
    legacyJobId: '169386'
  },
  argTypes: {
    legacyJobId: {
      control: { type: 'text' }
    }
  }
}

interface Props {
  legacyJobId: string
}

export const StaffBillingSettingsPage = ({ legacyJobId }: Props) => (
  <StoryShell
    params={{ id: legacyJobId }}
    render={appProps => <Component baseAppProps={appProps} />}
  />
)
