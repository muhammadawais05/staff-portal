import React from 'react'
import { Button } from '@toptal/picasso'

import StoryShell from '../../story-shell'
import Component from './UnappliedCashWidget'

export default {
  title: 'Billing/Widgets/Unapplied Cash Widget',
  component: Component,
  args: {
    clientId: '2039015'
  },
  argTypes: {
    clientId: {
      control: { type: 'text' }
    }
  }
}

interface Props {
  clientId: string
}

export const UnappliedCashWidget = ({ clientId }: Props) => {
  return (
    <StoryShell
      render={appProps => (
        <Component {...appProps} clientId={clientId}>
          {showModal => <Button onClick={showModal}>Show modal</Button>}
        </Component>
      )}
    />
  )
}
