import React from 'react'

import { CompanyNegotiationStatus } from '../../../../../CompanyNegotiationStatus'
import { FieldHelper } from './field-helper'

export const negotiationStatusField: FieldHelper = ({
  company: { currentNegotiation }
}) => [
  'Negotiation Status',
  <CompanyNegotiationStatus value={currentNegotiation} />
]
