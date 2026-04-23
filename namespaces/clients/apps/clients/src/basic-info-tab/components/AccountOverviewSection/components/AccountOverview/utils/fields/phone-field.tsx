import React from 'react'

import PhoneContacts from '../../components/PhoneContacts/PhoneContacts'
import { FieldHelper } from './field-helper'

export const phoneField: FieldHelper = ({
  company: { id: clientId, contact }
}) => [
  'Phone',
  contact && <PhoneContacts contact={contact} clientId={clientId} />
]
