import React from 'react'

import AccountOverviewContactName from '../../components/AccountOverviewContactName/AccountOverviewContactName'
import { FieldHelper } from './field-helper'

export const primaryContactField: FieldHelper = ({
  company: {
    id: clientId,
    businessType,
    contact,
    operations: { patchClientProfile }
  },
  onChange
}) => [
  'Primary Contact',
  <AccountOverviewContactName
    clientId={clientId}
    businessType={businessType}
    contactName={contact?.fullName}
    handleChange={onChange}
    operation={patchClientProfile}
  />
]
