import React from 'react'

import StoryShell from '../../story-shell'
import Component from './StaffPurchaseOrderLineDetailsPage'

export default {
  title: 'Billing/Pages/Staff Purchase Order Line Details Page',
  component: Component,
  args: {
    legacyPurchaseOrderLineId: '2'
  },
  argTypes: {
    legacyPurchaseOrderLineId: {
      control: { type: 'text' }
    }
  }
}

interface Props {
  legacyPurchaseOrderLineId: string
}

export const StaffPurchaseOrderLineDetailsPage = ({
  legacyPurchaseOrderLineId
}: Props) => {
  return (
    <StoryShell
      params={{ id: legacyPurchaseOrderLineId }}
      render={appProps => <Component baseAppProps={appProps} />}
    />
  )
}
