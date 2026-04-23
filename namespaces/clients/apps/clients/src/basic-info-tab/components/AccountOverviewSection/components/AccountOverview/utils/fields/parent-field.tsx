import React from 'react'

import ParentLink from '../../components/ParentLink/ParentLink'
import { FieldHelper } from './field-helper'

export const parentField: FieldHelper = ({
  company: { id: clientId, parent, operations }
}) => [
  'Parent',
  <ParentLink clientId={clientId} parent={parent} operations={operations} />
]
