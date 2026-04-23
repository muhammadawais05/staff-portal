import React from 'react'
import { isOperationEnabled } from '@staff-portal/operations'

import { FieldHelper } from './field-helper'
import TimeZone from '../../components/TimeZone/TimeZone'

export const timeZoneField: FieldHelper = ({
  company: {
    id: clientId,
    timeZone,
    operations: { patchClientProfile }
  },
  onChange
}) => [
  'Time Zone',
  <TimeZone
    editingDisabled={!isOperationEnabled(patchClientProfile)}
    timeZone={timeZone}
    clientId={clientId}
    handleChange={onChange}
  />
]
