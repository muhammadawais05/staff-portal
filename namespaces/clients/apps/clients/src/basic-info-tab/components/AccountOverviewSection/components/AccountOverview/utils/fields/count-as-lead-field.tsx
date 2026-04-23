import React from 'react'

import CountAsLead from '../../components/CountAsLead/CountAsLead'
import { FieldHelper } from './field-helper'

export const countAsLeadField: FieldHelper = ({
  company: {
    id: clientId,
    countAsLead,
    operations: { updateClientCountAsLead }
  }
}) => [
  'Count as Lead',
  <CountAsLead
    clientId={clientId}
    value={countAsLead}
    operation={updateClientCountAsLead}
  />
]
