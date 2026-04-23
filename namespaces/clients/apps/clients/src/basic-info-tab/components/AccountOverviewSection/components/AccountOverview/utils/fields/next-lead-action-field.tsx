import React from 'react'

import NextLeadAction from '../../components/NextLeadAction/NextLeadAction'
import { FieldHelper } from './field-helper'

export const nextLeadActionField: FieldHelper = ({
  company: { enterpriseFollowUpStatus, enterpriseFollowUpStatusComment }
}) => [
  'Next lead action',
  <NextLeadAction
    status={enterpriseFollowUpStatus}
    comment={enterpriseFollowUpStatusComment}
  />
]
