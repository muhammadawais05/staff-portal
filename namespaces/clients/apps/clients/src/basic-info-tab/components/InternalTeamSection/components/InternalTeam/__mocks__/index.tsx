import React from 'react'

import { InternalTeamFragment } from '../../../data'

const MockedComponent = ({
  data: { id: companyId }
}: {
  data: InternalTeamFragment
}) => (
  <div data-testid='InternalTeam'>
    <div data-testid='InternalTeam-companyId'>{companyId}</div>
  </div>
)

export default MockedComponent
