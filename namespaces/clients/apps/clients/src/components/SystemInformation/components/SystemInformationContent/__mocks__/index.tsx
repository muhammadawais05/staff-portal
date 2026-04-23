import React from 'react'

import { SystemInformationFragment } from '../../../data'

const MockComponent = ({
  systemInformation
}: {
  systemInformation: SystemInformationFragment
}) => (
  <div data-testid='SystemInformationContent'>
    <div data-testid='SystemInformationContent-systemInformation'>
      {JSON.stringify(systemInformation)}
    </div>
  </div>
)

export default MockComponent
