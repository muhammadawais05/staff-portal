import React from 'react'

import { Investigation } from '../../../types'

const MockComponent = ({ jobs }: { jobs: Investigation['jobs']['nodes'] }) => (
  <div data-testid='JobListingTable'>
    <div data-testid='JobListingTable-jobs'>{JSON.stringify(jobs)}</div>
  </div>
)

export default MockComponent
