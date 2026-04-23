import React from 'react'
import { isOperationEnabled } from '@staff-portal/operations'

import { FieldHelper } from './field-helper'
import ClientLeadSource from '../../components/ClientLeadSource/ClientLeadSource'

export const leadSourceField: FieldHelper = ({
  company: {
    id: clientId,
    leadSource,
    operations: { updateClientLeadSource }
  }
}) => [
  'Lead Source',
  <ClientLeadSource
    editingDisabled={!isOperationEnabled(updateClientLeadSource)}
    value={leadSource}
    clientId={clientId}
  />
]
