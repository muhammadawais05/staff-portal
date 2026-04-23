import React from 'react'
import { encodeId } from '@staff-portal/billing/src/_lib/helpers/apollo'

import StoryShell from '../../story-shell'
import Component from './StaffPaymentTaskCard'

export default {
  title: 'Billing/Pages/Staff Payment Task Card',
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

export const StaffPaymentTaskCard = ({ legacyPaymentId }: Props) => {
  return (
    <StoryShell
      render={appProps => (
        <Component
          baseAppProps={appProps}
          taskCardConfig={{
            title: 'Title',
            subtitle: 'Subtitle',
            entityId: encodeId({ id: legacyPaymentId, type: 'payment' })
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
