import React from 'react'

import SalesPlaybookName from '../../components/SalesPlaybookName/SalesPlaybookName'
import { FieldHelper } from './field-helper'

export const salesPlaybookField: FieldHelper = ({
  company: { salesPlaybookName }
}) => [
  'Sales Playbook',
  <SalesPlaybookName salesPlaybookName={salesPlaybookName} />
]
