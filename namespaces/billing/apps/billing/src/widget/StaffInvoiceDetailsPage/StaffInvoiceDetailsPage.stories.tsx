import React from 'react'

import StoryShell from '../../story-shell'
import Component from './StaffInvoiceDetailsPage'

export default {
  title: 'Billing/Pages/Staff Invoice Details Page',
  component: Component,
  args: {
    legacyInvoiceId: '414285'
  },
  argTypes: {
    legacyInvoiceId: {
      control: { type: 'text' }
    }
  }
}

interface Props {
  legacyInvoiceId: string
}

export const StaffInvoiceDetailsPage = ({ legacyInvoiceId }: Props) => (
  <StoryShell
    params={{ id: legacyInvoiceId }}
    render={appProps => <Component {...appProps} />}
  />
)
