import React from 'react'
import { encodeId } from '@staff-portal/billing/src/_lib/helpers/apollo'

import StoryShell from '../../story-shell'
import Component from './StaffBillingInformationNotesWidget'

export default {
  title: 'Billing/Widgets/Staff Billing Information Notes Widget',
  component: Component,
  args: {
    legacyCompanyId: '511860'
  },
  argTypes: {
    legacyCompanyId: {
      control: { type: 'text' }
    }
  }
}

interface Props {
  legacyCompanyId: string
}

export const StaffBillingInformationNotesWidget = ({
  legacyCompanyId
}: Props) => {
  return (
    <StoryShell
      render={appProps => (
        <Component
          baseAppProps={appProps}
          companyId={encodeId({
            id: legacyCompanyId,
            type: 'client'
          })}
        />
      )}
    />
  )
}
