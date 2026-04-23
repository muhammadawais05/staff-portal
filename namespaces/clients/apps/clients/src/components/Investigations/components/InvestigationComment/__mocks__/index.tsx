import React from 'react'

import { Investigation } from '../../../types'

const MockComponent = ({ comment }: { comment: Investigation['comment'] }) => (
  <div data-testid='InvestigationComment'>
    <div data-testid='InvestigationComment-comment'>
      {JSON.stringify(comment)}
    </div>
  </div>
)

export default MockComponent
