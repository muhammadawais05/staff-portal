import React from 'react'
import { isOperationEnabled } from '@staff-portal/operations'

import { Location } from '../../components'
import { FieldHelper } from './field-helper'

export const locationField: FieldHelper = ({
  company: {
    id: clientId,
    country,
    city,
    operations: { patchClientProfile }
  }
}) => [
  'Location',
  <Location
    clientId={clientId}
    country={country}
    city={city}
    editingDisabled={!isOperationEnabled(patchClientProfile)}
  />
]
