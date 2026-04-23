import React from 'react'

import { Investigation } from '../../../types'

const MockComponent = ({
  resolution
}: {
  resolution: Investigation['resolution']
}) => (
  <div data-testid='InvestigationResolution'>
    <div data-testid='InvestigationResolution-resolution'>
      {JSON.stringify(resolution)}
    </div>
  </div>
)

export default MockComponent
