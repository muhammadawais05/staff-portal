import React from 'react'

import LegalName from '../../components/LegalName/LegalName'
import { FieldHelper } from './field-helper'

export const legalNameField: FieldHelper = ({
  company: {
    id: clientId,
    legalName,
    fullName,
    operations: { updateClientLegalName }
  }
}) => [
  'Legal Name',
  <LegalName
    clientId={clientId}
    value={legalName || fullName}
    operation={updateClientLegalName}
  />
]
