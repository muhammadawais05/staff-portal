import React, { ReactElement } from 'react'

const MockComponent = ({
  children,
  isModalContainer,
  showSkeleton,
  loading
}: {
  children: ReactElement
  isModalContainer: boolean
  showSkeleton: boolean
  loading: boolean
}) => (
  <div data-testid='ContainerLoader'>
    <span data-testid='ContainerLoader-children'>{children}</span>
    <span data-testid='ContainerLoader-isModalContainer'>
      {JSON.stringify(isModalContainer)}
    </span>
    <span data-testid='ContainerLoader-showSkeleton'>
      {JSON.stringify(showSkeleton)}
    </span>
    <span data-testid='ContainerLoader-loading'>{JSON.stringify(loading)}</span>
  </div>
)

export default MockComponent
