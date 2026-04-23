import React from 'react'

import SecondaryRegion from '../../components/SecondaryRegion/SecondaryRegion'
import { FieldHelper } from './field-helper'

export const secondaryRegionField: FieldHelper = ({
  company: {
    id: clientId,
    secondaryRegion,
    operations: { updateClientSecondaryRegion }
  }
}) => [
  'Secondary Region',
  <SecondaryRegion
    clientId={clientId}
    updateClientSecondaryRegion={updateClientSecondaryRegion}
    secondaryRegion={secondaryRegion}
  />
]
