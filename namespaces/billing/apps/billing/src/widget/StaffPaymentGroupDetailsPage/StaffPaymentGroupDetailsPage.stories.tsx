import React from 'react'

import StoryShell from '../../story-shell'
import Component from './StaffPaymentGroupDetailsPage'

export default {
  title: 'Billing/Pages/Staff Payment Group Details Page',
  component: Component,
  args: {
    legacyPaymentGroupId: '186369'
  },
  argTypes: {
    legacyPaymentGroupId: {
      control: { type: 'text' }
    }
  }
}

interface Props {
  legacyPaymentGroupId: string
}

export const StaffPaymentGroupDetailsPage = ({
  legacyPaymentGroupId
}: Props) => (
  <StoryShell
    params={{ id: legacyPaymentGroupId }}
    render={appProps => <Component baseAppProps={appProps} />}
  />
)
