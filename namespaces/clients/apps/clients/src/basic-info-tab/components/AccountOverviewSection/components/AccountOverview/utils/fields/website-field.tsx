import React from 'react'

import Website from '../../components/Website/Website'
import { FieldHelper } from './field-helper'

export const websiteField: FieldHelper = ({
  company: {
    id: clientId,
    website,
    operations: { patchClientProfile }
  },
  onChange
}) => [
  'Website',
  <Website
    clientId={clientId}
    handleChange={onChange}
    website={website ?? ''}
    operation={patchClientProfile}
  />
]
