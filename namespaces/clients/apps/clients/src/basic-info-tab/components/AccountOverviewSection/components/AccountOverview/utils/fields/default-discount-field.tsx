import React from 'react'

import DefaultDiscount from '../../components/DefaultDiscount/DefaultDiscount'
import { FieldHelper } from './field-helper'

export const defaultDiscountField: FieldHelper = ({
  company: { fullTimeDiscount, partTimeDiscount }
}) => [
  'Default Discount',
  <DefaultDiscount
    fullTimeDiscount={fullTimeDiscount}
    partTimeDiscount={partTimeDiscount}
  />
]
