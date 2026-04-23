import React from 'react'
import { encodeId } from '@staff-portal/billing/src/_lib/helpers/apollo'

import StoryShell from '../../story-shell'
import Component from './StaffBillingSettingsWidget'

export default {
  title: 'Billing/Widget/Staff Billing Settings Widget',
  component: Component,
  args: {
    legacyJobId: '239993'
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

export const StaffBillingSettingsWidget = ({ legacyJobId }: Props) => {
  return (
    <StoryShell
      render={appProps => (
        <Component
          baseAppProps={appProps}
          jobId={encodeId({
            id: legacyJobId,
            type: 'job'
          })}
        />
      )}
    />
  )
}
