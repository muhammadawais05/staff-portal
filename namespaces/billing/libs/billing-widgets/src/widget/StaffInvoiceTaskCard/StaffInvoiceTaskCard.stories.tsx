import React from 'react'
import { encodeId } from '@staff-portal/billing/src/_lib/helpers/apollo'

import StoryShell from '../../story-shell'
import Component from './StaffInvoiceTaskCard'

export default {
  title: 'Billing/Pages/Staff Invoice Task Card',
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

export const StaffInvoiceTaskCard = ({ legacyInvoiceId }: Props) => {
  return (
    <StoryShell
      render={appProps => (
        <Component
          baseAppProps={appProps}
          taskCardConfig={{
            title: 'Title',
            subtitle: 'Subtitle',
            entityId: encodeId({ id: legacyInvoiceId, type: 'invoice' })
          }}
          task={{
            id: 'VjEtVGFzay0xMTQ4OTgzMw',
            description:
              'Conduct Tech 1 screening and either reject or approve',
            status: 'finished'
          }}
        />
      )}
    />
  )
}
