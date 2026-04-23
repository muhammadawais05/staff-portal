import React from 'react'

import Tier from '../../components/Tier/Tier'
import { FieldHelper } from './field-helper'

export const tierField: FieldHelper = ({ company: { tier } }) => [
  'Tier',
  <Tier value={tier} />
]
