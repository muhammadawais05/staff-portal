import React from 'react'

import { Job } from '../../../../../types'

const MockComponent = ({
  talents,
  talentsCount
}: {
  talents: NonNullable<Job['currentTalents']>['nodes']
  talentsCount: NonNullable<Job['currentTalents']>['totalCount']
}) => (
  <div data-testid='Talent'>
    <div data-testid='Talent-talents'>{JSON.stringify(talents)}</div>
    <div data-testid='Talent-talentsCount'>{talentsCount}</div>
  </div>
)

export default MockComponent
