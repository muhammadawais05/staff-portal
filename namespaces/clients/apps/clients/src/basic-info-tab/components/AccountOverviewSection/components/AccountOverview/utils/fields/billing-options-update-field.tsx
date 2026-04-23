import React from 'react'
import { isOperationEnabled } from '@staff-portal/operations'

import { FieldHelper } from './field-helper'
import BillingOptionsUpdate from '../../components/BillingOptionsUpdate/BillingOptionsUpdate'

export const billingOptionsUpdateField: FieldHelper = ({
  company: {
    id: clientId,
    billingOptionsUpdateEnabled,
    operations: { patchClientProfile }
  }
}) => [
  'Billing Options Update',
  <BillingOptionsUpdate
    clientId={clientId}
    editingDisabled={!isOperationEnabled(patchClientProfile)}
    value={billingOptionsUpdateEnabled}
  />
]
