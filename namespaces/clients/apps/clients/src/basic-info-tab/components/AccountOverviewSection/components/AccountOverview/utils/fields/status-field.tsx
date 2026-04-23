import React from 'react'
import { CompanyStatus } from '@staff-portal/clients'

import { FieldHelper } from './field-helper'

export const statusField: FieldHelper = ({
  company: { investigations, cumulativeStatus }
}) => [
  'Status',
  <CompanyStatus
    cumulativeStatus={cumulativeStatus}
    investigations={investigations}
  />
]
