import React from 'react'

import AccountPlan from '../../components/AccountPlan/AccountPlan'
import { FieldHelper } from './field-helper'

export const accountPlanField: FieldHelper = ({ company: { accountPlan } }) => [
  'Account Plan',
  <AccountPlan accountPlan={accountPlan} />
]
