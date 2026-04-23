import React from 'react'

import StoryShell from '../../story-shell'
import Component from './StaffPurchaseOrderDetailsPage'

export default {
  title: 'Billing/Pages/Staff Purchase Order Details Page',
  component: Component,
  args: {
    legacyPurchaseOrderId: '2003'
  },
  argTypes: {
    legacyPurchaseOrderId: {
      control: { type: 'text' }
    }
  }
}

interface Props {
  legacyPurchaseOrderId: string
}

export const StaffPurchaseOrderDetailsPage = ({
  legacyPurchaseOrderId
}: Props) => (
  <StoryShell
    params={{ id: legacyPurchaseOrderId }}
    render={appProps => <Component baseAppProps={appProps} />}
  />
)
