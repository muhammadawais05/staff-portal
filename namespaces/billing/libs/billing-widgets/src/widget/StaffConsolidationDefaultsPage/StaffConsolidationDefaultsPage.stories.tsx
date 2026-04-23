import React from 'react'
import { encodeId } from '@staff-portal/billing/src/_lib/helpers/apollo'

import StoryShell from '../../story-shell'
import Component from './StaffConsolidationDefaultsPage'

export default {
  title: 'Billing/Pages/Staff Consolidation Defaults Page',
  component: Component,
  args: {
    legacyClientId: '492805'
  },
  argTypes: {
    legacyClientId: {
      control: { type: 'text' }
    }
  }
}

interface Props {
  legacyClientId: string
}

export const StaffConsolidationDefaultsPage = ({ legacyClientId }: Props) => {
  return (
    <StoryShell
      render={appProps => (
        <Component
          baseAppProps={appProps}
          clientId={encodeId({
            id: legacyClientId,
            type: 'client'
          })}
        />
      )}
    />
  )
}
