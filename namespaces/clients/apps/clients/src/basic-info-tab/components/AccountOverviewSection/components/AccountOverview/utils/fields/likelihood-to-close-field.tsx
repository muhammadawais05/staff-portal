import React from 'react'

import LikelihoodToClose from '../../components/LikelihoodToClose/LikelihoodToClose'
import { FieldHelper } from './field-helper'

export const likelihoodToCloseField: FieldHelper = ({
  company: {
    id: clientId,
    likelihoodToClose,
    operations: { updateClientLikelihoodToClose }
  }
}) => [
  'Likelihood to Close',
  <LikelihoodToClose
    operation={updateClientLikelihoodToClose}
    value={likelihoodToClose}
    clientId={clientId}
  />
]
