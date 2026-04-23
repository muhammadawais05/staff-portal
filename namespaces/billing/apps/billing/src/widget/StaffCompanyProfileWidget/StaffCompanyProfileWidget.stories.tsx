import React from 'react'
import { encodeId } from '@staff-portal/billing/src/_lib/helpers/apollo'

import StoryShell from '../../story-shell'
import Component from './StaffCompanyProfileWidget'

export default {
  title: 'Billing/Widgets/Staff Company Profile Widget',
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

export const StaffCompanyProfileWidget = ({ legacyCompanyId }: Props) => {
  return (
    <StoryShell
      render={appProps => (
        <Component
          {...appProps}
          companyId={encodeId({
            id: legacyCompanyId,
            type: 'client'
          })}
        />
      )}
    />
  )
}
