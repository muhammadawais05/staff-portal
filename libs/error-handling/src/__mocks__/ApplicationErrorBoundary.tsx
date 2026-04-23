import React, { ReactNode } from 'react'

interface Props {
  children: ReactNode
  appName: string
  packageVersion: string
}

const ApplicationErrorBoundary = ({
  children,
  appName,
  packageVersion
}: Props) => {
  return (
    <div data-testid='ApplicationErrorBoundary'>
      <div data-testid='ApplicationErrorBoundary-children'>{children}</div>
      <div data-testid='ApplicationErrorBoundary-appName'>{appName}</div>
      <div data-testid='ApplicationErrorBoundary-packageVersion'>
        {packageVersion}
      </div>
    </div>
  )
}

export default ApplicationErrorBoundary
