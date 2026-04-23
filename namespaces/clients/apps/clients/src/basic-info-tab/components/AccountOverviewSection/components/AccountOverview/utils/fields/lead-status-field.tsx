import React from 'react'

import LeadStatus from '../../components/LeadStatus/LeadStatus'
import { FieldHelper } from './field-helper'

export const leadStatusField: FieldHelper = ({
  company: {
    id: clientId,
    enterpriseLeadStatus,
    operations: { updateClientEnterpriseLeadStatus }
  }
}) => [
  'Lead Status',
  <LeadStatus
    operation={updateClientEnterpriseLeadStatus}
    value={enterpriseLeadStatus}
    clientId={clientId}
  />
]
