import React from 'react'

import LegalContact from '../../components/LegalContact/LegalContact'
import { FieldHelper } from './field-helper'

export const legalContactField: FieldHelper = ({
  company: {
    id: clientId,
    contact,
    signerEmail,
    signerFullName,
    operations: { updateClientLegalContactDetails: operation }
  }
}) => [
  'Legal Contact',
  <LegalContact
    clientId={clientId}
    contact={contact}
    signerEmail={signerEmail}
    signerFullName={signerFullName}
    operation={operation}
  />
]
