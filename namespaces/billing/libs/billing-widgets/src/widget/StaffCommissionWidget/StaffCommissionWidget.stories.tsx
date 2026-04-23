import React from 'react'
import { encodeId } from '@staff-portal/billing/src/_lib/helpers/apollo'

import StoryShell from '../../story-shell'
import Component from './StaffCommissionWidget'

export default {
  title: 'Billing/Widgets/Staff Commission Widget',
  component: Component,
  args: {
    legacyNodeId: '491023',
    isActionsHidden: false
  },
  argTypes: {
    legacyNodeId: {
      control: { type: 'text' }
    },
    isActionsHidden: {
      control: { type: 'boolean' }
    }
  }
}

interface Props {
  legacyNodeId: string
  isActionsHidden: boolean
}

export const StaffCommissionWidget = ({
  legacyNodeId,
  isActionsHidden
}: Props) => {
  return (
    <StoryShell
      render={appProps => (
        <Component
          baseAppProps={appProps}
          nodeId={encodeId({
            id: legacyNodeId,
            type: 'client'
          })}
          isActionsHidden={isActionsHidden}
        />
      )}
    />
  )
}
