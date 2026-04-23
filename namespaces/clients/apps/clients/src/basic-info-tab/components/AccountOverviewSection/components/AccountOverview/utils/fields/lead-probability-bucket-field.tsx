import React from 'react'
import { LeadProbabilityBucket } from '@staff-portal/clients'

import { FieldHelper } from './field-helper'

export const leadProbabilityBucketField: FieldHelper = ({
  company: { leadPotential, scoreExplanation }
}) => [
  'Lead Probability Bucket',
  <LeadProbabilityBucket
    bucket={leadPotential?.leadProbabilityBucket}
    scoreExplanation={scoreExplanation}
  />
]
