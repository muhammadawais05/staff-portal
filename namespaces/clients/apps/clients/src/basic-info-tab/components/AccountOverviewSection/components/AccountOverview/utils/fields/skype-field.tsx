import React from 'react'

import AccountOverviewSkype from '../../components/AccountOverviewSkype/AccountOverviewSkype'
import { FieldHelper } from './field-helper'

export const skypeField: FieldHelper = ({
  company: {
    id: clientId,
    contact,
    operations: { patchClientProfile }
  }
}) => [
  'Skype',
  <AccountOverviewSkype
    clientId={clientId}
    contact={contact}
    operation={patchClientProfile}
  />
]
