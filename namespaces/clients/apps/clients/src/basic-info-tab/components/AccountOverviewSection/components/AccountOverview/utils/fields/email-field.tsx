import React from 'react'

import AccountOverviewEmail from '../../components/AccountOverviewEmail/AccountOverviewEmail'
import { FieldHelper } from './field-helper'

export const emailField: FieldHelper = ({
  company: {
    id: clientId,
    email,
    operations: { patchClientProfile: operation }
  },
  onChange
}) => [
  'Email',
  <AccountOverviewEmail
    clientId={clientId}
    email={email}
    operation={operation}
    handleChange={onChange}
  />
]
