import React from 'react'
import { OFACStatusField } from '@staff-portal/ofac-compliance'

import { FieldHelper } from './field-helper'

export const ofacStatusField: FieldHelper = ({
  company: { ofacStatus, visualComplianceStatus }
}) => [
  'OFAC Status',
  <OFACStatusField
    ofacStatus={ofacStatus}
    visualComplianceStatus={visualComplianceStatus}
  />
]
