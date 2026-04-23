import React from 'react'

import AccountOverviewHierarchy from '../../components/AccountOverviewHierarchy/AccountOverviewHierarchy'
import { FieldHelper } from './field-helper'

export const hierarchyField: FieldHelper = ({
  company: { hierarchyCategory }
}) => [
  'Hierarchy',
  <AccountOverviewHierarchy hierarchyCategory={hierarchyCategory} />
]
