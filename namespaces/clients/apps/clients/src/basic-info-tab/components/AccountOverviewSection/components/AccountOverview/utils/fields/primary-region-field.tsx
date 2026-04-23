import React from 'react'

import PrimaryRegion from '../../components/PrimaryRegion/PrimaryRegion'
import { FieldHelper } from './field-helper'

export const primaryRegionField: FieldHelper = ({
  company: {
    id: clientId,
    primaryRegion,
    operations: { updateClientPrimaryRegion }
  }
}) => [
  'Primary Region',
  <PrimaryRegion
    clientId={clientId}
    updateClientPrimaryRegion={updateClientPrimaryRegion}
    primaryRegion={primaryRegion}
  />
]
