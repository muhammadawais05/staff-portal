import React from 'react'
import { isOperationEnabled } from '@staff-portal/operations'

import { FieldHelper } from './field-helper'
import ClientBusinessType from '../../components/ClientBusinessType/ClientBusinessType'

export const businessTypeField: FieldHelper = ({
  company: {
    id: clientId,
    businessType,
    operations: { updateClientBusinessType }
  }
}) => [
  'Business Type',
  <ClientBusinessType
    editingDisabled={!isOperationEnabled(updateClientBusinessType)}
    value={businessType ?? undefined}
    clientId={clientId}
  />
]
