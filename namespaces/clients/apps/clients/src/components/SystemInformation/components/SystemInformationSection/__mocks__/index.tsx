import React, { ReactNode } from 'react'

const MockComponent = ({ children }: { children: ReactNode }) => (
  <div data-testid='SystemInformationSection'>
    <div data-testid='SystemInformationSection-children'>{children}</div>
  </div>
)

export default MockComponent
