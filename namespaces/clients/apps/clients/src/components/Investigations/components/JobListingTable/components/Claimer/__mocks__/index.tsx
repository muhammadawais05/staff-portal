import React from 'react'

import { Job } from '../../../../../types'

const MockComponent = ({ claimer }: { claimer: Job['claimer'] }) => (
  <div data-testid='Claimer'>
    <div data-testid='Claimer-claimer'>{JSON.stringify(claimer)}</div>
  </div>
)

export default MockComponent
