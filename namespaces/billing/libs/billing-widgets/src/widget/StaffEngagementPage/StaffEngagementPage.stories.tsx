import React from 'react'
import { encodeId } from '@staff-portal/billing/src/_lib/helpers/apollo'

import StoryShell from '../../story-shell'
import Component from './StaffEngagementPage'

export default {
  title: 'Billing/Pages/Staff Engagement Page',
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

export const StaffEngagementPage = ({ legacyEngagementId }: Props) => {
  return (
    <StoryShell
      render={appProps => (
        <Component
          baseAppProps={appProps}
          engagementId={encodeId({
            id: legacyEngagementId,
            type: 'engagement'
          })}
        />
      )}
    />
  )
}
