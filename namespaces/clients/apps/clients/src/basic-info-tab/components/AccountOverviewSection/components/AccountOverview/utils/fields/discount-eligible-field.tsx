import React from 'react'

import DiscountEligible from '../../components/DiscountEligible/DiscountEligible'
import { FieldHelper } from './field-helper'

export const discountEligibleField: FieldHelper = ({
  company: {
    id: clientId,
    businessType,
    discountEligible: value,
    operations: { updateClientDiscountEligible: operation }
  }
}) => [
  '3% Discount Eligible',
  <DiscountEligible
    clientId={clientId}
    businessType={businessType}
    value={value}
    operation={operation}
  />
]
