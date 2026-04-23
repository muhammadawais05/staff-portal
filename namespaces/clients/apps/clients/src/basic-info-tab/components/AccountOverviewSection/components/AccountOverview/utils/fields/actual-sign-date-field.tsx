import React from 'react'

import ActualSignDate from '../../components/ActualSignDate/ActualSignDate'
import { FieldHelper } from './field-helper'

export const actualSignDateField: FieldHelper = ({
  company: {
    id: clientId,
    actualSignDate,
    operations: { updateActualSignDate }
  }
}) => [
  'Actual Sign Date',
  <ActualSignDate
    clientId={clientId}
    value={actualSignDate}
    operation={updateActualSignDate}
  />
]
