import React from 'react'

import CompanyHqPhone from '../../components/CompanyHqPhone/CompanyHqPhone'
import { FieldHelper } from './field-helper'

export const companyHqPhoneField: FieldHelper = ({
  company: {
    id: clientId,
    companyHqPhone,
    clientopedia,
    operations: { patchClientProfile }
  },
  onChange
}) => [
  'Company HQ Phone',
  <CompanyHqPhone
    clientId={clientId}
    value={companyHqPhone}
    clientopediaValue={clientopedia?.phone}
    handleChange={onChange}
    operation={patchClientProfile}
  />
]
