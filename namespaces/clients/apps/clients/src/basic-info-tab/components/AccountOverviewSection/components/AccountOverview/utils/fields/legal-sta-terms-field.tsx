import React from 'react'

import LegalStaTerms from '../../components/LegalStaTerms/LegalStaTerms'
import { FieldHelper } from './field-helper'

export const legalStaTermsField: FieldHelper = ({
  company: { activeStaContract, legalName, fullName }
}) => [
  'Legal STA Terms',
  <LegalStaTerms
    activeStaContract={activeStaContract}
    legalName={legalName || fullName}
  />
]
