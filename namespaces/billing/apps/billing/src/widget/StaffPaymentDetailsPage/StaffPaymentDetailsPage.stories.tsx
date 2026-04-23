import React from 'react'

import StoryShell from '../../story-shell'
import Component from './StaffPaymentDetailsPage'

export default {
  title: 'Billing/Pages/Staff Payment Details Page',
  component: Component,
  args: {
    legacyPaymentId: '189716'
  },
  argTypes: {
    legacyPaymentId: {
      control: { type: 'text' }
    }
  }
}

interface Props {
  legacyPaymentId: string
}

export const StaffPaymentDetailsPage = ({ legacyPaymentId }: Props) => {
  return (
    <StoryShell
      params={{ id: legacyPaymentId }}
      render={appProps => <Component baseAppProps={appProps} />}
    />
  )
}
