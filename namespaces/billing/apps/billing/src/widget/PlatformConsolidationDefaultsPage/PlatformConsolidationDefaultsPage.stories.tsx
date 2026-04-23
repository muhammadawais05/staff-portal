import React from 'react'
import { encodeId } from '@staff-portal/billing/src/_lib/helpers/apollo'

import StoryShell from '../../story-shell'
import Component from './PlatformConsolidationDefaultsPage'

export default {
  title: 'Billing/Legacy Widgets/Platform Consolidation Defaults Page',
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

export const PlatformConsolidationDefaultsPage = ({
  legacyClientId
}: Props) => {
  return (
    <StoryShell
      render={appProps => (
        <Component
          {...appProps}
          clientId={encodeId({ id: legacyClientId, type: 'client' })}
        />
      )}
    />
  )
}
