import React from 'react'
import { Button } from '@toptal/picasso'
import { encodeId } from '@staff-portal/billing/src/_lib/helpers/apollo'

import StoryShell from '../../story-shell'
import Component from './StaffBillingCycleSettingsWidget'

export default {
  title: 'Billing/Widgets/Staff Billing Cycle Settings Widget',
  component: Component,
  args: {
    legacyEngagementId: '189716'
  },
  argTypes: {
    legacyEngagementId: {
      control: { type: 'text' }
    }
  }
}

interface Props {
  legacyEngagementId: string
}

export const StaffBillingCycleSettingsWidget = ({
  legacyEngagementId
}: Props) => {
  return (
    <StoryShell
      render={appProps => (
        <Component
          baseAppProps={appProps}
          engagementId={encodeId({
            id: legacyEngagementId,
            type: 'engagement'
          })}
        >
          {showModal => <Button onClick={showModal}>Show modal</Button>}
        </Component>
      )}
    />
  )
}
